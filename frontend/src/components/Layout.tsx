import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Sidebar } from './Sidebar';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/pages/_app';
import { useRouter } from 'next/router';

export default function Layout({children} : {children?: React.ReactNode}) {
    const {authUser} = useContext(AuthContext)
    const router = useRouter()
    useEffect(() => {
        if (!authUser?.token) {
            router.push('/login')

        }
    }, [authUser?.token, router])

    return <div className='bg-zinc-700 w-screen h-screen flex'>
        <Sidebar />
        <main className='grow'>
            {children}
        </main>
        <ToastContainer
            theme="dark"
        />
    </div>
}
