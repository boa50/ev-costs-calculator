import { View } from 'react-native'

export function Container({ children }: { children: React.ReactNode }) {
    return <View className="p-4 flex-1">{children}</View>
}
