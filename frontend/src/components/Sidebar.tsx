
import { ServerDetails, fetchAllServers } from '@/fetchers'
import { applyFn } from '@/helpers'
import { AuthContext } from '@/pages/_app'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Url } from 'next/dist/shared/lib/router/router'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import useSWR from 'swr'



export function Sidebar() {
    const {authUser} = useContext(AuthContext)
    const {data: serverDetailsList, error } = useSWR([fetchAllServers], applyFn<void, ServerDetails[]>)
    // TODO: get servers the user is in and display them

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    console.log(serverDetailsList)

    return <div className="shrink-0 w-[75px] bg-zinc-900 overflow-y-auto text-zinc-50 flex flex-col items-center pt-3 gap-y-3">
        <ServerIcon
            href={`/profile/${authUser?.userId}`}
        >
            <FontAwesomeIcon icon={faUser} className='h-[25px] w-[25px]'/>
        </ServerIcon>
        <hr className='border-zinc-700 border-2 mx-1 w-10'/>
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
        <button
            className='w-[50px] h-[50px] bg-zinc-800 rounded-xl grid place-items-center hover:rounded-xl hover:bg-violet-500 transition-all overflow-hidden'>
                +
        </button>
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
