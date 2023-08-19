import { AuthService, HTTPAuthService } from '@/service/authService';
import './globals.css'
import type { AppProps } from 'next/app';
import { createContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AuthUser {
    userId: string
}

interface AuthContextInterface {
    authUser: AuthUser | null,
    setAuthUser: ((authUser: AuthUser|null) => void) | null
    authService: AuthService | null
}

export const AuthContext = createContext<AuthContextInterface>({authUser: null, setAuthUser: null, authService: null})

export default function MyApp({ Component, pageProps: {...pageProps} }: AppProps) {
    const [authUser, setAuthUser] = useState<AuthUser|null>(null)
    const authService = new HTTPAuthService(new URL('http://localhost:8080'))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (
        <AuthContext.Provider value={{authUser, setAuthUser, authService}}>
            <Component {...pageProps} />
            <ToastContainer theme='dark'/>
        </AuthContext.Provider>
    )
}
