import { Message, fetchChannelMessages } from '@/fetchers'
import { useEffect, useState } from 'react'
import useSWR from 'swr'



export default function useMessage({channelId, token}: {channelId: string, token: string}) {
    const [messages, setMessages] = useState<Message[]>([])
    const {data: initialMessages} = useSWR({channelId, token}, fetchChannelMessages)

    useEffect(() => {
        if (initialMessages) {
            setMessages(initialMessages)
        }
    }, [initialMessages])

    return messages
}
