import { useState, useRef, useEffect } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'

interface Props {
    isVisible: boolean
    onPress: () => void
    zIndex?: number
}

export function ControlOutsideClick({
    isVisible,
    onPress,
    zIndex = 10,
}: Props) {
    const targetRef = useRef<View>(null)
    const [pos, setPos] = useState<number>()
    useEffect(() => {
        targetRef.current?.measure((x, y, width, height, pageX, pageY) => {
            setPos(-pageX)
        })
    }, [isVisible])

    return (
        isVisible && (
            <View
                ref={targetRef}
                className="absolute top-0"
                style={{ zIndex: zIndex }}
            >
                <TouchableWithoutFeedback onPress={onPress} accessible={false}>
                    <View
                        className="absolute h-screen w-screen"
                        style={{ left: pos }}
                    ></View>
                </TouchableWithoutFeedback>
            </View>
        )
    )
}
