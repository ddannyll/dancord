import { getUserDetails } from '@/fetchers'
import { applyFn } from '@/helpers'
import useSWR from 'swr'


interface useUserDetailsProps {
    userId: string
    token: string
}

export default function useUserDetails({userId, token}: useUserDetailsProps) {
    const {data} = useSWR(
        [getUserDetails, token, userId],
        applyFn<Parameters<typeof getUserDetails>, ReturnType<typeof getUserDetails>>
    )
    return data
}
