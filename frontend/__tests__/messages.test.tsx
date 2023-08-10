import Messages, { MessageWithSenderDetails } from '@/components/Messages'
import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { v4 as uuidv4 } from 'uuid'

const mockMessages: MessageWithSenderDetails[] = [
    {
        message: 'Hello World',
        messageId: 'message_1',
        reactions: [],
        timeSent: new Date('December 17, 2022 03:24:00'),
        lastEdited: null,
        sentBy: {
            senderId: 'danielwangid',
            displayName: 'daniel wang',
            profilePicture: null,
        },
    },
]

const createMessageAtDate = (date: Date): MessageWithSenderDetails => {
    return {
        message: 'message at: ' + date.getTime(),
        messageId: uuidv4(),
        reactions: [],
        timeSent: date,
        lastEdited: null,
        sentBy: {
            senderId: uuidv4(),
            displayName: 'default',
            profilePicture: null,
        },
    }
}

describe('Messages', () => {
    it('Basic Text', () => {
        render(
            <Messages
                messages={mockMessages}
                editMessage={() => ({})}
                deleteMessage={() => ({})}
            />
        )
        expect(screen.getByText('Hello World')).toBeInTheDocument()
        expect(screen.getByText('daniel wang')).toBeInTheDocument()
        expect(screen.queryByText('danielwangid')).not.toBeInTheDocument()
    })

    it('Date formats', () => {
        const now = new Date()
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        const epoch = new Date(0)
        render(
            <Messages
                messages={[
                    createMessageAtDate(epoch),
                    createMessageAtDate(yesterday),
                    createMessageAtDate(now),
                ]}
                editMessage={() => ({})}
                deleteMessage={() => ({})}
            />
        )
        expect(screen.getByText('01/01/1970 12:00 AM'))
        expect(screen.getByText(/Today at.*/i))
        expect(screen.getByText(/Yesterday at.*/i))
    })

    it('edit + delete message', async () => {
        const user = userEvent.setup()
        const editFn = jest.fn()
        const deleteFn = jest.fn()
        render(
            <Messages
                messages={mockMessages}
                editMessage={editFn}
                deleteMessage={deleteFn}
            />
        )
        fireEvent.contextMenu(screen.getByText('Hello World'))
        expect(deleteFn).not.toBeCalled()
        expect(editFn).not.toBeCalled()

        fireEvent.click(screen.getByText('Delete Message'))
        expect(deleteFn).toBeCalled()
        expect(editFn).not.toBeCalled()
        expect(screen.queryByText('Delete Message')).not.toBeInTheDocument()

        await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Hello World') })
        await user.click(screen.getByRole('menuitem', {name: /edit message/i}))
        await user.type(screen.getByDisplayValue('Hello World'), 'wsg gng')
        await user.click(screen.getByRole('button', {name:/save/i}))
        expect(editFn).toBeCalledWith('message_1', 'Hello Worldwsg gng')
    })

    it('cancel edit message', async () => {
        const user = userEvent.setup()
        const editFn = jest.fn()
        render(
            <Messages
                messages={mockMessages}
                editMessage={editFn}
                deleteMessage={() => ({})}
            />
        )
        await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Hello World') })
        await user.click(screen.getByRole('menuitem', {name: /edit message/i}))
        await user.type(screen.getByDisplayValue('Hello World'), 'wsg gng')
        await user.click(screen.getByRole('button', {name:/cancel/i}))
        expect(editFn).not.toBeCalled()
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    })
})
