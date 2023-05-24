import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Index() {
    return <div>
        <Link href={'/login'}>login</Link>
        <Link href={'/register'}>register</Link>
    </div>
}
