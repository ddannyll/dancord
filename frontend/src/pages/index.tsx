import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Index() {
    const { status } = useSession()
    const router = useRouter()
    if (status === 'unauthenticated') {
        router.push('/login')
    }

    if (status === 'authenticated') {
        return <div>Authenticated</div>
    } else {
        return <div>Loading</div>
    }
}
