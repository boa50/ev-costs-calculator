import { useState, useEffect, type RefObject } from 'react'
import { View, TextInput, Text } from 'react-native'
import { useLocales } from 'expo-localization'
import { InputLabel } from './InputLabel'
import { useTranslation } from 'react-i18next'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import colors from '@/colors'

interface Props {
    label?: string
    value: string
    setValue: (value: string) => void
    iconLeft?: string
    iconRight?: string
    placeholder?: string
    hint?: string
    required?: boolean
    errorType?: string
    ref?:
        | RefObject<TextInput | null>
        | ((el: TextInput | null) => TextInput | null)
    onSubmitEditing?: () => void
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
    errorType,
    ref,
    onSubmitEditing,
}: Props) {
    const { t } = useTranslation()
    const [borderColour, setBorderColour] = useState<string>('border-gray-400')
    const [isInputValid, setIsInputValid] = useState<boolean>(true)
    const [isOnFocus, setIsOnFocus] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        if (errorType) {
            setIsInputValid(false)
            setBorderColour('border-error-standard')
            handleErrorMessage(errorType, setErrorMessage, {
                required: t('components.input.requiredMessage'),
                invalid: t('components.input.invalidMessage'),
            })
        } else {
            setIsInputValid(true)
            setErrorMessage('')
            if (isOnFocus) setBorderColour('border-accent-standard')
            else setBorderColour('border-gray-400')
        }
    }, [errorType, isOnFocus, t])

    const inputDynamicClasses =
        !iconLeft && !iconRight
            ? 'rounded-2xl pl-3'
            : iconLeft && iconRight
              ? ''
              : iconLeft
                ? 'rounded-r-2xl'
                : 'rounded-l-2xl pl-3'

    const onFocus = () => {
        setIsOnFocus(true)
    }
    const onBlur = () => {
        setIsOnFocus(false)
    }

    const handleChangeText = (text: string) => {
        const cleanedValue = text.replace(/[^0-9\,\.]/g, '')
        setValue(cleanedValue)
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
                className={`flex flex-row bg-background-input rounded-2xl border w-full ${borderColour}`}
            >
                <InputIcon
                    icon={iconLeft}
                    position="left"
                    isInputValid={isInputValid}
                />
                <TextInput
                    ref={
                        typeof ref === 'function'
                            ? (el) => {
                                  ref(el)
                              }
                            : ref
                    }
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className={`flex-1 py-3 ${inputDynamicClasses}`}
                    onChangeText={handleChangeText}
                    value={value}
                    keyboardType={'number-pad'}
                    placeholder={placeholder}
                    placeholderTextColor={colors.gray[400]}
                    maxLength={15}
                    onSubmitEditing={onSubmitEditing}
                    submitBehavior={
                        onSubmitEditing !== undefined
                            ? 'submit'
                            : 'blurAndSubmit'
                    }
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
                    color={colors.error.standard}
                />
                <Text className={`text-sm font-normal text-error-standard`}>
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
    const textColour = isInputValid ? 'text-text-dark' : 'text-error-standard'
    const userLocale = useLocales()
    const iconFormatted = icon === '$' ? userLocale[0].currencySymbol : icon

    return (
        icon && (
            <View
                className={`flex flex-row h-full items-center justify-center px-2 ${iconDynamicClasses}`}
            >
                <Text className={`text-md font-normal ${textColour}`}>
                    {iconFormatted}
                </Text>
            </View>
        )
    )
}

function handleErrorMessage(
    errorType: string,
    setErrorMessage: (text: string) => void,
    messages: { required: string; invalid: string }
) {
    switch (errorType) {
        case 'required':
            setErrorMessage(messages.required)
            break
        case 'validate':
            setErrorMessage(messages.required)
            break
        case 'pattern':
            setErrorMessage(messages.invalid)
            break

        default:
            setErrorMessage('')
            break
    }
}
