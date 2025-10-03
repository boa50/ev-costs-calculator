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
    requiredIfTabFilled?: boolean
    dirtyTabFields?: any
    customOnChange?: () => void
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
}: Props) {
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
                />
            )}
        />
    )
}
