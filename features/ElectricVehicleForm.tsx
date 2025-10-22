import { useEffect } from 'react'
import { View } from 'react-native'
import { useFormState } from 'react-hook-form'
import { useLocalStorage } from '@/hooks'
import { getUnitAbbreviation, checkTabValidity } from '@/utils'
import { FormNumberInputs } from './FormNumberInputs'
import { useTranslation } from 'react-i18next'
import type { TabValidStates } from '@/types'
import type { FormNumberInputType } from './FormNumberInput'

interface Props {
    control: any
    setTabIsValid: (isValid: TabValidStates) => void
}

export default function ElectricVehicleForm({ control, setTabIsValid }: Props) {
    const { t } = useTranslation()
    const distance = getUnitAbbreviation(useLocalStorage('distance')[0] ?? '')
    const { errors, dirtyFields } = useFormState({
        control,
        name: 'ev',
    })

    const isAllRequiredFieldsFilled =
        dirtyFields.ev?.batteryAutonomy &&
        dirtyFields.ev?.batteryCapacity &&
        dirtyFields.ev?.electricityPrice

    const hasTabErrors =
        Object.keys(errors).filter((tab) => tab === 'ev').length > 0

    useEffect(() => {
        checkTabValidity({
            hasTabErrors,
            isAllRequiredFieldsFilled,
            setTabIsValid,
        })
    }, [hasTabErrors, isAllRequiredFieldsFilled, setTabIsValid])

    const fields: FormNumberInputType[] = [
        {
            name: 'ev.batteryAutonomy',
            label: t('form.ev.batteryAutonomy.label'),
            required: true,
            iconRight: distance,
            placeholder: '0',
            hint: t('form.ev.batteryAutonomy.hint'),
        },
        {
            name: 'ev.batteryCapacity',
            label: t('form.ev.batteryCapacity.label'),
            required: true,
            iconRight: 'kWh',
            placeholder: '0',
        },
        {
            name: 'ev.electricityPrice',
            label: t('form.ev.electricityPrice.label'),
            required: true,
            iconLeft: '$',
            iconRight: 'kWh',
            placeholder: '0.00',
        },
        {
            name: 'ev.insurancePerYear',
            label: t('form.shared.insurancePerYear.label'),
            iconLeft: '$',
            placeholder: '0.00',
        },
        {
            name: 'ev.taxesPerYear',
            label: t('form.shared.taxesPerYear.label'),
            iconLeft: '$',
            placeholder: '0.00',
            hint: t('form.shared.taxesPerYear.hint'),
        },
        {
            name: 'ev.maintenancePerYear',
            label: t('form.shared.maintenancePerYear.label'),
            iconLeft: '$',
            placeholder: '0.00',
            hint: t('form.shared.maintenancePerYear.hint'),
        },
        {
            name: 'ev.buyingCost',
            label: t('form.shared.buyingCost.label'),
            iconLeft: '$',
            placeholder: '0.00',
        },
    ]

    return (
        <View className="flex-col">
            <FormNumberInputs control={control} fields={fields} />
        </View>
    )
}
