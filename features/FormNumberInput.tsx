import { Input } from '@/components'
import { Controller } from 'react-hook-form'
import { useLayoutContext } from '@/contexts'
import type { RefObject } from 'react'
import type { TextInput } from 'react-native'
import type { FormFields } from '@/types'

export type FormNumberInputType = {
    control?: any
    name: FormFields
    label: string
    iconLeft?: string
    iconRight?: string
    placeholder?: string
    hint?: string
    required?: boolean
    requiredIfTabFilled?: boolean
    dirtyTabFields?: any
    customOnChange?: () => void
    ref?:
        | RefObject<TextInput | null>
        | ((el: TextInput | null) => TextInput | null)
    onSubmitEditing?: () => void
}

export function FormNumberInput({
    control,
    name,
    label,
    iconLeft,
    iconRight,
    placeholder,
    hint,
    required = false,
    requiredIfTabFilled = false,
    dirtyTabFields,
    customOnChange = () => {},
    ref,
    onSubmitEditing,
}: FormNumberInputType) {
    const { layoutState } = useLayoutContext()

    return (
        <Controller
            control={control}
            name={name}
            rules={{
                validate: (value) => {
                    return (
                        !requiredIfTabFilled ||
                        dirtyTabFields === undefined ||
                        Object.keys(dirtyTabFields ?? {}).length === 0 ||
                        value !== ''
                    )
                },
                required: required,
                pattern: /^\d{1,10}$|(?=^.{1,10}$)^\d+[\.\,]\d{0,2}$/g,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Input
                    ref={ref}
                    label={label}
                    value={value}
                    setValue={(value) => {
                        onChange(value)
                        customOnChange()
                    }}
                    required={required || requiredIfTabFilled}
                    iconLeft={iconLeft}
                    iconRight={iconRight}
                    placeholder={placeholder}
                    hint={hint}
                    errorType={error?.type}
                    onSubmitEditing={onSubmitEditing}
                    layoutPaddingX={layoutState.formContainerPositionX}
                    layoutPaddingY={layoutState.formContainerPositionY}
                />
            )}
        />
    )
}
