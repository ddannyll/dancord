import {  faHashtag } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useState } from 'react'
import * as ContextMenu from '@radix-ui/react-context-menu';
import * as Dialog from '@radix-ui/react-dialog';
import useConfirm from '@/hooks/useConfirm'

interface ChannelsSidebarProps {
    server: {serverName: string, serverId: string}
    channels: {channelName: string, channelId: string}[]
    selectedChannel: string
}

export default function ChannelsSidebar({server, channels, selectedChannel}: ChannelsSidebarProps) {
    return <div className="w-52 h-full bg-zinc-800 shrink-0">
        <h1 className="text-zinc-50 p-4 mb-4 shadow-md">{server.serverName}</h1>
        <ul className='flex flex-col gap-y-2 text-zinc-500 font-medium'>
            {channels.map(channel => <ChannelListing
                key={channel.channelId}
                channelName={channel.channelName}
                href={`/server/${server.serverId}/${channel.channelId}`}
                highlighted={channel.channelId === selectedChannel}
            />
            )}
            <li className='hover:bg-zinc-700/50 rounded mx-2'>
                <button className='flex p-2 gap-2 items-center w-full h-full'>
                    <FontAwesomeIcon icon={faSquarePlus} />
                    <span>
                        New Channel
                    </span>
                </button>
            </li>
        </ul>
    </div>
}

interface ChannelListingProps {
    channelName: string
    href: string
    highlighted?: boolean
    deleteChannel?: () => Promise<boolean>|void
    editChannelName?: () => Promise<boolean>|void
}

function ChannelListing({channelName, href, highlighted, deleteChannel, editChannelName}: ChannelListingProps) {
    const [isEditing, setIsEditing] = useState(false)
    const {tryAction, triedAction, setTriedAction} = useConfirm({
        action: () => {
            if (deleteChannel) { deleteChannel() }
        },
    })
    let className = 'hover:bg-zinc-700/50 rounded mx-2'
    if (highlighted) {
        className = 'bg-zinc-700 rounded text-zinc-100 mx-2'
    }

    return <>
        <ContextMenu.Root onOpenChange={(open) => {if (!open) {setTriedAction(false)}}}>
            <ContextMenu.Trigger>
                <li
                    className={className}
                >
                    <Link
                        className='p-2 flex gap-2 items-center'
                        href={href}
                    >
                        <FontAwesomeIcon icon={faHashtag}/>
                        {channelName}
                    </Link>
                </li>
            </ContextMenu.Trigger>
            <ContextMenu.Portal>
                <ContextMenu.Content
                    className='text-zinc-200 text-sm bg-zinc-900 p-2 flex flex-col gap-1 rounded' >
                    <ContextMenu.Item
                        onClick={() => setIsEditing(true)}
                        className='rounded-sm py-1 px-3 hover:outline-none hover:bg-violet-600 hover:cursor-pointer'>
                        Edit Channel Name
                    </ContextMenu.Item>
                    <ContextMenu.Item
                        onClick={e => {e.preventDefault(); tryAction()}}
                        className='rounded-sm py-1 px-3 hover:outline-none text-red-500 hover:bg-red-500 hover:text-zinc-200 hover:cursor-pointer'>
                        {triedAction
                            ?
                            <>Confirm Delete</>
                            :
                            <>Delete CHannel</>
                        }
                    </ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Portal>
        </ContextMenu.Root>
        <Dialog.Root open={isEditing} onOpenChange={(open) => setIsEditing(open)}>
            <Dialog.Portal>
                <Dialog.Overlay
                    className='absolute left-0 top-0 w-screen h-screen bg-zinc-900/70 flex items-center justify-center'/>
                <Dialog.Content
                    className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-w-lg w-screen
                        bg-zinc-700 text-zinc-50 p-5 rounded drop-shadow-md'
                >
                    <Dialog.Title className='text-xl'>
                        {`Editing ${channelName}`}
                    </Dialog.Title>
                    <div className="mt-4 grid gap-2 grid-cols-2 md:grid-cols-[3fr_1fr_1fr]">
                        <input
                            defaultValue={channelName}
                            className='p-2 w-full bg-zinc-600 focus:outline-none grid-row col-span-2 md:col-span-1'
                        />
                        <button
                            onClick={() => setIsEditing(false)}
                            className='bg-red-400 py-2 px-4 transition-colors hover:bg-red-500 active:bg-red-600'>
                            Cancel
                        </button>
                        <button className='bg-violet-500 py-2 px-4 transition-colors hover:bg-violet-600 active:bg-violet-700'>
                            Save
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    </>
}
