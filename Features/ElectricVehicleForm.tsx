import { View } from 'react-native'
import { Input } from '@/components'
import type { ElectricVehicleFormState } from '@/types'

interface Props {
    electricVehicleState: ElectricVehicleFormState
    setElectricVehicleState: React.Dispatch<
        React.SetStateAction<ElectricVehicleFormState>
    >
}

export default function ElectricVehicleForm({
    electricVehicleState,
    setElectricVehicleState,
}: Props) {
    const changeState = (
        key: keyof ElectricVehicleFormState,
        value: string
    ) => {
        setElectricVehicleState((prevState) => ({ ...prevState, [key]: value }))
    }

    return (
        <View className="px-4 flex items-center">
            <Input
                label="Buying cost"
                value={electricVehicleState.cost}
                setValue={(value) => changeState('cost', value)}
                iconLeft="$"
                placeholder="0.00"
            />

            <Input
                label="Insurance per year"
                value={electricVehicleState.insurancePerYear}
                setValue={(value) => changeState('insurancePerYear', value)}
                iconLeft="$"
                placeholder="0.00"
            />

            <Input
                label="Taxes per year"
                value={electricVehicleState.taxesPerYear}
                setValue={(value) => changeState('taxesPerYear', value)}
                iconLeft="$"
                placeholder="0.00"
            />

            <Input
                label="Maintenance per year"
                value={electricVehicleState.maintenancePerYear}
                setValue={(value) => changeState('maintenancePerYear', value)}
                iconLeft="$"
                placeholder="0.00"
            />

            <Input
                label="Batery autonomy"
                value={electricVehicleState.batteryAutonomy}
                setValue={(value) => changeState('batteryAutonomy', value)}
                iconRight="km"
                placeholder="0"
            />

            <Input
                label="Batery capacity"
                value={electricVehicleState.batteryCapacity}
                setValue={(value) => changeState('batteryCapacity', value)}
                iconRight="kWh"
                placeholder="0"
            />

            <Input
                label="Electricity Price"
                value={electricVehicleState.electricityPrice}
                setValue={(value) => changeState('electricityPrice', value)}
                iconLeft="$"
                iconRight="kWh"
                placeholder="0.00"
            />
        </View>
    )
}
