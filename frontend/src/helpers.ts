import dayjs from 'dayjs'
import calender from 'dayjs/plugin/calendar'
import { Message, UserDetails, getUserDetails } from './fetchers'
import { MessageWithSenderDetails } from './components/Messages'

dayjs.extend(calender)

export function applyFn<Input, Output>([fn, ...input]: [fn: (arg0: Input) => Output, input: Input]) {
    return fn(...input)
}

export function formatDate (date: string | Date) {
    const calenderConfig = {
        sameDay: '[Today at] h:mm A',
        nextDay: '[Tomorrow at] h:mm A',
        lastDay: '[Yesterday at] h:mm A',
        sameElse: 'DD/MM/YYYY h:mm A',
    }
    return dayjs(date).calendar(null, calenderConfig)
}

const profileInfoCache = new Map<string, UserDetails>()
export async function attachMessageSenderInfo(token: string, message: Message): Promise<MessageWithSenderDetails> {
    if (!profileInfoCache.has(message.sentBy)) {
        // details not in cache so we have to fetch them
        const fetchedUserDetails = await getUserDetails(token, message.sentBy)
        profileInfoCache.set(message.sentBy, fetchedUserDetails)
    }
    const senderDetails = profileInfoCache.get(message.sentBy) as UserDetails
    const messageWithSenderDetails: MessageWithSenderDetails = {
        ...message,
        sentBy: {
            senderId: message.sentBy,
            displayName: senderDetails.username,
            profilePicture: senderDetails.image,
        },
    }
    return messageWithSenderDetails
}

export function compareMessageByDate(m1: Message | MessageWithSenderDetails, m2: Message | MessageWithSenderDetails) {
    return m1.timeSent.getTime() - m2.timeSent.getTime()
}
