import { useRef } from 'react'
import { TextInput } from 'react-native'
import { FormNumberInput, type FormNumberInputType } from './FormNumberInput'

interface Props {
    fields: FormNumberInputType[]
    control: any
}

export function FormNumberInputs({ fields, control }: Props) {
    const refs = useRef<(TextInput | null)[]>([])

    return fields.map((field, i) => {
        const ref = (el: TextInput | null) => (refs.current[i] = el)
        const onSubmitEditing = () => refs.current[i + 1]?.focus()
        let inputFields

        if (i === 0) {
            inputFields = {
                ...field,
                onSubmitEditing,
            }
        } else if (i === fields.length - 1) {
            inputFields = {
                ...field,
                ref,
            }
        } else {
            inputFields = {
                ...field,
                ref,
                onSubmitEditing,
            }
        }

        return (
            <FormNumberInput
                key={field.name}
                control={control}
                {...inputFields}
            />
        )
    })
}
