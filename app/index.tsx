import { useState } from 'react'
import { View } from 'react-native'
import Input from '@/components/Input'

export default function Index() {
    const [buyingCost, setBuyingCost] = useState<number>(0)
    const [insuranceCost, setInsuranceCost] = useState<number>(0)

    return (
        <View
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
                icon="dollar"
            />

            <Input
                label="Insurance per year"
                value={insuranceCost}
                setValue={setInsuranceCost}
                keyboardType="number-pad"
                icon="dollar"
                iconPosition="right"
            />
        </View>
    )
}
