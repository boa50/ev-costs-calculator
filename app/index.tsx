import { useState } from 'react'
import { View, Text } from 'react-native'
import ElectricVehicleForm from '@/features/ElectricVehicleForm'
import GasVehicleForm from '@/features/GasVehicleForm'
import CommonsForm from '@/features/CommonsForm'
import { useLocalStorage } from '@/hooks'
import { useForm } from 'react-hook-form'
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
    validateLocalStorageUnits,
    getCurrentMonthNumber,
} from '@/utils'
import type { FormFields, TabNames, TabValidStates } from '@/types'

export default function Index() {
    const [filterButtonsState, setFilterButtonsState] =
        useState<FilterButtonsObject>({
            ev: { label: 'Electric', isActive: true, isValid: 'incomplete' },
            gas: { label: 'Gas', isActive: false, isValid: 'valid' },
            commons: {
                label: 'Commons',
                isActive: false,
                isValid: 'incomplete',
            },
        })
    const [costs, setCosts] = useState<{
        annual: number
        monthly: number
        perYear: number
    }>()

    const [distance, setDistance] = useLocalStorage('distance')
    const [gasMeasurement, setGasMeasurement] =
        useLocalStorage('gasMeasurement')
    const [fuelEfficiency, setFuelEfficiency] =
        useLocalStorage('fuelEfficiency')

    validateLocalStorageUnits(
        distance,
        setDistance,
        gasMeasurement,
        setGasMeasurement,
        fuelEfficiency,
        setFuelEfficiency
    )

    const handleResetFields = () => {}

    const { handleSubmit, control, reset, trigger } = useForm({
        mode: 'onChange',
        defaultValues: getFormDefaultValues(),
    })
    trigger(['gas.fuelEfficiency', 'gas.gasPrice'])

    const onSubmit = (data: any) => {
        //// TO IMPLEMENT
        // if (electricVehicleState) {
        //         const car = getElectricVehicleFromForm(electricVehicleState)
        //         const { annualCosts, monthlyCosts } = calculateCosts(
        //             car,
        //             convertTextToNumber(commonsFormState.distanceDrivenPerWeek)
        //         )
        //         setCosts({
        //             annual: annualCosts,
        //             monthly: monthlyCosts,
        //             perYear: annualCosts + monthlyCosts * 12,
        //         })
        //     }
        //     if (gasVehicleState) {
        //         const car = getGasVehicleFromForm(gasVehicleState)
        //         const { annualCosts, monthlyCosts } = calculateCosts(
        //             car,
        //             convertTextToNumber(commonsFormState.distanceDrivenPerWeek)
        //         )
        //         setCosts({
        //             annual: annualCosts,
        //             monthly: monthlyCosts,
        //             perYear: annualCosts + monthlyCosts * 12,
        //         })
        //     }
        // }
    }

    const handleChangeTabValidState = (
        tab: TabNames,
        isValid: TabValidStates
    ) => {
        setFilterButtonsState((prevState) => ({
            ...prevState,
            [tab]: { ...prevState[tab], isValid: isValid },
        }))
    }

    return (
        <Container>
            <View className="pb-4">
                <FilterButtons
                    state={filterButtonsState}
                    setState={setFilterButtonsState}
                />
            </View>

            <FormView isActive={filterButtonsState.ev.isActive}>
                <ElectricVehicleForm
                    control={control}
                    setTabIsValid={(isValid) =>
                        handleChangeTabValidState('ev', isValid)
                    }
                />
            </FormView>

            <FormView isActive={filterButtonsState.gas.isActive}>
                <GasVehicleForm
                    control={control}
                    setTabIsValid={(isValid) =>
                        handleChangeTabValidState('gas', isValid)
                    }
                    triggerRevalidation={(fields: FormFields[]) => {
                        trigger(fields)
                    }}
                />
            </FormView>

            <FormView isActive={filterButtonsState.commons.isActive}>
                <CommonsForm
                    control={control}
                    setTabIsValid={(isValid) =>
                        handleChangeTabValidState('commons', isValid)
                    }
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
                        <Button
                            label="Calculate"
                            onPress={handleSubmit(onSubmit)}
                        />
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

function getFormDefaultValues(): { [key in FormFields]: string } {
    return {
        'ev.batteryAutonomy': '',
        'ev.batteryCapacity': '',
        'ev.buyingCost': '',
        'ev.electricityPrice': '',
        'ev.insurancePerYear': '',
        'ev.maintenancePerYear': '',
        'ev.taxesPerYear': '',
        'gas.buyingCost': '',
        'gas.fuelEfficiency': '',
        'gas.gasPrice': '',
        'gas.insurancePerYear': '',
        'gas.maintenancePerYear': '',
        'gas.taxesPerYear': '',
        'commons.annualPaymentsMonth': '1',
        'commons.currentMonth': getCurrentMonthNumber(),
        'commons.distanceDrivenPerWeek': '',
        'commons.inflationPerYear': '',
        'commons.interestRatePerYear': '',
    }
}
