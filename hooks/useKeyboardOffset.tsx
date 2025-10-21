import { useState, useLayoutEffect, type RefObject } from 'react'
import { View } from 'react-native'
import { useKeyboardHeight } from './useKeyboardHeight'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

export function useKeyboardOffset(bottomRef?: RefObject<View | null>) {
    const keyboardHeight = useKeyboardHeight()
    const { height: screenHeight } = useSafeAreaFrame()
    const [keyboardOffset, setKeyboardOffset] = useState<number>()

    useLayoutEffect(() => {
        if (bottomRef !== undefined && bottomRef !== null) {
            bottomRef.current?.measure((x, y, width, height, pageX, pageY) => {
                const offset =
                    keyboardHeight - (screenHeight - (pageY + height))
                setKeyboardOffset(offset > 0 ? offset : 0)
            })
        } else {
            setKeyboardOffset(keyboardHeight)
        }
    }, [keyboardHeight, screenHeight, bottomRef])

    return keyboardOffset
}
