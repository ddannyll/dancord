import Layout from '@/components/Layout';
import Messages from '@/components/Messages';
import useChannel from '@/hooks/useChannel';
import { AuthContext } from '@/pages/_app';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export default function Channel() {
    const router = useRouter()
    const {authUser} = useContext(AuthContext)
    const channelId = router.query.channelId
    const {messages, channelName} = useChannel({channelId: channelId as string, token: authUser?.token || ''})

    return <Layout>
        <div className="flex flex-col w-full justify-between">
            <Messages messages={messages} className='grow'/>
            <input type="text" className='bg-zinc-600 m-6 mt-0 p-4 text-zinc-50' placeholder={`Message ${channelName}`}/>
        </div>
    </Layout>
}
