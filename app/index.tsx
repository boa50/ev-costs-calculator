import { useState } from 'react'
import { View, Text } from 'react-native'
import ElectricVehicleForm from '@/features/ElectricVehicleForm'
import { Input, Button } from '@/components'
import {
    calculateCosts,
    convertTextToNumber,
    formatMonetaryNumber,
} from '@/utils'
import type { ElectricVehicle, ElectricVehicleFormState } from '@/types'

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
    const [distanceDrivenPerWeek, setDistanceDrivenPerWeek] =
        useState<string>('')
    const [costs, setCosts] = useState<{
        annual: number
        monthly: number
        perYear: number
    }>()

    const handleCalculate = () => {
        // const car: ElectricVehicle = {
        //     cost: convertTextToNumber(buyingCost),
        //     insurancePerYear: convertTextToNumber(insuranceCost),
        //     taxesPerYear: convertTextToNumber(taxesPerYear),
        //     maintenancePerYear: convertTextToNumber(maintenancePerYear),
        //     batteryAutonomy: convertTextToNumber(batteryAutonomy),
        //     batteryCapacity: convertTextToNumber(batteryCapacity),
        //     electricityPrice: convertTextToNumber(electricityPrice),
        // }

        if (electricVehicleState) {
            // const { annualCosts, monthlyCosts } = calculateCosts(
            //     electricVehicleState,
            //     convertTextToNumber(distanceDrivenPerWeek)
            // )
            // setCosts({
            //     annual: annualCosts,
            //     monthly: monthlyCosts,
            //     perYear: annualCosts + monthlyCosts * 12,
            // })
        }
    }

    return (
        <View className="px-4 py-4 flex-1">
            <ElectricVehicleForm
                electricVehicleState={electricVehicleState}
                setElectricVehicleState={setElectricVehicleState}
            />

            <Input
                label="Distance driven per week"
                value={distanceDrivenPerWeek}
                setValue={setDistanceDrivenPerWeek}
                iconRight="km"
                placeholder="0"
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
