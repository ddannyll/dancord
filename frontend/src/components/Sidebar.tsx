
import { AuthContext } from '@/pages/_app'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import useSWR, { Fetcher } from 'swr'

const serverFetcher: Fetcher<string, string[]> = (...args) => {
}

export function Sidebar() {
    const {authUser} = useContext(AuthContext)
    const {data, error, isLoading} = useSWR()
    // TODO: get servers the user is in and display them

    return <div className="w-[80px] bg-zinc-900 overflow-y-auto text-zinc-50 flex flex-col p-[15px]">
        <Link
            href={`/profile/${authUser?.user}`}
            className="w-[50px] h-[50px] bg-zinc-700 rounded-[25px] grid place-items-center hover:rounded-xl hover:bg-violet-500 transition-all">
            <FontAwesomeIcon icon={faUser} className='h-[25px] w-[25px]'/>
        </Link>
        <hr className='border-zinc-700 border-2 my-2 mx-1'/>
    </div>
}
