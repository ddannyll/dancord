
import { AuthContext } from '@/pages/_app'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Url } from 'next/dist/shared/lib/router/router'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import useSWR, { Fetcher } from 'swr'

interface serverDetails {
    name: string
    serverId: string
    channelIds: string[]
    image?: string,
}

const serverFetcher: Fetcher<serverDetails[], string> = async (token) => {
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

export function Sidebar() {
    const {authUser} = useContext(AuthContext)
    const {data: serverDetailsList, error, isLoading} = useSWR(authUser?.token, serverFetcher)
    // TODO: get servers the user is in and display them

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    return <div className="w-[80px] bg-zinc-900 overflow-y-auto text-zinc-50 flex flex-col p-[15px] gap-y-3">
        <ServerIcon
            href={`/profile/${authUser?.user}`}
        >
            <FontAwesomeIcon icon={faUser} className='h-[25px] w-[25px]'/>
        </ServerIcon>
        <hr className='border-zinc-700 border-2 mx-1'/>
        {serverDetailsList && serverDetailsList.map(
            serverDetails => <ServerIcon
                key={serverDetails.serverId}
                href={`/server/${serverDetails.serverId}`}
            >
                {serverDetails.image
                    ? <Image src={serverDetails.image} alt={'Server image'} width={50} height={50}/>
                    : <h2 className='text-lg'>{serverDetails.name[0]}</h2>
                }
            </ServerIcon>
        )}

    </div>
}

interface ServerIconProps {
    href?: Url,
    children?: React.ReactNode
}
function ServerIcon({href, children}: ServerIconProps) {
    return <Link
        href={href || '/'}
        className="w-[50px] h-[50px] bg-zinc-700 rounded-[25px] grid place-items-center hover:rounded-xl hover:bg-violet-500 transition-all overflow-hidden"
    >
        {children}
    </Link>
}
