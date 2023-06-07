interface MessageProps {
    messageId: string
    message: string
    senderId: string
    senderName: string
    timeSent: Date
    profilePicture: string | null
    lastEdited: Date | null
}

export default function Message({messageId, message, senderId, senderName, timeSent, profilePicture, lastEdited}: MessageProps) {
    return <div>
        {message}
        {timeSent.toISOString()}
    </div>
}