import { useEffect, useState, useRef } from 'react'
import { View, ScrollView } from 'react-native'
import ElectricVehicleForm from '@/features/ElectricVehicleForm'
import GasVehicleForm from '@/features/GasVehicleForm'
import CommonsForm from '@/features/CommonsForm'
import { useCostsContext, useLayoutContext } from '@/contexts'
import { useRouter } from 'expo-router'
import { useLocalStorage, useKeyboardOffset } from '@/hooks'
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
    ContentContainer,
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
import type { FormValues, FormFields, TabNames, TabValidStates } from '@/types'

export default function Index() {
    const distance = useLocalStorage('distance')[0]
    const gasMeasurement = useLocalStorage('gasMeasurement')[0]
    const fuelEfficiency = useLocalStorage('fuelEfficiency')[0]
    const [formValuesLocalStorage, setFormValuesLocalStorage] =
        useLocalStorage('formValues')

    const { t } = useTranslation()
    const router = useRouter()
    const { costsDispatch } = useCostsContext()
    const { layoutState, layoutDispatch } = useLayoutContext()

    const buttonsRef = useRef<View>(null)
    const keyboardOffset = useKeyboardOffset(buttonsRef)

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
        costsDispatch({ type: 'CLEAR_COSTS' })
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

        const evCosts = {
            annual: evAnnualCosts,
            monthly: evMonthlyCosts,
            perYear: evAnnualCosts + evMonthlyCosts * 12,
        }

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

            const isCalculateTimeToRecoverInvestment =
                electricVehicle.buyingCost > 0 && gasVehicle.buyingCost > 0

            let initialCost
            if (isCalculateTimeToRecoverInvestment) {
                initialCost = electricVehicle.buyingCost - gasVehicle.buyingCost
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

            costsDispatch({
                type: 'SET_COSTS',
                payload: {
                    electric: evCosts,
                    gas: {
                        annual: gasAnnualCosts,
                        monthly: gasMonthlyCosts,
                        perYear: gasAnnualCosts + gasMonthlyCosts * 12,
                    },
                    economy: {
                        annual: annualEconomy,
                        monthly: monthlyEconomy,
                        perYear: perYearEconomy,
                        numYears: numYears,
                        numMonths: numMonths,
                        isMaxYears: isMaxYears,
                    },
                    initialCost: initialCost,
                },
            })
        } else {
            costsDispatch({
                type: 'SET_COSTS',
                payload: { electric: evCosts },
            })
        }

        router.navigate('/results')
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

    const scrollViewRef = useRef<ScrollView>(null)
    useEffect(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false })
    }, [
        filterButtonsState.ev.isActive,
        filterButtonsState.gas.isActive,
        filterButtonsState.commons.isActive,
    ])

    const formContainerRef = useRef<View>(null)
    const scrollViewPositionX = layoutState.formContainerPositionX
    useEffect(() => {
        if (
            formContainerRef.current !== undefined &&
            formContainerRef.current !== null &&
            scrollViewPositionX === undefined
        ) {
            formContainerRef.current?.measure(
                (x, y, width, height, pageX, pageY) => {
                    layoutDispatch({
                        type: 'SET_FORM_CONTAINER_POSITION',
                        payload: { x: pageX, y: pageY },
                    })
                }
            )
        }
    }, [layoutDispatch, scrollViewPositionX])

    return (
        <Container>
            <ContentContainer>
                <View className="pb-4">
                    <FilterButtons
                        state={filterButtonsState}
                        setState={setFilterButtonsState}
                    />
                </View>

                <View className="flex-1">
                    <View
                        ref={formContainerRef}
                        className="mb-2"
                        style={{ flex: 1, paddingBottom: keyboardOffset }}
                    >
                        <ScrollView ref={scrollViewRef} style={{ flexGrow: 1 }}>
                            <FormView isActive={filterButtonsState.ev.isActive}>
                                <ElectricVehicleForm
                                    control={control}
                                    setTabIsValid={(isValid) =>
                                        handleChangeTabValidState('ev', isValid)
                                    }
                                />
                            </FormView>

                            <FormView
                                isActive={filterButtonsState.gas.isActive}
                            >
                                <GasVehicleForm
                                    control={control}
                                    setTabIsValid={(isValid) =>
                                        handleChangeTabValidState(
                                            'gas',
                                            isValid
                                        )
                                    }
                                    triggerRevalidation={(
                                        fields: FormFields[]
                                    ) => {
                                        trigger(fields)
                                    }}
                                />
                            </FormView>

                            <FormView
                                isActive={filterButtonsState.commons.isActive}
                            >
                                <CommonsForm
                                    control={control}
                                    setTabIsValid={(isValid) =>
                                        handleChangeTabValidState(
                                            'commons',
                                            isValid
                                        )
                                    }
                                />
                            </FormView>
                        </ScrollView>
                    </View>

                    <View ref={buttonsRef}>
                        <Grid additionalClasses="mb-2">
                            <Row>
                                <View>
                                    <IconButton
                                        icon="save-alt"
                                        theme="secondary"
                                        onPress={handleSaveValues}
                                        accessibilityText="Save Values"
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
                                        accessibilityText="Reset Values"
                                    />
                                </View>
                            </Row>
                        </Grid>
                    </View>
                </View>
            </ContentContainer>
            <BannerAd />
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
