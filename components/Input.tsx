import { View, TextInput, Text } from 'react-native'
import type { KeyboardTypeOptions } from 'react-native'

interface Props {
    label?: string
    value: any
    setValue: React.Dispatch<React.SetStateAction<any>>
    keyboardType?: KeyboardTypeOptions
}

export default function Input({ label, value, setValue, keyboardType }: Props) {
    return (
        <View>
            {label && (
                <Text className="text-gray-800 text-sm pb-1">{label}</Text>
            )}
            <TextInput
                className="border min-w-40 rounded-xl pl-3 py-3 bg-white border-gray-400 focus:border-sky-700"
                onChangeText={setValue}
                value={value}
                keyboardType={keyboardType}
            />
        </View>
    )
}
