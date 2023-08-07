import Messages from '@/components/Messages'
import {render, screen} from '@testing-library/react'

describe('Messages', () => {
    it('Basic Text', () => {
        const mockMessages = [
            {
                message: 'Hello World',
                messageId: 'message_1',
                reactions: [],
                timeSent: new Date('2022'),
                lastEdited: null,
                sentBy: 'danielwangid',
            },
        ]
        render(
            <Messages
                messages={mockMessages}
                editMessage={() => ({})}
                deleteMessage={() => ({})}
            />
        )
        expect(screen.getByText('Hello World')).toBeInTheDocument()
    })
})
