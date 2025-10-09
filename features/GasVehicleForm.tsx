import { useEffect } from 'react'
import { Grid, Row, Col } from '@/components'
import { useFormState } from 'react-hook-form'
import { useLocalStorage } from '@/hooks'
import { getUnitAbbreviation, checkTabValidity } from '@/utils'
import { FormNumberInput } from './FormNumberInput'
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
            label="Vehicle buying cost"
            iconLeft="$"
            placeholder="0.00"
            customOnChange={customOnChange}
        />
    )
    const insurancePerYear = (
        <FormNumberInput
            control={control}
            name="gas.insurancePerYear"
            label="Insurance per year"
            iconLeft="$"
            placeholder="0.00"
            customOnChange={customOnChange}
        />
    )
    const taxesPerYear = (
        <FormNumberInput
            control={control}
            name="gas.taxesPerYear"
            label="Taxes per year"
            iconLeft="$"
            placeholder="0.00"
            hint="How much taxes you pay every year"
            customOnChange={customOnChange}
        />
    )
    const maintenancePerYear = (
        <FormNumberInput
            control={control}
            name="gas.maintenancePerYear"
            label="Maintenance per year"
            iconLeft="$"
            placeholder="0.00"
            hint="Vehicle maintenance costs"
            customOnChange={customOnChange}
        />
    )
    const fuelEfficiencyInput = (
        <FormNumberInput
            control={control}
            name="gas.fuelEfficiency"
            label="Fuel efficiency"
            requiredIfTabFilled={true}
            dirtyTabFields={dirtyFields.gas}
            iconRight={fuelEfficiency}
            placeholder="0"
            hint="How far you can drive the vehicle per unit of fuel"
            customOnChange={customOnChange}
        />
    )
    const gasPrice = (
        <FormNumberInput
            control={control}
            name="gas.gasPrice"
            label="Gas price"
            requiredIfTabFilled={true}
            dirtyTabFields={dirtyFields.gas}
            iconLeft="$"
            iconRight={gasMeasurement}
            placeholder="0.00"
            hint="How far you can drive the vehicle per unit of fuel"
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
