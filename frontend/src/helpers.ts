import dayjs from 'dayjs'
import calender from 'dayjs/plugin/calendar'

dayjs.extend(calender)

export function formatDate (date: string | Date) {
    const calenderConfig = {
        sameDay: '[Today at] h:mm A',
        nextDay: '[Tomorrow at] h:mm A',
        lastDay: '[Yesterday at] h:mm A',
        sameElse: 'DD/MM/YYYY h:mm A',
    }
    return dayjs(date).calendar(null, calenderConfig)
}
