import { useState } from 'react'
import { View, Text } from 'react-native'
import { Input, Button } from '@/components'
import {
    calculateCosts,
    convertTextToNumber,
    formatMonetaryNumber,
} from '@/utils'
import type { ElectricVehicle } from '@/types'

export default function Index() {
    const [buyingCost, setBuyingCost] = useState<string>('')
    const [insuranceCost, setInsuranceCost] = useState<string>('')
    const [taxesPerYear, setTaxesPerYear] = useState<string>('')
    const [maintenancePerYear, setMaintenancePerYear] = useState<string>('')
    const [batteryAutonomy, setBatteryAutonomy] = useState<string>('')
    const [batteryCapacity, setBatteryCapacity] = useState<string>('')
    const [distanceDrivenPerWeek, setDistanceDrivenPerWeek] =
        useState<string>('')
    const [electricityPrice, setElectricityPrice] = useState<string>('')
    const [costs, setCosts] = useState<{
        annual: number
        monthly: number
        perYear: number
    }>()

    const handleCalculate = () => {
        const car: ElectricVehicle = {
            cost: convertTextToNumber(buyingCost),
            insurancePerYear: convertTextToNumber(insuranceCost),
            taxesPerYear: convertTextToNumber(taxesPerYear),
            maintenancePerYear: convertTextToNumber(maintenancePerYear),
            batteryAutonomy: convertTextToNumber(batteryAutonomy),
            batteryCapacity: convertTextToNumber(batteryCapacity),
            electricityPrice: convertTextToNumber(electricityPrice),
        }

        const { annualCosts, monthlyCosts } = calculateCosts(
            car,
            convertTextToNumber(distanceDrivenPerWeek)
        )

        setCosts({
            annual: annualCosts,
            monthly: monthlyCosts,
            perYear: annualCosts + monthlyCosts * 12,
        })
    }

    return (
        <View
            className="px-4"
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Input
                label="Buying cost"
                value={buyingCost}
                setValue={setBuyingCost}
                iconLeft="$"
                placeholder="0.00"
            />

            <Input
                label="Insurance per year"
                value={insuranceCost}
                setValue={setInsuranceCost}
                iconLeft="$"
                placeholder="0.00"
            />

            <Input
                label="Taxes per year"
                value={taxesPerYear}
                setValue={setTaxesPerYear}
                iconLeft="$"
                placeholder="0.00"
            />

            <Input
                label="Maintenance per year"
                value={maintenancePerYear}
                setValue={setMaintenancePerYear}
                iconLeft="$"
                placeholder="0.00"
            />

            <Input
                label="Batery autonomy"
                value={batteryAutonomy}
                setValue={setBatteryAutonomy}
                iconRight="km"
                placeholder="0"
            />

            <Input
                label="Batery capacity"
                value={batteryCapacity}
                setValue={setBatteryCapacity}
                iconRight="kWh"
                placeholder="0"
            />

            <Input
                label="Distance driven per week"
                value={distanceDrivenPerWeek}
                setValue={setDistanceDrivenPerWeek}
                iconRight="km"
                placeholder="0"
            />

            <Input
                label="Electricity Price"
                value={electricityPrice}
                setValue={setElectricityPrice}
                iconLeft="$"
                iconRight="kWh"
                placeholder="0.00"
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
