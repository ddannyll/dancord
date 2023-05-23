import { SessionProvider } from 'next-auth/react'
import './globals.css'

import type { AppProps } from 'next/app';
export default function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}
