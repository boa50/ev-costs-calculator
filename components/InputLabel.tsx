import { View, Text } from 'react-native'
import { Info } from './Info'

export function InputLabel({ title, hint }: { title?: string; hint?: string }) {
    const labelText = (
        <Text className="text-gray-800 text-sm pb-1">{title}</Text>
    )

    return title && hint ? (
        <View className="flex-row gap-1 items-center">
            {labelText}
            <Info text={hint} />
        </View>
    ) : (
        title && labelText
    )
}
