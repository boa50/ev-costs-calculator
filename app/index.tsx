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
    IconButton,
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
    showNumberSingularOrPlural,
} from '@/utils'
import type { FormValues, FormFields, TabNames, TabValidStates } from '@/types'

type Costs = {
    annual: number
    monthly: number
    perYear: number
}
type Economy = Costs & {
    numYears: number | undefined
    numMonths: number | undefined
    isMaxYears: boolean | undefined
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
    const [economy, setEconomy] = useState<Economy>()
    const [initialCost, setInitialCost] = useState<number>()

    const [distance, setDistance] = useLocalStorage('distance')
    const [gasMeasurement, setGasMeasurement] =
        useLocalStorage('gasMeasurement')
    const [fuelEfficiency, setFuelEfficiency] =
        useLocalStorage('fuelEfficiency')
    const [formValuesLocalStorage, setFormValuesLocalStorage] =
        useLocalStorage('formValues')

    validateLocalStorageUnits(
        distance,
        setDistance,
        gasMeasurement,
        setGasMeasurement,
        fuelEfficiency,
        setFuelEfficiency
    )

    const { handleSubmit, control, reset, trigger, getValues } =
        useForm<FormValues>({
            mode: 'onChange',
            defaultValues: getFormDefaultValues(),
            values:
                formValuesLocalStorage !== undefined
                    ? JSON.parse(formValuesLocalStorage)
                    : undefined,
        })

    const handleResetFields = () => reset(getFormDefaultValues())

    const handleSaveValues = () => {
        setFormValuesLocalStorage(JSON.stringify(getValues()))
    }

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

            const isCalculateTimeToRecoverInvestment =
                electricVehicle.buyingCost > 0 && gasVehicle.buyingCost > 0
            let initialCost

            if (isCalculateTimeToRecoverInvestment) {
                initialCost = electricVehicle.buyingCost - gasVehicle.buyingCost

                setInitialCost(initialCost)
            }

            const {
                annualEconomy,
                monthlyEconomy,
                perYearEconomy,
                numYears,
                numMonths,
                isMaxYears,
            } = calculateEconomy({
                gasAnnualCosts,
                evAnnualCosts,
                gasMonthlyCosts,
                evMonthlyCosts,
                initialCost,
                commonsData: data.commons,
            })

            setEconomy({
                annual: annualEconomy,
                monthly: monthlyEconomy,
                perYear: perYearEconomy,
                numYears: numYears,
                numMonths: numMonths,
                isMaxYears: isMaxYears,
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
                    <CostsView title="Electric" data={electricCosts} />
                    {gasCosts && <CostsView title="Gas" data={gasCosts} />}
                    {economy && (
                        <CostsView
                            title="Economy"
                            data={economy}
                            initialCost={initialCost}
                        />
                    )}
                </View>
            ) : (
                <View className="flex-1"></View>
            )}

            <Grid additionalClasses="mb-4">
                <Row>
                    <View>
                        <IconButton
                            icon="save-alt"
                            theme="secondary"
                            onPress={handleSaveValues}
                        />
                    </View>
                    <Col>
                        <Button
                            label="Calculate"
                            onPress={handleSubmit(onSubmit)}
                        />
                    </Col>
                    <View>
                        <IconButton
                            icon="clear"
                            theme="secondary"
                            onPress={handleResetFields}
                        />
                    </View>
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

interface CostsViewProps {
    title: string
    data: Costs | Economy
    initialCost?: number
}

function CostsView({ title, data, initialCost }: CostsViewProps) {
    const isEconomy = isEconomyData(data)
    const costEconomyText = isEconomy ? 'economy' : 'cost'

    return (
        <View>
            <Text className="font-medium">{title}</Text>
            <Text>
                Annual {costEconomyText}: {formatMonetaryNumber(data.annual)}
            </Text>
            <Text>
                Montlhy {costEconomyText}: {formatMonetaryNumber(data.monthly)}
            </Text>
            <Text>
                Total {costEconomyText} per year:{' '}
                {formatMonetaryNumber(data.perYear)}
            </Text>
            {isEconomy &&
                initialCost !== undefined &&
                initialCost > 0 &&
                (data.isMaxYears ? (
                    <Text className="pt-2">
                        You will take more than {data.numYears} years to recover
                        the {formatMonetaryNumber(initialCost)} initial cost
                    </Text>
                ) : (
                    <Text className="pt-2">
                        {`You will take ${showNumberSingularOrPlural(
                            data.numYears ?? 0,
                            'year',
                            'years'
                        )} and ${showNumberSingularOrPlural(
                            data.numMonths ?? 0,
                            'month',
                            'months'
                        )} to recover the ${formatMonetaryNumber(initialCost)} initial cost`}
                    </Text>
                ))}
        </View>
    )
}

function isEconomyData(data: Costs | Economy): data is Economy {
    return Object.hasOwn(data, 'numYears')
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
