import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

interface ChannelsSidebarProps {
    server: {serverName: string, serverId: string}
    channels: {channelName: string, channelId: string}[]
    selectedChannel: string
}

export default function ChannelsSidebar({server, channels, selectedChannel}: ChannelsSidebarProps) {
    return <div className="w-52 h-full bg-zinc-800 p-4">
        <h1 className="text-zinc-50 pb-4 mb-4 shadow-md">{server.serverName}</h1>
        <ul className='flex flex-col gap-y-2 text-zinc-500 font-medium'>
            {channels.map(channel => {
                let className = 'flex items-center gap-2 hover:bg-zinc-700/50 p-2 -ml-2 rounded'
                if (channel.channelId === selectedChannel) {
                    className = 'flex items-center gap-2 bg-zinc-700 p-2 -ml-2 rounded text-zinc-100'
                }

                return <li
                    className={className}
                    key={channel.channelId}
                >
                    <FontAwesomeIcon icon={faHashtag}/>
                    <Link href={`server/${server.serverId}/${channel.channelId}`}>{channel.channelName}</Link>
                </li>
            })}
        </ul>
    </div>
}
