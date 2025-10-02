import { Input } from '@/components'
import { Controller } from 'react-hook-form'
import type { FormFields } from '@/types'

interface Props {
    control: any
    name: FormFields
    label: string
    iconLeft?: string
    iconRight?: string
    placeholder?: string
    hint?: string
    required?: boolean
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
}: Props) {
    return (
        <Controller
            control={control}
            name={name}
            rules={{
                required: required,
                pattern: /^\d{1,10}$|(?=^.{1,10}$)^\d+[\.\,]\d{0,2}$/g,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Input
                    label={label}
                    value={value}
                    setValue={onChange}
                    required={required}
                    iconLeft={iconLeft}
                    iconRight={iconRight}
                    placeholder={placeholder}
                    hint={hint}
                    errorType={error?.type}
                />
            )}
        />
    )
}
