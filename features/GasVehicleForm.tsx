import { useEffect, useRef } from 'react'
import { View, type TextInput } from 'react-native'
import { useFormState } from 'react-hook-form'
import { useLocalStorage } from '@/hooks'
import { getUnitAbbreviation, checkTabValidity } from '@/utils'
import { FormNumberInput } from './FormNumberInput'
import { useTranslation } from 'react-i18next'
import type { TabValidStates, FormFields } from '@/types'

interface Props {
    control: any
    setTabIsValid: (isValid: TabValidStates) => void
    triggerRevalidation: (fields: FormFields[]) => void
}

export default function GasVehicleForm({
    control,
    setTabIsValid,
    triggerRevalidation,
}: Props) {
    const { t } = useTranslation()
    const gasMeasurement = getUnitAbbreviation(
        useLocalStorage('gasMeasurement')[0] ?? ''
    )
    const fuelEfficiency = useLocalStorage('fuelEfficiency')[0]
    const { errors, dirtyFields } = useFormState({
        control,
        name: 'gas',
    })

    const isAllRequiredFieldsFilled =
        dirtyFields.gas === undefined ||
        (dirtyFields.gas?.fuelEfficiency && dirtyFields.gas?.gasPrice)

    const customOnChange = () => {
        if (dirtyFields.gas === undefined)
            triggerRevalidation(['gas.fuelEfficiency', 'gas.gasPrice'])
    }

    const hasTabErrors =
        Object.keys(errors).filter((tab) => tab === 'gas').length > 0

    useEffect(() => {
        checkTabValidity({
            hasTabErrors,
            isAllRequiredFieldsFilled,
            setTabIsValid,
        })
    }, [hasTabErrors, isAllRequiredFieldsFilled, setTabIsValid])

    const refGasPrice = useRef<TextInput>(null)
    const refInsurancePerYear = useRef<TextInput>(null)
    const refTaxesPerYear = useRef<TextInput>(null)
    const refMaintenancePerYear = useRef<TextInput>(null)
    const refVehicleBuyingCost = useRef<TextInput>(null)

    const vehicleBuyingCost = (
        <FormNumberInput
            ref={refVehicleBuyingCost}
            control={control}
            name="gas.buyingCost"
            label={t('form.shared.buyingCost.label')}
            iconLeft="$"
            placeholder="0.00"
            customOnChange={customOnChange}
        />
    )
    const insurancePerYear = (
        <FormNumberInput
            ref={refInsurancePerYear}
            control={control}
            name="gas.insurancePerYear"
            label={t('form.shared.insurancePerYear.label')}
            iconLeft="$"
            placeholder="0.00"
            customOnChange={customOnChange}
            onSubmitEditing={() => refTaxesPerYear.current?.focus()}
        />
    )
    const taxesPerYear = (
        <FormNumberInput
            ref={refTaxesPerYear}
            control={control}
            name="gas.taxesPerYear"
            label={t('form.shared.taxesPerYear.label')}
            iconLeft="$"
            placeholder="0.00"
            hint={t('form.shared.taxesPerYear.hint')}
            customOnChange={customOnChange}
            onSubmitEditing={() => refMaintenancePerYear.current?.focus()}
        />
    )
    const maintenancePerYear = (
        <FormNumberInput
            ref={refMaintenancePerYear}
            control={control}
            name="gas.maintenancePerYear"
            label={t('form.shared.maintenancePerYear.label')}
            iconLeft="$"
            placeholder="0.00"
            hint={t('form.shared.maintenancePerYear.hint')}
            customOnChange={customOnChange}
            onSubmitEditing={() => refVehicleBuyingCost.current?.focus()}
        />
    )
    const fuelEfficiencyInput = (
        <FormNumberInput
            control={control}
            name="gas.fuelEfficiency"
            label={t('form.gas.fuelEfficiency.label')}
            requiredIfTabFilled={true}
            dirtyTabFields={dirtyFields.gas}
            iconRight={fuelEfficiency}
            placeholder="0"
            hint={t('form.gas.fuelEfficiency.hint')}
            customOnChange={customOnChange}
            onSubmitEditing={() => refGasPrice.current?.focus()}
        />
    )
    const gasPrice = (
        <FormNumberInput
            ref={refGasPrice}
            control={control}
            name="gas.gasPrice"
            label={t('form.gas.gasPrice.label')}
            requiredIfTabFilled={true}
            dirtyTabFields={dirtyFields.gas}
            iconLeft="$"
            iconRight={gasMeasurement}
            placeholder="0.00"
            hint={t('form.gas.gasPrice.hint')}
            customOnChange={customOnChange}
            onSubmitEditing={() => refInsurancePerYear.current?.focus()}
        />
    )

    return (
        <View>
            {fuelEfficiencyInput}
            {gasPrice}
            {insurancePerYear}
            {taxesPerYear}
            {maintenancePerYear}
            {vehicleBuyingCost}
        </View>
    )
}
