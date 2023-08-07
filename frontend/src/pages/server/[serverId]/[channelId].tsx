import Layout from '@/components/Layout';
import Messages from '@/components/Messages';
import useChannel from '@/hooks/useChannel';
import { AuthContext } from '@/pages/_app';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { toast } from 'react-toastify';

export default function Channel() {
    const router = useRouter()
    const {authUser} = useContext(AuthContext)
    const channelId = router.query.channelId
    const {messages, channelName, sendMessage, deleteMessage, editMessage} = useChannel({channelId: channelId as string, token: authUser?.token || ''})

    const handleInputKeyUp = async (e: React.KeyboardEvent) => {
        if (e.key !== 'Enter') {
            return
        }

        const messageText = (e.currentTarget as HTMLInputElement).value

        try {
            (e.currentTarget as HTMLInputElement).value = ''
            await sendMessage(messageText)
        } catch (err) {
            toast.error('Failed to send message')
        }
    }

    return <Layout>
        <div className="flex flex-col w-full justify-between">
            <Messages
                editMessage={editMessage}
                deleteMessage={deleteMessage}
                messages={messages}
                className='grow px-6'
            />
            <input
                type="text"
                className='bg-zinc-600 m-6 mt-0 py-4 px-6 text-zinc-50 focus:outline-none'
                placeholder={`Message ${channelName}`}
                onKeyUp={handleInputKeyUp}
            />
        </div>
    </Layout>
}
