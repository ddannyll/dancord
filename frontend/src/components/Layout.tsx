import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Sidebar } from './Sidebar';

export default function Layout({children} : {children?: React.ReactNode}) {
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