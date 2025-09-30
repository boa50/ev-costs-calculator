import { useLocalStorage } from '@/hooks'
import { View } from 'react-native'
import { Container, SwitchMultiple } from '@/components'
import { getUnits } from '@/utils'

const units = getUnits()
const btnWidth = 84

export default function ManageUnits() {
    const [distance, setDistance] = useLocalStorage('distance')
    const [gasMeasurement, setGasMeasurement] =
        useLocalStorage('gasMeasurement')
    const [fuelEfficiency, setFuelEfficiency] =
        useLocalStorage('fuelEfficiency')

    return (
        <Container>
            <View className="gap-4">
                <SwitchMultiple
                    label="Distance"
                    options={units.distance}
                    value={distance ?? units.distance[0]}
                    setValue={setDistance}
                    btnWidth={btnWidth}
                />
                <SwitchMultiple
                    label="Gas Measurement"
                    options={units.gasMeasurement}
                    value={gasMeasurement ?? units.gasMeasurement[0]}
                    setValue={setGasMeasurement}
                    btnWidth={btnWidth}
                />
                <SwitchMultiple
                    label="Fuel Efficiency"
                    options={units.fuelEfficiency}
                    value={fuelEfficiency ?? units.fuelEfficiency[0]}
                    setValue={setFuelEfficiency}
                    btnWidth={btnWidth}
                />
            </View>
        </Container>
    )
}
