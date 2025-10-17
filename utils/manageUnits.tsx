import { MMKV } from 'react-native-mmkv'

export function getUnits(): {
    distance: string[]
    gasMeasurement: string[]
    fuelEfficiency: string[]
} {
    return {
        distance: ['kilometres', 'miles'],
        gasMeasurement: ['litres', 'gallons'],
        fuelEfficiency: ['km/L', 'MPG', 'L/100 km'],
    }
}

export function validateLocalStorageUnits(): void {
    const storage = new MMKV()
    const units = getUnits()

    const distance = storage.getString('distance')
    const gasMeasurement = storage.getString('gasMeasurement')
    const fuelEfficiency = storage.getString('fuelEfficiency')

    if (distance === undefined || !units.distance.includes(distance))
        storage.set('distance', units.distance[0])
    if (
        gasMeasurement === undefined ||
        !units.gasMeasurement.includes(gasMeasurement)
    )
        storage.set('gasMeasurement', units.gasMeasurement[0])
    if (
        fuelEfficiency === undefined ||
        !units.fuelEfficiency.includes(fuelEfficiency)
    )
        storage.set('fuelEfficiency', units.fuelEfficiency[0])
}
