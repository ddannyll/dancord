import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Sidebar } from './Sidebar';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '@/pages/_app';
import { useRouter } from 'next/router';
import ChannelsSidebar from './ChannelsSidebar';
import useSWR from 'swr';
import { fetchServer } from '@/fetchers';

export default function Layout({children} : {children?: React.ReactNode}) {
    const {authUser} = useContext(AuthContext)
    const router = useRouter()
    useEffect(() => {
        if (!authUser?.token) {
            router.push('/login')

        }
    }, [authUser?.token, router])

    const serverId = router.query.serverId
    const {data: serverDetails, isLoading, error} = useSWR({token: authUser?.token, serverId}, fetchServer)

    return <div className='bg-zinc-700 w-screen h-screen flex'>
        <Sidebar />
        <main className='grow flex'>
            {serverId && serverDetails && <ChannelsSidebar
                server={{
                    serverId: serverDetails.serverId,
                    serverName: serverDetails.name,
                }}
                channels={[
                    {
                        channelId: 'server1_channel1',
                        channelName: 'first channel',
                    },
                    {
                        channelId: 'server1_channel2',
                        channelName: 'second channel',
                    },
                ]}
                selectedChannel={router.query.channelId as string}
            />
            }
            {children}
        </main>
        <ToastContainer
            theme="dark"
        />
    </div>
}
