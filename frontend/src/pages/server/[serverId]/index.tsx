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
        <div className="text-slate-50">
            Select a channel cuh
        </div>
    </Layout>
}
