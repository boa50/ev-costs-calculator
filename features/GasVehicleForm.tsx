import { useEffect } from 'react'
import { Grid, Row, Col } from '@/components'
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

    const vehicleBuyingCost = (
        <FormNumberInput
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
            control={control}
            name="gas.insurancePerYear"
            label={t('form.shared.insurancePerYear.label')}
            iconLeft="$"
            placeholder="0.00"
            customOnChange={customOnChange}
        />
    )
    const taxesPerYear = (
        <FormNumberInput
            control={control}
            name="gas.taxesPerYear"
            label={t('form.shared.taxesPerYear.label')}
            iconLeft="$"
            placeholder="0.00"
            hint={t('form.shared.taxesPerYear.hint')}
            customOnChange={customOnChange}
        />
    )
    const maintenancePerYear = (
        <FormNumberInput
            control={control}
            name="gas.maintenancePerYear"
            label={t('form.shared.maintenancePerYear.label')}
            iconLeft="$"
            placeholder="0.00"
            hint={t('form.shared.maintenancePerYear.hint')}
            customOnChange={customOnChange}
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
        />
    )
    const gasPrice = (
        <FormNumberInput
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
        />
    )

    return (
        <Grid>
            <Row>
                <Col>{fuelEfficiencyInput}</Col>
                <Col>{gasPrice}</Col>
            </Row>
            <Row>
                <Col>{insurancePerYear}</Col>
                <Col>{taxesPerYear}</Col>
            </Row>
            <Row>
                <Col>{maintenancePerYear}</Col>
                <Col>{vehicleBuyingCost}</Col>
            </Row>
        </Grid>
    )
}
