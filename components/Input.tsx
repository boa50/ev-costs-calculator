import { View, TextInput, Text } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import colors from 'tailwindcss/colors'
import type { KeyboardTypeOptions } from 'react-native'

interface Props {
    label?: string
    value: any
    setValue: React.Dispatch<React.SetStateAction<any>>
    icon?: 'dollar' | 'percentage'
    iconPosition?: 'left' | 'right'
    keyboardType?: KeyboardTypeOptions
}

export default function Input({
    label,
    value,
    setValue,
    icon,
    iconPosition = 'left',
    keyboardType,
}: Props) {
    const inputBorderClasses = icon
        ? iconPosition === 'left'
            ? 'border-y border-r rounded-r-xl'
            : 'border-y border-l rounded-l-xl'
        : 'border rounded-xl'
    const iconRoundedClasses =
        iconPosition === 'left' ? 'rounded-l-xl' : 'rounded-r-xl'

    const InputIcon = () => (
        <View
            className={`${iconRoundedClasses} flex flex-row px-3 border h-full items-center  bg-gray-200 border-gray-400`}
        >
            <FontAwesome name="dollar" size={16} color={colors.gray[600]} />
        </View>
    )

    return (
        <View>
            {label && (
                <Text className="text-gray-800 text-sm pb-1">{label}</Text>
            )}
            <View className="flex flex-row">
                {icon && iconPosition === 'left' && <InputIcon />}
                <TextInput
                    className={`${inputBorderClasses} min-w-40 pl-3 py-3 bg-white border-gray-400 focus:border-sky-700`}
                    onChangeText={setValue}
                    value={value}
                    keyboardType={keyboardType}
                />
                {icon && iconPosition === 'right' && <InputIcon />}
            </View>
        </View>
    )
}
