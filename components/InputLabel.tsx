import { View, Text } from 'react-native'
import { Info } from './Info'

interface Props {
    title?: string
    hint?: string
    required?: boolean
    isInputValid?: boolean
}

export function InputLabel({ title, hint, required, isInputValid }: Props) {
    const textColour = isInputValid ? 'text-gray-800' : 'text-red-600'

    const labelText = (
        <Text className={`text-sm pb-1 ${textColour}`}>
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
