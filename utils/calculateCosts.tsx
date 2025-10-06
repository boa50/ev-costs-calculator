import type { ElectricVehicle, GasVehicle } from '@/types'

interface CalculateCostsProps {
    car: ElectricVehicle | GasVehicle
    distanceDrivenPerWeek: number
    distanceUnit?: string
    gasMeasurementUnit?: string
    fuelEfficiencyUnit?: string
}

export function calculateCosts({
    car,
    distanceDrivenPerWeek,
    distanceUnit = '',
    gasMeasurementUnit = '',
    fuelEfficiencyUnit = '',
}: CalculateCostsProps): { annualCosts: number; monthlyCosts: number } {
    const weeksPerMonth = 365 / 12 / 7

    let annualCosts = 0
    let monthlyCosts = 0

    if (isElectricVehicle(car)) {
        annualCosts = car.taxesPerYear + car.insurancePerYear

        const distanceCost =
            (car.electricityPrice * car.batteryCapacity) / car.batteryAutonomy
        const monthlyDrivingCost =
            distanceCost * distanceDrivenPerWeek * weeksPerMonth

        monthlyCosts = monthlyDrivingCost + yearToMonth(car.maintenancePerYear)
    } else {
        annualCosts = car.taxesPerYear + car.insurancePerYear

        const gasPrice = convertGasMeasurementToStandard(
            car.gasPrice,
            gasMeasurementUnit,
            fuelEfficiencyUnit
        )
        const distanceDrivenWeek = convertDistanceToStandard(
            distanceDrivenPerWeek,
            distanceUnit,
            fuelEfficiencyUnit
        )
        const fuelEfficiency = convertFuelEfficiencyToStandard(
            car.fuelEfficiency,
            fuelEfficiencyUnit
        )

        const distanceCost = gasPrice / fuelEfficiency
        const monthlyDrivingCost =
            distanceCost * distanceDrivenWeek * weeksPerMonth

        monthlyCosts = monthlyDrivingCost + yearToMonth(car.maintenancePerYear)
    }

    return { annualCosts, monthlyCosts }
}

interface CalculateEconomyProps {
    gasAnnualCosts: number
    evAnnualCosts: number
    gasMonthlyCosts: number
    evMonthlyCosts: number
}

export function calculateEconomy({
    gasAnnualCosts,
    evAnnualCosts,
    gasMonthlyCosts,
    evMonthlyCosts,
}: CalculateEconomyProps) {
    const annualEconomy = gasAnnualCosts - evAnnualCosts
    const monthlyEconomy = gasMonthlyCosts - evMonthlyCosts
    const perYearEconomy = annualEconomy + monthlyEconomy * 12

    return { annualEconomy, monthlyEconomy, perYearEconomy }
}

function convertDistanceToStandard(
    num: number,
    distance: string,
    fuelEfficiency: string
) {
    const milesToKmMultiplier = 1.609344

    if (distance === 'miles' && fuelEfficiency !== 'MPG')
        return num * milesToKmMultiplier
    if (distance === 'kilometres' && fuelEfficiency === 'MPG')
        return num / milesToKmMultiplier

    return num
}

function convertGasMeasurementToStandard(
    num: number,
    gasMeasurement: string,
    fuelEfficiency: string
) {
    const gallonsToLitresMultiplier = 3.785411784

    if (gasMeasurement === 'gallons' && fuelEfficiency !== 'MPG')
        return num * gallonsToLitresMultiplier
    if (gasMeasurement === 'litres' && fuelEfficiency === 'MPG')
        return num / gallonsToLitresMultiplier

    return num
}

function convertFuelEfficiencyToStandard(num: number, fuelEfficiency: string) {
    if (fuelEfficiency === 'L/100 km') return 100 / num

    return num
}

function yearToMonth(value: number, isPercentage?: boolean): number {
    if (isPercentage) return (1 + value) ** (1 / 12) - 1
    else return value / 12
}

function isElectricVehicle(
    car: ElectricVehicle | GasVehicle
): car is ElectricVehicle {
    return Object.hasOwn(car, 'batteryAutonomy')
}
