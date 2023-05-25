import { useContext, useEffect } from 'react';
import { AuthContext } from './_app';
import { useRouter } from 'next/router';
import { Sidebar } from '@/components/Sidebar';

export default function Index() {
    const {authUser} = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (!authUser) {
            router.push('/login')
        }
    }, [authUser, router])

    return <div className='bg-zinc-700 w-screen h-screen flex'>
        <Sidebar />
    </div>
}

