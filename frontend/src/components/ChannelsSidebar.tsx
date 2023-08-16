import {  faChevronDown, faHashtag, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useState } from 'react'
import * as ContextMenu from '@radix-ui/react-context-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import useConfirm from '@/hooks/useConfirm'
import EditModal from './EditModal'

interface ChannelsSidebarProps {
    server: {serverName: string, serverId: string}
    channels: {channelName: string, channelId: string}[]
    selectedChannel: string
}

export default function ChannelsSidebar({server, channels, selectedChannel}: ChannelsSidebarProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [editingServer, setEditingServer] = useState(false)

    return <div className="w-52 h-full bg-zinc-800 shrink-0">
        {/* Server Name */}
        <DropdownMenu.Root onOpenChange={() => setDropdownOpen(!dropdownOpen)}>
            <DropdownMenu.Trigger className='w-full'>
                <div className="flex mb-4 shadow-md text-zinc-50 w-full justify-between items-center transition hover:bg-zinc-700">
                    <h1 className="p-4">
                        {server.serverName}
                    </h1>
                    <FontAwesomeIcon icon={dropdownOpen ? faXmark : faChevronDown} className='pr-4 pl-2'/>
                </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className='-mt-2 p-2 rounded bg-zinc-900 text-zinc-300 text-sm flex flex-col gap-1'
                >
                    <DropdownMenu.Item
                        onClick={() => setEditingServer(true)}
                        className='py-1 px-3 rounded-sm hover:cursor-pointer hover:bg-violet-500 hover:text-zinc-50'>
                        Edit Server Name
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className='py-1 px-3 rounded-sm hover:cursor-pointer hover:bg-violet-500 hover:text-zinc-50'>
                        Create Invite
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <EditModal
            open={editingServer}
            onOpenChange={open => setEditingServer(open)}
            title={`Editing ${server.serverName}`}
            onSave={() => setEditingServer(false)}
            onCancel={() => setEditingServer(false)}
            defaultValue={server.serverName}
        />

        {/* Channel */}
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
        <EditModal
            open={isEditing}
            onOpenChange={(open) => setIsEditing(open)}
            onCancel={() => setIsEditing(false)}
            onSave={() => setIsEditing(false)}
            title={`Editing ${channelName}`}
            defaultValue={channelName}
        />
    </>
}
