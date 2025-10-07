import { convertTextToNumber } from './convertTextToNumber'
import { convertAnnualToMonthly } from './convertAnnualToMonthy'
import type { ElectricVehicle, GasVehicle, CommonsFields } from '@/types'

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
    initialCost?: number
    commonsData: { [key in CommonsFields]: string }
}

export function calculateEconomy({
    gasAnnualCosts,
    evAnnualCosts,
    gasMonthlyCosts,
    evMonthlyCosts,
    initialCost,
    commonsData,
}: CalculateEconomyProps): {
    annualEconomy: number
    monthlyEconomy: number
    perYearEconomy: number
    numYears?: number
    numMonths?: number
    isMaxYears?: boolean
} {
    const annualEconomy = gasAnnualCosts - evAnnualCosts
    const monthlyEconomy = gasMonthlyCosts - evMonthlyCosts
    const perYearEconomy = annualEconomy + monthlyEconomy * 12

    if (initialCost !== undefined && initialCost > 0) {
        const maxYears = 50
        const maxNumMonths = maxYears * 12
        let debt = initialCost

        const currentMonth = convertTextToNumber(commonsData.currentMonth, true)
        const annualPaymentsMonth = convertTextToNumber(
            commonsData.annualPaymentsMonth,
            true
        )
        const interestRatePerYear =
            convertTextToNumber(commonsData.interestRatePerYear, true) / 100
        const inflationPerYear =
            convertTextToNumber(commonsData.inflationPerYear, true) / 100
        const montlyRealInterestRate = convertAnnualToMonthly(
            interestRatePerYear - inflationPerYear,
            true
        )

        for (let numMonths = 1; numMonths <= maxNumMonths; numMonths++) {
            const currentMonthCalc = ((currentMonth - 1 + numMonths) % 12) + 1
            const currentYearCalc = Math.floor(numMonths / 12)

            debt *= 1 + montlyRealInterestRate

            debt -= monthlyEconomy

            if (annualPaymentsMonth === currentMonthCalc) debt -= annualEconomy

            if (debt <= 0)
                return {
                    annualEconomy,
                    monthlyEconomy,
                    perYearEconomy,
                    numYears: currentYearCalc,
                    numMonths: numMonths % 12,
                    isMaxYears: false,
                }
        }

        return {
            annualEconomy,
            monthlyEconomy,
            perYearEconomy,
            numYears: maxYears,
            numMonths: 0,
            isMaxYears: true,
        }
    }

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
