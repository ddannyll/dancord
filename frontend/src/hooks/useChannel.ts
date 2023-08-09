import { Message, deleteMessageRequest, fetchChannelDetails, fetchChannelMessages, postMessageEditRequest, postMessageRequest } from '@/fetchers'
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import { AuthContext } from '@/pages/_app';
import { applyFn } from '@/helpers';


interface ChannelIdToken {
    channelId: string
    token: string
}

export default function useChannel({channelId, token}: ChannelIdToken) {
    const [messages, setMessages] = useState<Message[]>([])
    const {authUser} = useContext(AuthContext)


    const {data: initialMessages, mutate: mutateMessages} = useSWR(
        [fetchChannelMessages, {channelId, token}],
        applyFn<Parameters<typeof fetchChannelMessages>[0], ReturnType<typeof fetchChannelMessages>>
    )
    const {data: channelDetails} = useSWR(
        [fetchChannelDetails, {channelId, token}],
        applyFn<Parameters<typeof fetchChannelDetails>[0], ReturnType<typeof fetchChannelDetails>>
    )

    const sendMessage = async (messageText: string) => {
        const newMessage: Message = {
            message: messageText,
            messageId: 'tmp ' + uuidv4(),
            reactions: [],
            timeSent: new Date(),
            lastEdited: null,
            sentBy: authUser?.user as string,
            optimistic: true,
        }
        await mutateMessages(async () => {
            const newMessage = await postMessageRequest(token, channelId, messageText)
            return [...messages, newMessage]
        },
        {
            optimisticData: [...messages, newMessage],
            rollbackOnError: true,
            revalidate: true,
        })
    }

    const deleteMessage = async (messageId: string) => {
        const newMessages = messages.filter(message => message.messageId !== messageId)
        await mutateMessages(async () => {
            await deleteMessageRequest(token, messageId)
            return []
        },
        {
            optimisticData: [...newMessages],
            rollbackOnError: true,
            revalidate: true,
        })
    }

    const editMessage = async (messageId: string, editedMessage: string) => {
        await mutateMessages(async () => {
            await postMessageEditRequest(token, messageId, editedMessage)
            return []
        },
        {
            rollbackOnError: true,
            revalidate: true,
        }
        )
    }

    useEffect(() => {
        if (initialMessages) {
            setMessages([...initialMessages])
            console.log('set messages')
        }
    }, [initialMessages])

    return {
        messages,
        channelName: channelDetails?.channelName,
        sendMessage,
        deleteMessage,
        editMessage,
    }
}
