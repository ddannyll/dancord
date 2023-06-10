import Layout from '@/components/Layout';
import { fetchServer } from '@/fetchers';
import { AuthContext } from '@/pages/_app';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import useSWR from 'swr'

export default function Server() {
    return <Layout>
        <div className="text-slate-50">
            Select a channel cuh
        </div>
    </Layout>
}
