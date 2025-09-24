import { Input, Grid, Row, Col } from '@/components'
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
    const changeState = (
        key: keyof ElectricVehicleFormState,
        value: string
    ) => {
        setElectricVehicleState((prevState) => ({ ...prevState, [key]: value }))
    }

    return (
        <Grid>
            <Row>
                <Col>
                    <Input
                        label="Buying cost"
                        value={electricVehicleState.cost}
                        setValue={(value) => changeState('cost', value)}
                        iconLeft="$"
                        placeholder="0.00"
                    />
                </Col>
                <Col>
                    <Input
                        label="Insurance per year"
                        value={electricVehicleState.insurancePerYear}
                        setValue={(value) =>
                            changeState('insurancePerYear', value)
                        }
                        iconLeft="$"
                        placeholder="0.00"
                        hint="text"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input
                        label="Taxes per year"
                        value={electricVehicleState.taxesPerYear}
                        setValue={(value) => changeState('taxesPerYear', value)}
                        iconLeft="$"
                        placeholder="0.00"
                        hint="text"
                    />
                </Col>
                <Col>
                    <Input
                        label="Maintenance per year"
                        value={electricVehicleState.maintenancePerYear}
                        setValue={(value) =>
                            changeState('maintenancePerYear', value)
                        }
                        iconLeft="$"
                        placeholder="0.00"
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Input
                        label="Batery autonomy"
                        value={electricVehicleState.batteryAutonomy}
                        setValue={(value) =>
                            changeState('batteryAutonomy', value)
                        }
                        iconRight="km"
                        placeholder="0"
                    />
                </Col>
                <Col>
                    <Input
                        label="Batery capacity"
                        value={electricVehicleState.batteryCapacity}
                        setValue={(value) =>
                            changeState('batteryCapacity', value)
                        }
                        iconRight="kWh"
                        placeholder="0"
                    />
                </Col>
            </Row>

            <Input
                label="Electricity price"
                value={electricVehicleState.electricityPrice}
                setValue={(value) => changeState('electricityPrice', value)}
                iconLeft="$"
                iconRight="kWh"
                placeholder="0.00"
            />
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
