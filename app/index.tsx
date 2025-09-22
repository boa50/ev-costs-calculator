import { useState } from 'react'
import { View, Text } from 'react-native'
import ElectricVehicleForm from '@/features/ElectricVehicleForm'
import GasVehicleForm from '@/features/GasVehicleForm'
import CommonsForm from '@/features/CommonsForm'
import { Button } from '@/components'
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
        useState<ElectricVehicleFormState>({
            cost: '',
            batteryAutonomy: '',
            batteryCapacity: '',
            electricityPrice: '',
            insurancePerYear: '',
            maintenancePerYear: '',
            taxesPerYear: '',
        })
    const [gasVehicleState, setGasVehicleState] = useState<GasVehicleFormState>(
        {
            cost: '',
            autonomy: '',
            gasPrice: '',
            insurancePerYear: '',
            maintenancePerYear: '',
            taxesPerYear: '',
        }
    )
    const [commonFormState, setCommonFormState] = useState<CommonsFormState>({
        interestRatePerYear: '',
        inflationPerYear: '',
        currentMonth: '1',
        annualPaymentsMonth: '1',
        distanceDrivenPerWeek: '',
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

    return (
        <View className="px-4 py-4 flex-1">
            <ElectricVehicleForm
                electricVehicleState={electricVehicleState}
                setElectricVehicleState={setElectricVehicleState}
            />

            <GasVehicleForm
                gasVehicleState={gasVehicleState}
                setGasVehicleState={setGasVehicleState}
            />

            <CommonsForm
                state={commonFormState}
                setState={setCommonFormState}
            />

            <Button label="Calculate" onPress={handleCalculate} />
            <Button label="Clear fields" theme="secondary" />

            {costs && (
                <View className="pt-4">
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
            )}
        </View>
    )
}
