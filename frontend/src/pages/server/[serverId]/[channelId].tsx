import Layout from '@/components/Layout';
import Message from '@/components/Message';
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
        <div className="h-full flex-col-reverse text-slate-50">
            {messages.map(m =>
                <Message
                    key={m.messageId}
                    message={m.message}
                    lastEdited={m.lastEdited}
                    timeSent={m.timeSent}
                    senderId={m.sentBy}
                    messageId={m.messageId}
                    // todo create hook to get these
                    profilePicture={null}
                    senderName={'get the proper name '}
                />
            )
            }
        </div>
    </Layout>
}
