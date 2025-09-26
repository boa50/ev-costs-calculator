import { useState } from 'react'
import { Container, SwitchMultiple } from '@/components'
import { View } from 'react-native'

export default function ManageUnits() {
    const [distance, setDistance] = useState<string>('km')
    const [gasMeasurement, setGasMeasurement] = useState<string>('litres')
    const [fuelEfficiency, setFuelEfficiency] = useState<string>('km')

    return (
        <Container>
            <View className="gap-4">
                <SwitchMultiple
                    label="Distance"
                    options={['km', 'miles']}
                    value={distance}
                    setValue={setDistance}
                    btnWidth={72}
                />
                <SwitchMultiple
                    label="Gas Measurement"
                    options={['litres', 'gallons']}
                    value={gasMeasurement}
                    setValue={setGasMeasurement}
                    btnWidth={72}
                />
                <SwitchMultiple
                    label="Fuel Efficiency"
                    options={['km/L', 'MPG', 'L/100 km']}
                    value={fuelEfficiency}
                    setValue={setFuelEfficiency}
                    btnWidth={72}
                />
            </View>
        </Container>
    )
}
