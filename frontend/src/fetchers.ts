import { Fetcher } from 'swr'

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
}

export interface ChannelDetails {
    channelId: string
    channelName: string
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

export const fetchChannelMessages = async ({token, channelId}: {token: string, channelId:string}): Promise<Message[]> => {
    const dummyData = [
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
    return dummyData
}

export const fetchChannelDetails = async ({token, channelId}: {token: string, channelId:string}) => {
    await new Promise(resolve => setTimeout(resolve, 1000)) // delay for simulate network delay

    const dummyData = {
        channelName: 'channelName - fetchChannelDetails',
        channelId,
    }

    return dummyData
}
