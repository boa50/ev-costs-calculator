import { useEffect, useState } from 'react'
import { View } from 'react-native'
import ElectricVehicleForm from '@/features/ElectricVehicleForm'
import GasVehicleForm from '@/features/GasVehicleForm'
import CommonsForm from '@/features/CommonsForm'
import { CostsCard, RecoverInvestmentCard } from '@/features/CostsCard'
import { useLocalStorage } from '@/hooks'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BannerAd } from '@/components/ads/BannerAd'
import {
    Button,
    FilterButtons,
    type FilterButtonsObject,
    Grid,
    Row,
    Col,
    Container,
    IconButton,
    useToast,
} from '@/components'
import {
    calculateCosts,
    convertTextToNumber,
    getElectricVehicleFromForm,
    getGasVehicleFromForm,
    getCurrentMonthNumber,
    calculateEconomy,
} from '@/utils'
import type {
    FormValues,
    FormFields,
    TabNames,
    TabValidStates,
    Costs,
    Economy,
} from '@/types'

export default function Index() {
    const distance = useLocalStorage('distance')[0]
    const gasMeasurement = useLocalStorage('gasMeasurement')[0]
    const fuelEfficiency = useLocalStorage('fuelEfficiency')[0]
    const [formValuesLocalStorage, setFormValuesLocalStorage] =
        useLocalStorage('formValues')

    const { t } = useTranslation()

    const [filterButtonsState, setFilterButtonsState] =
        useState<FilterButtonsObject>({
            ev: {
                label: t('form.tabs.ev'),
                isActive: true,
                isValid: 'incomplete',
            },
            gas: {
                label: t('form.tabs.gas'),
                isActive: false,
                isValid: 'valid',
            },
            commons: {
                label: t('form.tabs.commons'),
                isActive: false,
                isValid: 'incomplete',
            },
        })
    const [electricCosts, setElectricCosts] = useState<Costs>()
    const [gasCosts, setGasCosts] = useState<Costs>()
    const [economy, setEconomy] = useState<Economy>()
    const [initialCost, setInitialCost] = useState<number>()
    const [isLocalStorageChecked, setIsLocalStorageChecked] =
        useState<boolean>(false)

    const { showToast } = useToast()

    const { handleSubmit, control, reset, trigger, getValues, setValue } =
        useForm<FormValues>({
            mode: 'onChange',
            defaultValues: getFormDefaultValues(),
        })

    useEffect(() => {
        if (!isLocalStorageChecked) {
            if (formValuesLocalStorage !== undefined) {
                const defaultValues = getFormDefaultValues()
                const values = JSON.parse(formValuesLocalStorage) as FormValues
                const options = {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                }

                Object.entries(values).forEach(([key, objValues]) => {
                    Object.entries(objValues).forEach(([subKey, value]) => {
                        const typedKey = key as keyof FormValues
                        const concatKey = `${key}.${subKey}` as FormFields

                        // @ts-ignore Could't find a good way to ensure typing in this case
                        if (value !== defaultValues[typedKey][subKey])
                            setValue(concatKey, value, options)
                    })
                })
            }

            setIsLocalStorageChecked(true)
        }
    }, [isLocalStorageChecked, formValuesLocalStorage, setValue])

    const handleResetFields = () => {
        reset(getFormDefaultValues())
        setElectricCosts(undefined)
        setGasCosts(undefined)
        setEconomy(undefined)
        setInitialCost(undefined)
    }

    const handleSaveValues = () => {
        setFormValuesLocalStorage(JSON.stringify(getValues()))
        showToast(t('form.buttons.saveMessage'), 'success')
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
        <View className="flex-1">
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
                    <Grid additionalClasses="pt-4 flex-1 gap-4">
                        <Row>
                            <Col>
                                <CostsCard
                                    title={t('form.costsCards.headers.ev')}
                                    data={electricCosts}
                                    icon="electricity"
                                />
                            </Col>
                            <Col>
                                {gasCosts && (
                                    <CostsCard
                                        title={t('form.costsCards.headers.gas')}
                                        data={gasCosts}
                                        icon="gas"
                                    />
                                )}
                            </Col>
                        </Row>
                        {economy && (
                            <>
                                <Row>
                                    <Col>
                                        <CostsCard
                                            title={t(
                                                'form.costsCards.headers.economy'
                                            )}
                                            data={economy}
                                            icon="money"
                                        />
                                    </Col>
                                    <Col></Col>
                                </Row>
                                {initialCost !== undefined && (
                                    <Row>
                                        <RecoverInvestmentCard
                                            data={economy}
                                            initialCost={initialCost}
                                        />
                                    </Row>
                                )}
                            </>
                        )}
                    </Grid>
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
                                label={t('form.buttons.calculate')}
                                onPress={handleSubmit(onSubmit)}
                            />
                        </Col>
                        <View>
                            <IconButton
                                icon="settings-backup-restore"
                                theme="secondary"
                                onPress={handleResetFields}
                            />
                        </View>
                    </Row>
                </Grid>
            </Container>
            <BannerAd />
        </View>
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
