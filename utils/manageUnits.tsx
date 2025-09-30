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

export function validateLocalStorageUnits(
    distance: string | undefined,
    setDistance: (distance: string) => void,
    gasMeasurement: string | undefined,
    setGasMeasurement: (gasMeasurement: string) => void,
    fuelEfficiency: string | undefined,
    setFuelEfficiency: (fuelEfficiency: string) => void
): void {
    const units = getUnits()

    if (distance === undefined || !units.distance.includes(distance))
        setDistance(units.distance[0])
    if (
        gasMeasurement === undefined ||
        !units.gasMeasurement.includes(gasMeasurement)
    )
        setGasMeasurement(units.gasMeasurement[0])
    if (
        fuelEfficiency === undefined ||
        !units.fuelEfficiency.includes(fuelEfficiency)
    )
        setFuelEfficiency(units.fuelEfficiency[0])
}
