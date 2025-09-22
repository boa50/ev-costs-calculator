import { View } from 'react-native'

interface Props {
    additionalClasses?: string
    children: React.ReactNode
}

export function Grid({ additionalClasses, children }: Props) {
    return <View className={`w-full ${additionalClasses}`}>{children}</View>
}

export function Row({ additionalClasses, children }: Props) {
    return (
        <View className={`flex-row gap-4 ${additionalClasses}`}>
            {children}
        </View>
    )
}

export function Col({ additionalClasses, children }: Props) {
    return <View className={`flex-1 ${additionalClasses}`}>{children}</View>
}
