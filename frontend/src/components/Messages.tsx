import { Message } from '@/fetchers'
import { formatDate } from '@/helpers'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as ContextMenu from '@radix-ui/react-context-menu';
import { useEffect, useRef, useState } from 'react';

const NEW_GROUP_TIME_DELTA_THRESHOLD = 6 * 60 * 1000

interface MessagesProps {
    messages: Message[]
    className?: string
    deleteMessage: (messageId: string) => void
    editMessage: (messageId: string, editedMessage: string) => void
}

export default function Messages({messages, className, deleteMessage, editMessage}: MessagesProps) {
    const messageGroups: Message[][] = []
    // we need to group consecutive messages sent by the same user
    // so that we can append the sender's details at the top
    let currentGroup: Message[] = []
    let prevSender: null | string = null
    let prevTimeSent = new Date(0)
    for (let i = 0; i < messages.length; i++) {
        const currMessage = messages[i]
        const timeDeltaMs = currMessage.timeSent.getTime() - prevTimeSent.getTime()
        if ((prevSender !== currMessage.sentBy || timeDeltaMs >= NEW_GROUP_TIME_DELTA_THRESHOLD)
            && currentGroup.length > 0) {
            messageGroups.push(currentGroup)
            currentGroup = []
        }
        currentGroup.push(currMessage)
        prevSender = currMessage.sentBy
        prevTimeSent = currMessage.timeSent
    }
    if (currentGroup.length > 0) {
        messageGroups.push(currentGroup)
    }


    return <div className={`w-full overflow-y-scroll ${className}`}>
        <div className={'flex min-h-full flex-col justify-end'}>
            {messageGroups
                .map(messageGroup =>
                    <MessageGroup
                        deleteMessage={deleteMessage}
                        editMessage={editMessage}
                        key={messageGroup[0].messageId}
                        messageGroup={messageGroup}
                    />)
            }
        </div>
    </div>

}


interface MessageGroupProps {
    messageGroup: Message[]
    deleteMessage: (messageId: string) => void
    editMessage: (messageId: string, editedMessage: string) => void
}
function MessageGroup({messageGroup, deleteMessage, editMessage}: MessageGroupProps) {
    const senderId = messageGroup[0].sentBy
    const messages = messageGroup.map(m =>
        <Message
            message={m.message}
            key={m.messageId}
            onDelete={() => deleteMessage(m.messageId)}
            onEdit={(editedMessage: string) => editMessage(m.messageId, editedMessage)}
            optimistic={m.optimistic}
        />
    )

    return <div className='flex mb-4'>
        <div className="mr-4 mt-1 w-[40px] h-[40px] rounded-full border overflow-hidden">
            {/*  TODO: GET THE CORRECT PROFILE PHOTO */}
            <FontAwesomeIcon icon={faUser} className="text-white w-full h-full" />
        </div>
        <div className="grow">
            <div className="flex gap-2 items-end">
                <h2 className='text-zinc-50 font-medium'>{senderId} [change to name]</h2>
                <h3 className='text-zinc-400 text-sm'>{formatDate(messageGroup[0].timeSent)}</h3>
            </div>
            {messages}
        </div>
    </div>
}

interface MessageProps {
    message: string
    onEdit?: (editedMessage: string) => void
    onDelete?: () => void
    optimistic?: boolean
}
function Message({message, onEdit, onDelete, optimistic}: MessageProps) {
    const [isEditing, setIsEditing] = useState(false)
    const editInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        // This Effect auto focuses the input when edit btn is pressed
        // Im not sure why this works but it does
        let timeout: ReturnType<typeof setTimeout>
        if (isEditing) {
            timeout = setTimeout(() => {
                editInput.current?.focus()
                , 0
            })
        }
        return () => clearTimeout(timeout)
    }, [isEditing])

    const handleEditFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        interface formInterface extends HTMLElement {
            editInput: HTMLInputElement
        }
        const form = e.currentTarget as formInterface
        if (onEdit) {
            onEdit(form.editInput.value)
        }
    }

    return <div>
        <ContextMenu.Root>
            <ContextMenu.Trigger
                disabled={optimistic}
                className={`${optimistic ? 'text-zinc-500' : 'text-zinc-300'} py-0.5 relative w-full`}
            >
                {isEditing
                    ?
                    <form className="" onSubmit={handleEditFormSubmit}>
                        <input
                            id="editInput"
                            type="text"
                            className='w-full bg-zinc-600 p-2 rounded'
                            defaultValue={message}
                            ref={editInput}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.code === 'Enter' && onEdit) {
                                    e.preventDefault()
                                    onEdit(e.currentTarget.value)
                                    setIsEditing(false)
                                }
                            }}
                        />
                        <div className="flex gap-3 text-xs underline text-violet-400">
                            <button onClick={(e: React.SyntheticEvent) => {
                                e.preventDefault()
                                setIsEditing(false)
                            }}>
                                cancel
                            </button>
                            <button
                                type='submit'
                                onClick={() => setTimeout(() => setIsEditing(false), 0)}
                            >
                                save
                            </button>
                        </div>
                    </form>
                    :
                    <p className='min-h-[1em]'>
                        {message}
                    </p>
                }
            </ContextMenu.Trigger>
            <ContextMenu.Portal>
                <ContextMenu.Content
                    className='text-zinc-200 text-sm bg-zinc-800 p-2 flex flex-col gap-1 rounded' >
                    <ContextMenu.Item
                        onClick={() => setIsEditing(true)}
                        className='rounded-sm py-1 px-3 hover:outline-none hover:bg-violet-600 hover:cursor-pointer'>
                    Edit Message
                    </ContextMenu.Item>
                    <ContextMenu.Item
                        onClick={onDelete}
                        className='rounded-sm py-1 px-3 hover:outline-none text-red-500 hover:bg-red-500 hover:text-zinc-200 hover:cursor-pointer'>
                    Delete Message
                    </ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Portal>
        </ContextMenu.Root>
    </div>
}
