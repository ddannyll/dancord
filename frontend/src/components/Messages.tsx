import { Message } from '@/fetchers'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'

interface MessagesProps {
    messages: Message[]
}

export default function Messages({messages}: MessagesProps) {
    const messageGroups: Message[][] = []
    // we need to group consecutive messages sent by the same user
    // so that we can append the sender's details at the top
    let currentGroup: Message[] = []
    let prevSender: null | string = null
    for (let i = 0; i < messages.length; i++) {
        const currMessage = messages[i]
        if (prevSender !== currMessage.sentBy && currentGroup.length > 0) {
            messageGroups.push(currentGroup)
            currentGroup = []
        }
        currentGroup.push(currMessage)
        prevSender = currMessage.sentBy
    }
    if (currentGroup.length > 0) {
        messageGroups.push(currentGroup)
    }

    return <div className="">
        {messageGroups.map(messageGroup => <MessageGroup key={messageGroup[0].messageId} messageGroup={messageGroup} />) }
    </div>

}
function MessageGroup({messageGroup}: {messageGroup: Message[]}) {
    const senderId = messageGroup[0].sentBy
    const messages = messageGroup.map(m => <div
        key={m.messageId}
        className="text-slate-200 py-0.5">
        {m.message}
    </div>
    )
    return <div className='flex mt-4'>
        <div className="ml-6 mr-4 mt-1 w-[40px] h-[40px] rounded-full border overflow-hidden">
            {/*  TODO: GET THE CORRECT PROFILE PHOTO */}
            <FontAwesomeIcon icon={faUser} className="text-white w-full h-full" />
        </div>
        <div className="">
            <h2 className='text-slate-50 text-lg font-medium'>{senderId} [change to name]</h2>
            {messages}
        </div>
    </div>
}
