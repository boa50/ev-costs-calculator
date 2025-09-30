import { View, Text } from 'react-native'
import { Info } from './Info'

interface Props {
    title?: string
    hint?: string
    required?: boolean
}

export function InputLabel({ title, hint, required }: Props) {
    const labelText = (
        <Text className="text-gray-800 text-sm pb-1">
            {title}
            {required && ' *'}
        </Text>
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
