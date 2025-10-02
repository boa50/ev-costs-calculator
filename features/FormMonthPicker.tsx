import { Picker } from '@/components'
import { Controller } from 'react-hook-form'
import type { FormFields } from '@/types'

interface Props {
    control: any
    name: FormFields
    label: string
    hint?: string
}

export function FormMonthPicker({ control, name, label, hint }: Props) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <Picker
                    label={label}
                    type="month"
                    value={value}
                    setValue={onChange}
                    hint={hint}
                />
            )}
        />
    )
}
