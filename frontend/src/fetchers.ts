import { Fetcher } from 'swr'
import { v4 as uuidv4 } from 'uuid'

export interface ServerDetails {
    name: string
    serverId: string
    channelIds: string[]
    image?: string,
}

export interface Reaction {
    reaction: string
    reactors: string[]
}

export interface Message {
    message: string
    messageId: string
    reactions: Reaction[]
    timeSent: Date
    lastEdited: Date | null
    sentBy: string
    optimistic?: boolean
}

export interface ChannelDetails {
    channelId: string
    channelName: string
}

export interface UserDetails {
    username: string
    image: string | null
}

export const fetchAllServers: Fetcher<ServerDetails[], string> = async (token) => {
    // TODO: replace stub code with backend request
    await new Promise(resolve => setTimeout(resolve, 1000)) // delay for simulate network delay

    const dummyData = [
        {
            name: 'server1',
            image: 'https://placehold.co/100x100.png',
            channelIds: ['server1_channel1', 'server1_channel2'],
            serverId: 'server1Id',
        },
        {
            name: 'server2',
            channelIds: ['server2_channel1', 'server2_channel2', 'server2_channel3'],
            serverId: 'server2Id',
        },

    ]
    return dummyData
}

export const fetchServer: Fetcher<ServerDetails, {token: string, serverId: string}> = async ({token, serverId}) => {
    const dummyData = {
        name: 'server1',
        image: 'https://placehold.co/100x100.png',
        channelIds: ['server1_channel1', 'server1_channel2'],
        serverId: 'server1Id',
    }
    return dummyData
}

let dummyMessages: Message[] = [
    {
        message: 'Hello World',
        messageId: 'message_1',
        reactions: [],
        timeSent: new Date('2022'),
        lastEdited: null,
        sentBy: 'danielwangid',
    },
    {
        message: 'Why hello there',
        messageId: 'message_2',
        reactions: [],
        timeSent: new Date('2023'),
        lastEdited: null,
        sentBy: 'danielwangid',
    },
    {
        message: 'fk u dwang',
        messageId: 'message_3',
        reactions: [],
        timeSent: new Date('2024'),
        lastEdited: null,
        sentBy: 'nguyenid',
    },
    {
        message: ':(',
        messageId: 'message_4',
        reactions: [],
        timeSent: new Date('2025'),
        lastEdited: null,
        sentBy: 'danielwangid',
    },
]

export const fetchChannelMessages = async ({token, channelId}: {token: string, channelId:string}): Promise<Message[]> => {
    return dummyMessages
}

export const fetchChannelDetails = async ({token, channelId}: {token: string, channelId:string}) => {
    await new Promise(resolve => setTimeout(resolve, 1000)) // delay for simulate network delay

    const dummyData = {
        channelName: 'channelName - fetchChannelDetails',
        channelId,
    }

    return dummyData
}

export const postMessageRequest = async (token: string, channelId: string, message: string): Promise<Message> => {
    await new Promise(resolve => setTimeout(resolve, 1000)) // delay for simulate network delay
    if (message.includes('bad')) {
        throw new Error('Failed to add new message')
    }
    const newMessage: Message = {
        message,
        messageId: uuidv4(),
        reactions: [],
        timeSent: new Date(),
        lastEdited: null,
        sentBy: message.includes('diff sender') ? uuidv4() : 'danielwangid',
    }
    dummyMessages.push(newMessage)
    return newMessage
}

export const deleteMessageRequest = async (token: string, messageId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000)) // delay for simulate network delay
    dummyMessages = dummyMessages.filter(message => message.messageId !== messageId)
    return true
}

export const postMessageEditRequest = async (token: string, messageId: string, messageString: string): Promise<Message> => {
    await new Promise(resolve => setTimeout(resolve, 1000)) // delay for simulate network delay
    const message = dummyMessages.find(message => message.messageId === messageId)
    if (message) {
        message.message = messageString
        return message
    }
    throw new Error('Failed to edit message')
}

export const getUserDetails = async (token: string, userId: string): Promise<UserDetails> => {
    await new Promise(resolve => setTimeout(resolve, 1000)) // delay for simulate network delay
    return {
        username: userId + 'name',
        image: null,
    }
}
