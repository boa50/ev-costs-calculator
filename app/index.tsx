import { useState } from 'react'
import { View } from 'react-native'
import Input from '@/components/Input'

export default function Index() {
    const [buyingCost, setBuyingCost] = useState<number>(0)
    const [insuranceCost, setInsuranceCost] = useState<number>(0)
    const [taxesPerYear, setTaxesPerYear] = useState<number>(0)
    const [maintenancePerYear, setMaintenancePerYear] = useState<number>(0)
    const [batteryAutonomy, setBatteryAutonomy] = useState<number>(0)
    const [batteryCapacity, setBatteryCapacity] = useState<number>(0)
    const [distanceDrivenPerWeek, setDistanceDrivenPerWeek] =
        useState<number>(0)
    const [electricityPrice, setElectricityPrice] = useState<number>(0)

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
                keyboardType="number-pad"
                iconLeft="$"
                placeholder="0.00"
            />

            <Input
                label="Insurance per year"
                value={insuranceCost}
                setValue={setInsuranceCost}
                keyboardType="number-pad"
                iconLeft="$"
                placeholder="0.00"
            />

            <Input
                label="Taxes per year"
                value={taxesPerYear}
                setValue={setTaxesPerYear}
                keyboardType="number-pad"
                iconLeft="$"
                placeholder="0.00"
            />

            <Input
                label="Maintenance per year"
                value={maintenancePerYear}
                setValue={setMaintenancePerYear}
                keyboardType="number-pad"
                iconLeft="$"
                placeholder="0.00"
            />

            <Input
                label="Batery autonomy"
                value={batteryAutonomy}
                setValue={setBatteryAutonomy}
                keyboardType="number-pad"
                iconRight="km"
                placeholder="0"
            />

            <Input
                label="Batery capacity"
                value={batteryCapacity}
                setValue={setBatteryCapacity}
                keyboardType="number-pad"
                iconRight="kWh"
                placeholder="0"
            />

            <Input
                label="Distance driven per week"
                value={distanceDrivenPerWeek}
                setValue={setDistanceDrivenPerWeek}
                keyboardType="number-pad"
                iconRight="km"
                placeholder="0"
            />

            <Input
                label="Electricity Price"
                value={electricityPrice}
                setValue={setElectricityPrice}
                keyboardType="number-pad"
                iconLeft="$"
                iconRight="kWh"
                placeholder="0.00"
            />
        </View>
    )
}
