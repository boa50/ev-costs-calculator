import { Input, Grid, Row, Col } from '@/components'
import { useLocalStorage } from '@/hooks'
import { getUnitAbbreviation } from '@/utils'
import type { ElectricVehicleFormState } from '@/types'

interface Props {
    electricVehicleState: ElectricVehicleFormState
    setElectricVehicleState: React.Dispatch<
        React.SetStateAction<ElectricVehicleFormState>
    >
}

export default function ElectricVehicleForm({
    electricVehicleState,
    setElectricVehicleState,
}: Props) {
    const distance = getUnitAbbreviation(useLocalStorage('distance')[0] ?? '')
    const changeState = (
        key: keyof ElectricVehicleFormState,
        value: string
    ) => {
        setElectricVehicleState((prevState) => ({ ...prevState, [key]: value }))
    }

    const vehicleBuyingCost = (
        <Input
            label="Vehicle buying cost"
            value={electricVehicleState.cost}
            setValue={(value) => changeState('cost', value)}
            iconLeft="$"
            placeholder="0.00"
        />
    )
    const insurancePerYear = (
        <Input
            label="Insurance per year"
            value={electricVehicleState.insurancePerYear}
            setValue={(value) => changeState('insurancePerYear', value)}
            iconLeft="$"
            placeholder="0.00"
        />
    )
    const taxesPerYear = (
        <Input
            label="Taxes per year"
            value={electricVehicleState.taxesPerYear}
            setValue={(value) => changeState('taxesPerYear', value)}
            iconLeft="$"
            placeholder="0.00"
            hint="How much taxes you pay every year"
        />
    )
    const maintenancePerYear = (
        <Input
            label="Maintenance per year"
            value={electricVehicleState.maintenancePerYear}
            setValue={(value) => changeState('maintenancePerYear', value)}
            iconLeft="$"
            placeholder="0.00"
            hint="Vehicle maintenance costs"
        />
    )
    const batteryAutonomy = (
        <Input
            label="Batery autonomy"
            value={electricVehicleState.batteryAutonomy}
            setValue={(value) => changeState('batteryAutonomy', value)}
            required={true}
            iconRight={distance}
            placeholder="0"
            hint="Distance you can drive the vehicle without recharging it"
        />
    )
    const batteryCapacity = (
        <Input
            label="Batery capacity"
            value={electricVehicleState.batteryCapacity}
            setValue={(value) => changeState('batteryCapacity', value)}
            required={true}
            iconRight="kWh"
            placeholder="0"
        />
    )
    const electricityPrice = (
        <Input
            label="Electricity price"
            value={electricVehicleState.electricityPrice}
            setValue={(value) => changeState('electricityPrice', value)}
            required={true}
            iconLeft="$"
            iconRight="kWh"
            placeholder="0.00"
            hint="Electricity costs on your region"
        />
    )

    return (
        <Grid additionalClasses="gap-3">
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

export function getElectricVehicleInitialState(): ElectricVehicleFormState {
    return {
        cost: '',
        batteryAutonomy: '',
        batteryCapacity: '',
        electricityPrice: '',
        insurancePerYear: '',
        maintenancePerYear: '',
        taxesPerYear: '',
    }
}
