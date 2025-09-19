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
            ? 'border-sky-700 bg-sky-700/5 active:bg-sky-700/15'
            : 'bg-sky-700 active:bg-sky-700/90 border-transparent'
    const textDynamicClasses =
        theme === 'secondary' ? 'text-sky-700' : 'text-white'

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
