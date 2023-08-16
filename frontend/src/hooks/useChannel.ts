import { Message, deleteMessageRequest, fetchChannelDetails, fetchChannelMessages, postMessageEditRequest, postMessageRequest } from '@/fetchers'
import { v4 as uuidv4 } from 'uuid';
import { useCallback, useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import { AuthContext } from '@/pages/_app';
import { applyFn, compareMessageByDate } from '@/helpers';


interface ChannelIdToken {
    channelId: string
    token: string
}

export default function useChannel({channelId, token}: ChannelIdToken) {
    const [messages, setMessages] = useState<Message[]>([])
    const {authUser} = useContext(AuthContext)

    const {data: initialMessages} = useSWR(
        [fetchChannelMessages, {channelId, token}],
        applyFn<Parameters<typeof fetchChannelMessages>[0], ReturnType<typeof fetchChannelMessages>>
    )
    const {data: channelDetails} = useSWR(
        [fetchChannelDetails, {channelId, token}],
        applyFn<Parameters<typeof fetchChannelDetails>[0], ReturnType<typeof fetchChannelDetails>>
    )

    const sendMessage = async (messageText: string) => {
        const tmpId = 'tmp-' + uuidv4()
        const optimisticMessage: Message = {
            message: messageText,
            messageId: tmpId,
            reactions: [],
            timeSent: new Date(),
            lastEdited: null,
            sentBy: authUser?.user as string,
            optimistic: true,
        }
        setMessages(messages => [...messages, optimisticMessage])
        try {
            const actualMessage = await postMessageRequest(authUser?.token || '', channelId, messageText)
            setMessages(messages =>
                [
                    ...messages.filter(m => m.messageId !== tmpId),
                    actualMessage,
                ].sort(compareMessageByDate)
            )
        } catch {
            setMessages(messages => messages.filter(m => m.messageId !== tmpId))
            throw new Error('Failed to send message') // TODO: maybe do proper error message propogation
        }

    }

    const deleteMessage = async (messageId: string) => {
        if (messages.find(m => m.messageId === messageId) === undefined) {
            throw new Error('Invalid messageId to delete')
        }
        // maybe TODO: optimistic UI for message deletion
        const success = await deleteMessageRequest(token, messageId)
        if (!success) {
            throw new Error('Failed to delete message')
        }
        setMessages(messages => messages.filter(m => m.messageId !== messageId))
    }

    const editMessage = async (messageId: string, editedMessage: string) => {
        if (messages.find(m => m.messageId === messageId) === undefined) {
            throw new Error('Invalid messageId to edit')
        }
        try {
            const newMessage = await postMessageEditRequest(token, messageId, editedMessage)
            setMessages(messages => [
                ...messages.filter(m => m.messageId !== messageId),
                newMessage,
            ].sort(compareMessageByDate))
        } catch {
            throw new Error('Failed to edit message')
        }
    }

    useEffect(() => {
        if (initialMessages) {
            setMessages([...initialMessages])
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
