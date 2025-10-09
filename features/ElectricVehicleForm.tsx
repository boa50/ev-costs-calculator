import { useEffect } from 'react'
import { Grid, Row, Col } from '@/components'
import { useFormState } from 'react-hook-form'
import { useLocalStorage } from '@/hooks'
import { getUnitAbbreviation, checkTabValidity } from '@/utils'
import { FormNumberInput } from './FormNumberInput'
import type { TabValidStates } from '@/types'

interface Props {
    control: any
    setTabIsValid: (isValid: TabValidStates) => void
}

export default function ElectricVehicleForm({ control, setTabIsValid }: Props) {
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
            label="Vehicle buying cost"
            iconLeft="$"
            placeholder="0.00"
        />
    )
    const insurancePerYear = (
        <FormNumberInput
            control={control}
            name="ev.insurancePerYear"
            label="Insurance per year"
            iconLeft="$"
            placeholder="0.00"
        />
    )
    const taxesPerYear = (
        <FormNumberInput
            control={control}
            name="ev.taxesPerYear"
            label="Taxes per year"
            iconLeft="$"
            placeholder="0.00"
            hint="How much taxes you pay every year"
        />
    )
    const maintenancePerYear = (
        <FormNumberInput
            control={control}
            name="ev.maintenancePerYear"
            label="Maintenance per year"
            iconLeft="$"
            placeholder="0.00"
            hint="Vehicle maintenance costs"
        />
    )
    const batteryAutonomy = (
        <FormNumberInput
            control={control}
            name="ev.batteryAutonomy"
            label="Batery autonomy"
            required={true}
            iconRight={distance}
            placeholder="0"
            hint="Distance you can drive the vehicle without recharging it"
        />
    )
    const batteryCapacity = (
        <FormNumberInput
            control={control}
            name="ev.batteryCapacity"
            label="Batery capacity"
            required={true}
            iconRight="kWh"
            placeholder="0"
        />
    )
    const electricityPrice = (
        <FormNumberInput
            control={control}
            name="ev.electricityPrice"
            label="Electricity price"
            required={true}
            iconLeft="$"
            iconRight="kWh"
            placeholder="0.00"
        />
    )

    return (
        <Grid>
            <Row>
                <Col>{batteryAutonomy}</Col>
                <Col>{batteryCapacity}</Col>
            </Row>
            <Row>
                <Col>{electricityPrice}</Col>
                <Col>{insurancePerYear}</Col>
            </Row>
            <Row>
                <Col>{taxesPerYear}</Col>
                <Col>{maintenancePerYear}</Col>
            </Row>
            <Row>
                <Col>{vehicleBuyingCost}</Col>
                <Col></Col>
            </Row>
        </Grid>
    )
}
