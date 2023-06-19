import { useEffect, useState } from 'react'

interface useConfirmParameters {
    timeout?: number
    action: () => void
}
export default function useConfirm({timeout, action}: useConfirmParameters) {
    const [triedAction, setTriedAction] = useState(false)
    const tryAction = () => {
        if (triedAction) {
            action()
        } else {
            setTriedAction(true)
        }
    }

    useEffect(() => {
        return () => setTriedAction(false)
    }, [])

    return {triedAction, tryAction, setTriedAction}
}
