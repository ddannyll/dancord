import { useContext, useEffect } from 'react';
import { AuthContext } from './_app';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function Index() {
    const {authUser} = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (!authUser) {
            router.push('/login')
        }
    }, [authUser, router])

    return <Layout />
}

