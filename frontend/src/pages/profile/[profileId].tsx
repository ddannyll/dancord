import { useContext } from 'react'
import { AuthContext } from '../_app'
import Layout from '@/components/Layout'

export default function Profile() {
    const { authUser, authService, setAuthUser } = useContext(AuthContext)

    return <Layout>
        <div className="text-zinc-50">
            {authUser?.userId}
            <div className="">
                <button
                    onClick={async () => {
                        const signedOut = await authService?.signOut()
                        if (signedOut && setAuthUser) {
                            setAuthUser(null)
                        }
                    }}
                    className='p-2 bg-red-400 text-black rounded'>signout</button>
            </div>
        </div>
    </Layout>
}
