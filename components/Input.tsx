import { useState } from 'react'
import { View, TextInput, Text } from 'react-native'
import { InputLabel } from './InputLabel'
import { isInputNumberValid } from '@/utils'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import colors from 'tailwindcss/colors'

interface Props {
    label?: string
    value: string
    setValue: (value: string) => void
    iconLeft?: string
    iconRight?: string
    placeholder?: string
    hint?: string
    required?: boolean
}

export function Input({
    label,
    value,
    setValue,
    iconLeft,
    iconRight,
    placeholder,
    hint,
    required,
}: Props) {
    const [borderColour, setBorderColour] = useState<string>('border-gray-400')
    const [isInputValid, setIsInputValid] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string>('')

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
        if (isFieldValid(value, required, setErrorMessage)) {
            setIsInputValid(true)
            setBorderColour('border-gray-400')
        } else {
            setIsInputValid(false)
            setBorderColour('border-red-600')
        }
    }

    const handleChangeText = (text: string) => {
        const cleanedValue = text.replace(/[^0-9\,\.]/g, '')
        setValue(cleanedValue)
        if (
            !isInputValid &&
            isFieldValid(cleanedValue, required, setErrorMessage)
        )
            setIsInputValid(true)
    }

    return (
        <View>
            <InputLabel
                title={label}
                hint={hint}
                required={required}
                isInputValid={isInputValid}
            />
            <View
                className={`flex flex-row bg-white rounded-2xl border w-full ${borderColour}`}
            >
                <InputIcon
                    icon={iconLeft}
                    position="left"
                    isInputValid={isInputValid}
                />
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
                <InputIcon
                    icon={iconRight}
                    position="right"
                    isInputValid={isInputValid}
                />
            </View>

            <View
                className={`flex-row items-center gap-1 h-5 ${errorMessage.length > 0 && !isInputValid ? 'visible' : 'invisible'}`}
            >
                <MaterialCommunityIcons
                    name="alert-circle"
                    size={12}
                    color={colors.red[600]}
                />
                <Text className={`text-sm font-normal text-red-600`}>
                    {errorMessage}
                </Text>
            </View>
        </View>
    )
}

function InputIcon({
    icon,
    position,
    isInputValid,
}: {
    icon?: string
    position: 'left' | 'right'
    isInputValid: boolean
}) {
    const iconDynamicClasses =
        position === 'left' ? 'rounded-l-2xl' : 'rounded-r-2xl'
    const textColour = isInputValid ? 'text-gray-800' : 'text-red-600'

    return (
        icon && (
            <View
                className={`flex flex-row h-full items-center justify-center px-2 ${iconDynamicClasses}`}
            >
                <Text className={`text-md font-normal ${textColour}`}>
                    {icon}
                </Text>
            </View>
        )
    )
}

function isFieldValid(
    value: string,
    required: boolean | undefined,
    setErrorMessage: (text: string) => void
) {
    if (required && value === '') {
        setErrorMessage("This field can't be empty")
        return false
    }
    if (value !== '' && !isInputNumberValid(value)) {
        setErrorMessage('This number is invalid')
        return false
    }

    setErrorMessage('')
    return true
}
