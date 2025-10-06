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
    calculateEconomy,
} from '@/utils'
import type { FormValues, FormFields, TabNames, TabValidStates } from '@/types'

type Costs = {
    annual: number
    monthly: number
    perYear: number
}

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
    const [electricCosts, setElectricCosts] = useState<Costs>()
    const [gasCosts, setGasCosts] = useState<Costs>()
    const [economy, setEconomy] = useState<Costs>()

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
            calculateCosts({ car: electricVehicle, distanceDrivenPerWeek })

        setElectricCosts({
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
            } = calculateCosts({
                car: gasVehicle,
                distanceDrivenPerWeek,
                distanceUnit: distance,
                fuelEfficiencyUnit: gasMeasurement,
                gasMeasurementUnit: fuelEfficiency,
            })

            setGasCosts({
                annual: gasAnnualCosts,
                monthly: gasMonthlyCosts,
                perYear: gasAnnualCosts + gasMonthlyCosts * 12,
            })

            const { annualEconomy, monthlyEconomy, perYearEconomy } =
                calculateEconomy({
                    gasAnnualCosts,
                    evAnnualCosts,
                    gasMonthlyCosts,
                    evMonthlyCosts,
                })

            setEconomy({
                annual: annualEconomy,
                monthly: monthlyEconomy,
                perYear: perYearEconomy,
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

            {electricCosts ? (
                <View className="pt-4 flex-1 gap-4">
                    <CostsView title="Electric" costs={electricCosts} />
                    {gasCosts && <CostsView title="Gas" costs={gasCosts} />}
                    {economy && (
                        <CostsView
                            title="Economy"
                            costs={economy}
                            isEconomy={true}
                        />
                    )}
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

function CostsView({
    title,
    costs,
    isEconomy,
}: {
    title: string
    costs: Costs
    isEconomy?: boolean
}) {
    const costEconomyText = isEconomy ? 'economy' : 'cost'

    return (
        <View>
            <Text className="font-medium">{title}</Text>
            <Text>
                Annual {costEconomyText}: $ {formatMonetaryNumber(costs.annual)}
            </Text>
            <Text>
                Montlhy {costEconomyText}: ${' '}
                {formatMonetaryNumber(costs.monthly)}
            </Text>
            <Text>
                Total {costEconomyText} per year: ${' '}
                {formatMonetaryNumber(costs.perYear)}
            </Text>
        </View>
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
