import type { ElectricVehicle } from '@/types'

export function calculateCosts(
    car: ElectricVehicle,
    distanceDrivenPerWeek: number
): { annualCosts: number; monthlyCosts: number } {
    const weeksPerMonth = 365 / 12 / 7

    let annualCosts = 0
    let monthlyCosts = 0

    if (Object.hasOwn(car, 'batteryAutonomy')) {
        annualCosts = car.taxesPerYear + car.insurancePerYear

        const distanceCost =
            (car.electricityPrice * car.batteryCapacity) / car.batteryAutonomy
        const monthlyDrivingCost =
            distanceCost * distanceDrivenPerWeek * weeksPerMonth

        monthlyCosts = monthlyDrivingCost + yearToMonth(car.maintenancePerYear)
    }

    return { annualCosts, monthlyCosts }
}

function yearToMonth(value: number, isPercentage?: boolean): number {
    if (isPercentage) return (1 + value) ** (1 / 12) - 1
    else return value / 12
}
