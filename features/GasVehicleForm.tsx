import { Input, Grid, Row, Col } from '@/components'
import { useLocalStorage } from '@/hooks'
import { getUnitAbbreviation } from '@/utils'
import type { GasVehicleFormState } from '@/types'

interface Props {
    gasVehicleState: GasVehicleFormState
    setGasVehicleState: React.Dispatch<
        React.SetStateAction<GasVehicleFormState>
    >
}

export default function GasVehicleForm({
    gasVehicleState,
    setGasVehicleState,
}: Props) {
    const gasMeasurement = getUnitAbbreviation(
        useLocalStorage('gasMeasurement')[0] ?? ''
    )
    const fuelEfficiency = useLocalStorage('fuelEfficiency')[0]
    const changeState = (key: keyof GasVehicleFormState, value: string) => {
        setGasVehicleState((prevState) => ({ ...prevState, [key]: value }))
    }

    const vehicleBuyingCost = (
        <Input
            label="Vehicle buying cost"
            value={gasVehicleState.cost}
            setValue={(value) => changeState('cost', value)}
            iconLeft="$"
            placeholder="0.00"
        />
    )
    const insurancePerYear = (
        <Input
            label="Insurance per year"
            value={gasVehicleState.insurancePerYear}
            setValue={(value) => changeState('insurancePerYear', value)}
            iconLeft="$"
            placeholder="0.00"
        />
    )
    const taxesPerYear = (
        <Input
            label="Taxes per year"
            value={gasVehicleState.taxesPerYear}
            setValue={(value) => changeState('taxesPerYear', value)}
            iconLeft="$"
            placeholder="0.00"
            hint="How much taxes you pay every year"
        />
    )
    const maintenancePerYear = (
        <Input
            label="Maintenance per year"
            value={gasVehicleState.maintenancePerYear}
            setValue={(value) => changeState('maintenancePerYear', value)}
            iconLeft="$"
            placeholder="0.00"
            hint="Vehicle maintenance costs"
        />
    )
    const fuelEfficiencyInput = (
        <Input
            label="Fuel efficiency"
            value={gasVehicleState.fuelEfficiency}
            setValue={(value) => changeState('fuelEfficiency', value)}
            required={true}
            iconRight={fuelEfficiency}
            placeholder="0"
            hint="how far you can drive the vehicle per unit of fuel"
        />
    )
    const gasPrice = (
        <Input
            label="Gas price"
            value={gasVehicleState.gasPrice}
            setValue={(value) => changeState('gasPrice', value)}
            required={true}
            iconLeft="$"
            iconRight={gasMeasurement}
            placeholder="0.00"
            hint="Gas costs on your region"
        />
    )

    return (
        <Grid additionalClasses="gap-3">
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

export function getGasVehicleInitialState(): GasVehicleFormState {
    return {
        cost: '',
        fuelEfficiency: '',
        gasPrice: '',
        insurancePerYear: '',
        maintenancePerYear: '',
        taxesPerYear: '',
    }
}
