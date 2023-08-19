import * as Dialog from '@radix-ui/react-dialog';

interface EditModelProps {
    open: boolean
    onOpenChange: (isOpen: boolean) => void
    onCancel: () => void
    onSave: (editedValue: string) => void
    defaultValue?: string
    title: React.ReactNode
}

export default function EditModal({onCancel, onSave, defaultValue, title, open, onOpenChange}: EditModelProps) {
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const formElements = form.elements as typeof form.elements & {
            editInput: {value: string}
        }
        onSave(formElements.editInput.value)
    }

    return <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
            <Dialog.Overlay
                className='absolute left-0 top-0 w-screen h-screen bg-zinc-900/70 flex items-center justify-center' />
            <Dialog.Content
                className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-w-lg w-screen
                        bg-zinc-700 text-zinc-50 p-5 rounded drop-shadow-md'
            >
                <Dialog.Title className='text-xl'>
                    {title}
                </Dialog.Title>
                <form
                    onSubmit={handleSubmit}
                    className="mt-4 grid gap-2 grid-cols-2 md:grid-cols-[3fr_1fr_1fr]">
                    <input
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key == 'Enter') {
                                e.preventDefault()
                                onSave(e.currentTarget.value)
                            }
                        }}
                        spellCheck={false}
                        id="editInput"
                        defaultValue={defaultValue}
                        className='p-2 w-full bg-zinc-600 focus:outline-none grid-row col-span-2 md:col-span-1'
                    />
                    <button
                        role='button'
                        onClick={onCancel}
                        className='bg-red-400 py-2 px-4 transition-colors hover:bg-red-500 active:bg-red-600'>
                            Cancel
                    </button>
                    <button
                        role='submit'
                        className='bg-violet-500 py-2 px-4 transition-colors hover:bg-violet-600 active:bg-violet-700'>
                            Save
                    </button>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
}
