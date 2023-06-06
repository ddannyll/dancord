import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

interface ChannelsSidebarProps {
    server: {serverName: string, serverId: string}
    channels: {channelName: string, channelId: string}[]
    selectedChannel: string
}

export default function ChannelsSidebar({server, channels, selectedChannel}: ChannelsSidebarProps) {
    return <div className="w-52 h-full bg-zinc-800 shrink-0">
        <h1 className="text-zinc-50 p-4 mb-4 shadow-md">{server.serverName}</h1>
        <ul className='flex flex-col gap-y-2 text-zinc-500 font-medium'>
            {channels.map(channel => {
                let className = 'hover:bg-zinc-700/50 rounded mx-2'
                if (channel.channelId === selectedChannel) {
                    className = 'bg-zinc-700 rounded text-zinc-100 mx-2'
                }

                return <li
                    className={className}
                    key={channel.channelId}
                >
                    <Link
                        className='p-2 flex gap-2 items-center'
                        href={`/server/${server.serverId}/${channel.channelId}`}
                    >
                        <FontAwesomeIcon icon={faHashtag}/>
                        {channel.channelName}
                    </Link>
                </li>
            })}
        </ul>
    </div>
}
