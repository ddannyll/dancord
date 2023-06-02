import ChannelsSidebar from '@/components/ChannelsSidebar';
import Layout from '@/components/Layout';
import { fetchServer } from '@/fetchers';
import { AuthContext } from '@/pages/_app';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import useSWR from 'swr'

export default function Server() {
    const router = useRouter()
    const {authUser} = useContext(AuthContext)
    const serverId = router.query.serverId
    const {data: serverDetails, isLoading, error} = useSWR({token: authUser?.token, serverId}, fetchServer)

    return <Layout>
        <div className="flex h-full">
            <ChannelsSidebar
                server={{
                    serverName: serverDetails?.name || '',
                    serverId: serverId as string,
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
                selectedChannel='server1_channel1'
            />
            {JSON.stringify(serverDetails)}
        </div>
    </Layout>
}
