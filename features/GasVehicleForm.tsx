import { Input, Grid, Row, Col } from '@/components'
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
    const changeState = (key: keyof GasVehicleFormState, value: string) => {
        setGasVehicleState((prevState) => ({ ...prevState, [key]: value }))
    }

    return (
        <Grid>
            <Row>
                <Col>
                    <Input
                        label="Vehicle buying cost"
                        value={gasVehicleState.cost}
                        setValue={(value) => changeState('cost', value)}
                        iconLeft="$"
                        placeholder="0.00"
                    />
                </Col>
                <Col>
                    <Input
                        label="Insurance per year"
                        value={gasVehicleState.insurancePerYear}
                        setValue={(value) =>
                            changeState('insurancePerYear', value)
                        }
                        iconLeft="$"
                        placeholder="0.00"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input
                        label="Taxes per year"
                        value={gasVehicleState.taxesPerYear}
                        setValue={(value) => changeState('taxesPerYear', value)}
                        iconLeft="$"
                        placeholder="0.00"
                        hint="How much taxes you pay every year"
                    />
                </Col>
                <Col>
                    <Input
                        label="Maintenance per year"
                        value={gasVehicleState.maintenancePerYear}
                        setValue={(value) =>
                            changeState('maintenancePerYear', value)
                        }
                        iconLeft="$"
                        placeholder="0.00"
                        hint="Vehicle maintenance costs"
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Input
                        label="Autonomy"
                        value={gasVehicleState.autonomy}
                        setValue={(value) => changeState('autonomy', value)}
                        iconRight="km/l"
                        placeholder="0"
                        hint="Distance you can drive the vehicle per gas unit"
                    />
                </Col>
                <Col>
                    <Input
                        label="Gas price"
                        value={gasVehicleState.gasPrice}
                        setValue={(value) => changeState('gasPrice', value)}
                        iconLeft="$"
                        iconRight="l"
                        placeholder="0.00"
                        hint="Gas costs on your region"
                    />
                </Col>
            </Row>
        </Grid>
    )
}

export function getGasVehicleInitialState(): GasVehicleFormState {
    return {
        cost: '',
        autonomy: '',
        gasPrice: '',
        insurancePerYear: '',
        maintenancePerYear: '',
        taxesPerYear: '',
    }
}
