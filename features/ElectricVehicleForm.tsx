import { useEffect } from 'react'
import { View } from 'react-native'
import { useFormState } from 'react-hook-form'
import { useLocalStorage } from '@/hooks'
import { getUnitAbbreviation, checkTabValidity } from '@/utils'
import { FormNumberInput } from './FormNumberInput'
import { useTranslation } from 'react-i18next'
import type { TabValidStates } from '@/types'

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

    const vehicleBuyingCost = (
        <FormNumberInput
            control={control}
            name="ev.buyingCost"
            label={t('form.shared.buyingCost.label')}
            iconLeft="$"
            placeholder="0.00"
        />
    )
    const insurancePerYear = (
        <FormNumberInput
            control={control}
            name="ev.insurancePerYear"
            label={t('form.shared.insurancePerYear.label')}
            iconLeft="$"
            placeholder="0.00"
        />
    )
    const taxesPerYear = (
        <FormNumberInput
            control={control}
            name="ev.taxesPerYear"
            label={t('form.shared.taxesPerYear.label')}
            iconLeft="$"
            placeholder="0.00"
            hint={t('form.shared.taxesPerYear.hint')}
        />
    )
    const maintenancePerYear = (
        <FormNumberInput
            control={control}
            name="ev.maintenancePerYear"
            label={t('form.shared.maintenancePerYear.label')}
            iconLeft="$"
            placeholder="0.00"
            hint={t('form.shared.maintenancePerYear.hint')}
        />
    )
    const batteryAutonomy = (
        <FormNumberInput
            control={control}
            name="ev.batteryAutonomy"
            label={t('form.ev.batteryAutonomy.label')}
            required={true}
            iconRight={distance}
            placeholder="0"
            hint={t('form.ev.batteryAutonomy.hint')}
        />
    )
    const batteryCapacity = (
        <FormNumberInput
            control={control}
            name="ev.batteryCapacity"
            label={t('form.ev.batteryCapacity.label')}
            required={true}
            iconRight="kWh"
            placeholder="0"
        />
    )
    const electricityPrice = (
        <FormNumberInput
            control={control}
            name="ev.electricityPrice"
            label={t('form.ev.electricityPrice.label')}
            required={true}
            iconLeft="$"
            iconRight="kWh"
            placeholder="0.00"
        />
    )

    return (
        <View className="flex-col">
            {batteryAutonomy}
            {batteryCapacity}
            {electricityPrice}
            {insurancePerYear}
            {taxesPerYear}
            {maintenancePerYear}
            {vehicleBuyingCost}
        </View>
    )
}
