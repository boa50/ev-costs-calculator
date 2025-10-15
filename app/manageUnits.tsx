import { useLocalStorage } from '@/hooks'
import { View } from 'react-native'
import { Container, SwitchMultiple } from '@/components'
import { getUnits } from '@/utils'
import { useTranslation } from 'react-i18next'
import { NativeAd } from '@/components/ads'

const units = getUnits()
const btnWidth = 84

export default function ManageUnits() {
    const { t } = useTranslation()

    const [distance, setDistance] = useLocalStorage('distance')
    const [gasMeasurement, setGasMeasurement] =
        useLocalStorage('gasMeasurement')
    const [fuelEfficiency, setFuelEfficiency] =
        useLocalStorage('fuelEfficiency')

    const distanceOptions = [
        { label: t('manageUnits.distance.km'), value: units.distance[0] },
        { label: t('manageUnits.distance.miles'), value: units.distance[1] },
    ]
    const gasMeasurementOptions = [
        {
            label: t('manageUnits.gasMeasurement.litres'),
            value: units.gasMeasurement[0],
        },
        {
            label: t('manageUnits.gasMeasurement.gallons'),
            value: units.gasMeasurement[1],
        },
    ]
    const fuelEfficiencyOptions = [
        {
            label: t('manageUnits.fuelEfficiency.km_l'),
            value: units.fuelEfficiency[0],
        },
        {
            label: t('manageUnits.fuelEfficiency.mpg'),
            value: units.fuelEfficiency[1],
        },
        {
            label: t('manageUnits.fuelEfficiency.l_100km'),
            value: units.fuelEfficiency[2],
        },
    ]

    return (
        <View className="flex-1">
            <Container>
                <View className="gap-4">
                    <SwitchMultiple
                        label={t('manageUnits.distance.title')}
                        options={distanceOptions}
                        value={distance ?? units.distance[0]}
                        setValue={setDistance}
                        btnWidth={btnWidth}
                    />
                    <SwitchMultiple
                        label={t('manageUnits.gasMeasurement.title')}
                        options={gasMeasurementOptions}
                        value={gasMeasurement ?? units.gasMeasurement[0]}
                        setValue={setGasMeasurement}
                        btnWidth={btnWidth}
                    />
                    <SwitchMultiple
                        label={t('manageUnits.fuelEfficiency.title')}
                        options={fuelEfficiencyOptions}
                        value={fuelEfficiency ?? units.fuelEfficiency[0]}
                        setValue={setFuelEfficiency}
                        btnWidth={btnWidth}
                    />
                </View>
            </Container>
            <NativeAd />
        </View>
    )
}
