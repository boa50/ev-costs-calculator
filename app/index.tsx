import { useState } from 'react'
import { View, Text } from 'react-native'
import ElectricVehicleForm, {
    getElectricVehicleInitialState,
} from '@/features/ElectricVehicleForm'
import GasVehicleForm, {
    getGasVehicleInitialState,
} from '@/features/GasVehicleForm'
import CommonsForm, { getCommonsInitialState } from '@/features/CommonsForm'
import {
    Button,
    FilterButtons,
    type FilterButtonsObject,
    Grid,
    Row,
    Col,
    Container,
} from '@/components'
import {
    calculateCosts,
    convertTextToNumber,
    formatMonetaryNumber,
    getElectricVehicleFromForm,
    getGasVehicleFromForm,
} from '@/utils'
import type {
    ElectricVehicleFormState,
    GasVehicleFormState,
    CommonsFormState,
} from '@/types'

export default function Index() {
    const [electricVehicleState, setElectricVehicleState] =
        useState<ElectricVehicleFormState>(getElectricVehicleInitialState())
    const [gasVehicleState, setGasVehicleState] = useState<GasVehicleFormState>(
        getGasVehicleInitialState()
    )
    const [commonFormState, setCommonFormState] = useState<CommonsFormState>(
        getCommonsInitialState()
    )
    const [filterButtonsState, setFilterButtonsState] =
        useState<FilterButtonsObject>({
            electric: { label: 'Electric', isActive: true },
            gas: { label: 'Gas', isActive: false },
            commons: { label: 'Commons', isActive: false },
        })
    const [costs, setCosts] = useState<{
        annual: number
        monthly: number
        perYear: number
    }>()

    const handleCalculate = () => {
        if (electricVehicleState) {
            const car = getElectricVehicleFromForm(electricVehicleState)

            const { annualCosts, monthlyCosts } = calculateCosts(
                car,
                convertTextToNumber(commonFormState.distanceDrivenPerWeek)
            )
            setCosts({
                annual: annualCosts,
                monthly: monthlyCosts,
                perYear: annualCosts + monthlyCosts * 12,
            })
        }

        if (gasVehicleState) {
            const car = getGasVehicleFromForm(gasVehicleState)

            const { annualCosts, monthlyCosts } = calculateCosts(
                car,
                convertTextToNumber(commonFormState.distanceDrivenPerWeek)
            )
            setCosts({
                annual: annualCosts,
                monthly: monthlyCosts,
                perYear: annualCosts + monthlyCosts * 12,
            })
        }
    }

    const handleResetFields = () => {
        setElectricVehicleState(getElectricVehicleInitialState())
        setGasVehicleState(getGasVehicleInitialState())
        setCommonFormState(getCommonsInitialState())
    }

    return (
        <Container>
            <View className="pb-4">
                <FilterButtons
                    state={filterButtonsState}
                    setState={setFilterButtonsState}
                />
            </View>

            <FormView isActive={filterButtonsState.electric.isActive}>
                <ElectricVehicleForm
                    electricVehicleState={electricVehicleState}
                    setElectricVehicleState={setElectricVehicleState}
                />
            </FormView>

            <FormView isActive={filterButtonsState.gas.isActive}>
                <GasVehicleForm
                    gasVehicleState={gasVehicleState}
                    setGasVehicleState={setGasVehicleState}
                />
            </FormView>

            <FormView isActive={filterButtonsState.commons.isActive}>
                <CommonsForm
                    state={commonFormState}
                    setState={setCommonFormState}
                />
            </FormView>

            {costs ? (
                <View className="pt-4 flex-1">
                    <Text>
                        Annual cost: $ {formatMonetaryNumber(costs.annual)}
                    </Text>
                    <Text>
                        Montlhy cost: $ {formatMonetaryNumber(costs.monthly)}
                    </Text>
                    <Text>
                        Total cost per year: ${' '}
                        {formatMonetaryNumber(costs.perYear)}
                    </Text>
                </View>
            ) : (
                <View className="flex-1"></View>
            )}

            <Grid additionalClasses="pb-4">
                <Row>
                    <Col>
                        <Button label="Calculate" onPress={handleCalculate} />
                    </Col>
                    <Col>
                        <Button
                            label="Reset fields"
                            theme="secondary"
                            onPress={handleResetFields}
                        />
                    </Col>
                </Row>
            </Grid>
        </Container>
    )
}

function FormView({
    isActive,
    children,
}: {
    isActive: boolean
    children: React.ReactNode
}) {
    return (
        <View className={`${isActive ? 'block' : 'hidden'}`}>{children}</View>
    )
}
