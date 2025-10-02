import { Grid, Row, Col } from '@/components'
import { useLocalStorage } from '@/hooks'
import { getUnitAbbreviation } from '@/utils'
import { FormNumberInput } from './FormNumberInput'

interface Props {
    control: any
}

export default function GasVehicleForm({ control }: Props) {
    const gasMeasurement = getUnitAbbreviation(
        useLocalStorage('gasMeasurement')[0] ?? ''
    )
    const fuelEfficiency = useLocalStorage('fuelEfficiency')[0]

    const vehicleBuyingCost = (
        <FormNumberInput
            control={control}
            name="gas.buyingCost"
            label="Vehicle buying cost"
            iconLeft="$"
            placeholder="0.00"
        />
    )
    const insurancePerYear = (
        <FormNumberInput
            control={control}
            name="gas.insurancePerYear"
            label="Insurance per year"
            iconLeft="$"
            placeholder="0.00"
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
        />
    )
    const fuelEfficiencyInput = (
        <FormNumberInput
            control={control}
            name="gas.fuelEfficiency"
            label="Fuel efficiency"
            required={true}
            iconRight={fuelEfficiency}
            placeholder="0"
            hint="How far you can drive the vehicle per unit of fuel"
        />
    )
    const gasPrice = (
        <FormNumberInput
            control={control}
            name="gas.gasPrice"
            label="Gas price"
            required={true}
            iconLeft="$"
            iconRight={gasMeasurement}
            placeholder="0.00"
            hint="How far you can drive the vehicle per unit of fuel"
        />
    )

    return (
        <Grid>
            <Row>
                <Col>{fuelEfficiencyInput}</Col>
                <Col>{gasPrice}</Col>
            </Row>
            <Row>
                <Col>{vehicleBuyingCost}</Col>
                <Col>{insurancePerYear}</Col>
            </Row>
            <Row>
                <Col>{taxesPerYear}</Col>
                <Col>{maintenancePerYear}</Col>
            </Row>
        </Grid>
    )
}
