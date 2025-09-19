import { useState } from 'react'
import { View, TextInput, Text } from 'react-native'
import colors from 'tailwindcss/colors'

interface Props {
    label?: string
    value: any
    setValue: React.Dispatch<React.SetStateAction<any>>
    iconLeft?: string
    iconRight?: string
    placeholder?: string
}

export function Input({
    label,
    value,
    setValue,
    iconLeft,
    iconRight,
    placeholder,
}: Props) {
    const [borderColour, setBorderColour] = useState<string>('border-gray-400')

    const inputDynamicClasses =
        !iconLeft && !iconRight
            ? 'rounded-2xl pl-3'
            : iconLeft
              ? 'rounded-r-2xl'
              : 'rounded-l-2xl pl-3'

    const onFocus = () => {
        setBorderColour('border-sky-700')
    }
    const onBlur = () => {
        setBorderColour('border-gray-400')
    }

    const handleChangeText = (text: string) => {
        const cleanedValue = text.replace(/[^0-9\,\.]/g, '')
        setValue(cleanedValue)
    }

    return (
        <View>
            {label && (
                <Text className="text-gray-800 text-sm pb-1">{label}</Text>
            )}
            <View
                className={`flex flex-row bg-white rounded-2xl border w-full ${borderColour}`}
            >
                <InputIcon icon={iconLeft} position="left" />
                <TextInput
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className={`flex-1 py-3 border-0 ${inputDynamicClasses}`}
                    onChangeText={handleChangeText}
                    value={value}
                    keyboardType={'number-pad'}
                    placeholder={placeholder}
                    placeholderTextColor={colors.gray[400]}
                    maxLength={15}
                />
                <InputIcon icon={iconRight} position="right" />
            </View>
        </View>
    )
}

function InputIcon({
    icon,
    position,
}: {
    icon?: string
    position: 'left' | 'right'
}) {
    const iconDynamicClasses =
        position === 'left' ? 'rounded-l-2xl' : 'rounded-r-2xl'

    return (
        icon && (
            <View
                className={`flex flex-row h-full items-center justify-center px-2 ${iconDynamicClasses}`}
            >
                <Text className="text-md font-normal text-gray-800">
                    {icon}
                </Text>
            </View>
        )
    )
}
