import { Pressable, Text, View } from 'react-native'

type Props = {
    label: string
    theme?: 'primary' | 'secondary'
    onPress?: () => void
    width?: string
}

export function Button({ label, theme, onPress, width = 'w-full' }: Props) {
    const pressableDynamicClasses =
        theme === 'secondary'
            ? 'border-accent-standard bg-accent-standard/5 active:bg-accent-standard/15'
            : 'bg-accent-standard active:bg-accent-standard/90 border-transparent'
    const textDynamicClasses =
        theme === 'secondary' ? 'text-accent-standard' : 'text-text-light'

    return (
        <View className={width}>
            <Pressable
                className={`p-3 rounded-2xl flex items-center w-full border ${pressableDynamicClasses}`}
                onPress={onPress}
            >
                <Text className={`font-medium ${textDynamicClasses}`}>
                    {label}
                </Text>
            </Pressable>
        </View>
    )
}
