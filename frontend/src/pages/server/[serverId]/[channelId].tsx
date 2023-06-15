import Layout from '@/components/Layout';
import Messages from '@/components/Messages';
import useChannel from '@/hooks/useChannel';
import { AuthContext } from '@/pages/_app';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

export default function Channel() {
    const router = useRouter()
    const {authUser} = useContext(AuthContext)
    const channelId = router.query.channelId
    const {messages, channelName} = useChannel({channelId: channelId as string, token: authUser?.token || ''})

    return <Layout>
        <div className="flex flex-col w-full justify-between">
            <Messages
                messages={messages}
                className='grow px-6'
            />
            <input
                type="text"
                className='bg-zinc-600 m-6 mt-0 py-4 px-6 text-zinc-50 focus:outline-none'
                placeholder={`Message ${channelName}`}/>
        </div>
    </Layout>
}
