import ReactDOM from 'react-dom/client';
import Messages, { MessageWithSenderDetails } from '@/components/Messages'
import {act, fireEvent, render, screen} from '@testing-library/react'

const mockMessages: MessageWithSenderDetails[] = [
    {
        message: 'Hello World',
        messageId: 'message_1',
        reactions: [],
        timeSent: new Date('2022'),
        lastEdited: null,
        sentBy: {
            senderId: 'danielwangid',
            displayName: 'daniel wang',
            profilePicture: null,
        },
    },
]

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

    it('delete message', async () => {
        const deleteFn = jest.fn()
        render(
            <Messages
                messages={mockMessages}
                editMessage={() => ({})}
                deleteMessage={deleteFn}
            />
        )

        // Testing delete button
        fireEvent.contextMenu(screen.getByText('Hello World'))
        expect(deleteFn).not.toBeCalled()
        expect(editFn).not.toBeCalled()

        fireEvent.click(screen.getByText('Delete Message'))
        expect(deleteFn).toBeCalled()
        expect(editFn).not.toBeCalled()
        expect(screen.queryByText('Delete Message')).not.toBeInTheDocument()

    })
})
