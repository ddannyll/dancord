import './globals.css'
import type { AppProps } from 'next/app';
import { createContext, useState } from 'react';

interface AuthUser {
    token: string
    user: string
}

interface AuthContextInterface {
    authUser: AuthUser | null,
    setAuthUser: ((authUser: AuthUser) => void) | null
}

export const AuthContext = createContext<AuthContextInterface>({authUser: null, setAuthUser: null})

export default function MyApp({ Component, pageProps: {...pageProps} }: AppProps) {
    const [authUser, setAuthUser] = useState<AuthUser|null>(null)
    console.log({authUser})
    return (
        <AuthContext.Provider value={{authUser, setAuthUser}}>
            <Component {...pageProps} />
        </AuthContext.Provider>
    )
}
