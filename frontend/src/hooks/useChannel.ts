import { Message, fetchChannelDetails, fetchChannelMessages } from '@/fetchers'
import { useEffect, useState } from 'react'
import useSWR from 'swr'



function applyFn<Input, Output>([fn, input]: [fn: (arg0: Input) => Output, input: Input]) {
    return fn(input)
}

interface ChannelIdToken {
    channelId: string
    token: string
}

export default function useChannel({channelId, token}: ChannelIdToken) {
    const [messages, setMessages] = useState<Message[]>([])

    const {data: initialMessages} = useSWR(
        [fetchChannelMessages, {channelId, token}],
        applyFn<Parameters<typeof fetchChannelMessages>[0], ReturnType<typeof fetchChannelMessages>>
    )
    const {data: channelDetails} = useSWR(
        [fetchChannelDetails, {channelId, token}],
        applyFn<Parameters<typeof fetchChannelDetails>[0], ReturnType<typeof fetchChannelDetails>>
    )

    useEffect(() => {
        if (initialMessages) {
            setMessages(initialMessages)
        }
    }, [initialMessages])

    return {messages, channelName: channelDetails?.channelName}
}
