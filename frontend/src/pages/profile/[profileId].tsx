import { useContext } from 'react'
import { AuthContext } from '../_app'
import Layout from '@/components/Layout'

export default function Profile() {
    const { authUser } = useContext(AuthContext)

    return <Layout>
        {authUser?.user}
    </Layout>
}
