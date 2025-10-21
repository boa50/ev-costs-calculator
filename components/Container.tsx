import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function Container({ children }: { children: React.ReactNode }) {
    const { bottom: navBarHeight } = useSafeAreaInsets()

    return (
        <View className="flex-1" style={{ marginBottom: navBarHeight }}>
            {children}
        </View>
    )
}

export function ContentContainer({ children }: { children: React.ReactNode }) {
    return <View className="pt-4 px-4 flex-1">{children}</View>
}
