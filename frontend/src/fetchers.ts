import { Fetcher } from 'swr'

export interface serverDetails {
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

export const fetchAllServers: Fetcher<serverDetails[], string> = async (token) => {
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

export const fetchServer: Fetcher<serverDetails, {token: string, serverId: string}> = async ({token, serverId}) => {
    const dummyData = {
        name: 'server1',
        image: 'https://placehold.co/100x100.png',
        channelIds: ['server1_channel1', 'server1_channel2'],
        serverId: 'server1Id',
    }
    return dummyData
}

export const fetchChannelMessages: Fetcher<Message[], {token: string, channelId: string}> = async ({token, channelId}) => {
    const dummyData = [
        {
            message: 'Hello World',
            messageId: 'message_1',
            reactions: [],
            timeSent: new Date('2022'),
            lastEdited: null,
            sentBy: 'danielwang',
        },
        {
            message: 'Why hello there',
            messageId: 'message_2',
            reactions: [],
            timeSent: new Date('2023'),
            lastEdited: null,
            sentBy: 'danielwang',
        },
    ]
    return dummyData
}
