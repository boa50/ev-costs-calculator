import { useState } from 'react'
import { View, TextInput, Text } from 'react-native'
import { Info } from './Info'
import colors from 'tailwindcss/colors'

interface Props {
    label?: string
    value: string
    setValue: (value: string) => void
    iconLeft?: string
    iconRight?: string
    placeholder?: string
    hint?: string
}

export function Input({
    label,
    value,
    setValue,
    iconLeft,
    iconRight,
    placeholder,
    hint,
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
            <Label title={label} hint={hint} />
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

function Label({ title, hint }: { title?: string; hint?: string }) {
    const labelText = (
        <Text className="text-gray-800 text-sm pb-1">{title}</Text>
    )

    return title && hint ? (
        <View className="flex-row gap-1 items-center">
            {labelText}
            <Info />
        </View>
    ) : (
        title && labelText
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
