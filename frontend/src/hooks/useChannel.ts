import { Message, fetchChannelDetails, fetchChannelMessages, postMessage } from '@/fetchers'
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

    const {data: initialMessages, mutate: mutateMessages} = useSWR(
        [fetchChannelMessages, {channelId, token}],
        applyFn<Parameters<typeof fetchChannelMessages>[0], ReturnType<typeof fetchChannelMessages>>
    )
    const {data: channelDetails} = useSWR(
        [fetchChannelDetails, {channelId, token}],
        applyFn<Parameters<typeof fetchChannelDetails>[0], ReturnType<typeof fetchChannelDetails>>
    )

    const sendMessage = async (messageText: string) => {
        const newMessage = {
            message: messageText,
            messageId: 'placeholder',
            reactions: [],
            timeSent: new Date(),
            lastEdited: null,
            sentBy: 'placeholder',

        }
        await mutateMessages(postMessage(token, channelId, messageText),
            {
                optimisticData: [...messages, newMessage],
                rollbackOnError: true,
                revalidate: false,
            }
        )
    }

    useEffect(() => {
        if (initialMessages) {
            setMessages(initialMessages)
        }
    }, [initialMessages])

    return {messages, channelName: channelDetails?.channelName, sendMessage}
}
