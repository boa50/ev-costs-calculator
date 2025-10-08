import { createContext, useState, useContext, type ReactNode } from 'react'
import { Text } from 'react-native'
import Animated, { withTiming, useAnimatedStyle } from 'react-native-reanimated'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

type ToastType = 'success' | 'error' | 'info'

const ToastContext = createContext<{
    showToast: (msg: string, toastType?: ToastType, duration?: number) => void
}>({ showToast: () => {} })

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [message, setMessage] = useState<string>('')
    const [type, setType] = useState<ToastType>('info')
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isShowing, setIsShowing] = useState<boolean>(false)
    const animationDuration = 300

    const viewStyle = useAnimatedStyle(() => ({
        opacity: isShowing
            ? withTiming(1, { duration: animationDuration })
            : withTiming(0, { duration: animationDuration / 2 }),
    }))

    const showToast = (
        msg: string,
        toastType: ToastType = 'info',
        duration = 2000
    ) => {
        setMessage(msg)
        setType(toastType)
        setIsVisible(true)
        setIsShowing(true)

        setTimeout(() => {
            setIsShowing(false)
        }, duration)

        setTimeout(() => {
            setIsVisible(false)
        }, duration + animationDuration)
    }

    const Toast = () =>
        isVisible && (
            <Animated.View
                className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-50 
                    px-4 py-2 bg-gray-500 rounded-sm flex-row items-center gap-2`}
                style={viewStyle}
            >
                <MaterialCommunityIcons
                    name={type === 'success' ? 'check-circle' : 'alert-circle'}
                    size={14}
                    color="white"
                />
                <Text className="text-white text-sm">{message}</Text>
            </Animated.View>
        )

    return (
        <ToastContext value={{ showToast }}>
            {children}
            <Toast />
        </ToastContext>
    )
}

export const useToast = () => useContext(ToastContext)
