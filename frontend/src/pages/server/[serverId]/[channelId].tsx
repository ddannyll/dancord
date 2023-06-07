import Layout from '@/components/Layout';
import Messages from '@/components/Messages';
import { fetchServer } from '@/fetchers';
import useMessage from '@/hooks/useMessage';
import { AuthContext } from '@/pages/_app';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import useSWR from 'swr'

export default function Channel() {
    const router = useRouter()
    const {authUser} = useContext(AuthContext)
    const serverId = router.query.serverId
    const channelId = router.query.channelId
    const messages = useMessage({channelId: channelId as string, token: authUser?.token || ''})

    return <Layout>
        <Messages messages={messages}/>
    </Layout>
}
