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
import type { FormValues, FormFields, TabNames, TabValidStates } from '@/types'

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

    const handleResetFields = () => reset()

    const { handleSubmit, control, reset, trigger } = useForm<FormValues>({
        mode: 'onChange',
        defaultValues: getFormDefaultValues(),
    })

    const onSubmit = (data: FormValues) => {
        const distanceDrivenPerWeek = convertTextToNumber(
            data.commons.distanceDrivenPerWeek,
            true
        )
        const electricVehicle = getElectricVehicleFromForm(data)

        const { annualCosts: evAnnualCosts, monthlyCosts: evMonthlyCosts } =
            calculateCosts(electricVehicle, distanceDrivenPerWeek)
        setCosts({
            annual: evAnnualCosts,
            monthly: evMonthlyCosts,
            perYear: evAnnualCosts + evMonthlyCosts * 12,
        })

        const hasGasVehicle =
            data.gas.fuelEfficiency !== '' && data.gas.gasPrice !== ''

        if (hasGasVehicle) {
            const gasVehicle = getGasVehicleFromForm(data)

            const {
                annualCosts: gasAnnualCosts,
                monthlyCosts: gasMonthlyCosts,
            } = calculateCosts(
                gasVehicle,
                distanceDrivenPerWeek,
                distance,
                gasMeasurement,
                fuelEfficiency
            )
            setCosts({
                annual: gasAnnualCosts,
                monthly: gasMonthlyCosts,
                perYear: gasAnnualCosts + gasMonthlyCosts * 12,
            })
        }
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

function getFormDefaultValues(): FormValues {
    return {
        ev: {
            batteryAutonomy: '',
            batteryCapacity: '',
            buyingCost: '',
            electricityPrice: '',
            insurancePerYear: '',
            maintenancePerYear: '',
            taxesPerYear: '',
        },
        gas: {
            buyingCost: '',
            fuelEfficiency: '',
            gasPrice: '',
            insurancePerYear: '',
            maintenancePerYear: '',
            taxesPerYear: '',
        },
        commons: {
            annualPaymentsMonth: '1',
            currentMonth: getCurrentMonthNumber(),
            distanceDrivenPerWeek: '',
            inflationPerYear: '',
            interestRatePerYear: '',
        },
    }
}
