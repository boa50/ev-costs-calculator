type BaseVehicle = {
    cost: number
    insurancePerYear: number
    taxesPerYear: number
    maintenancePerYear: number
}

export type ElectricVehicle = BaseVehicle & {
    batteryAutonomy: number
    batteryCapacity: number
    electricityPrice: number
}

export type GasVehicle = BaseVehicle & {
    fuelEfficiency: number
    gasPrice: number
}

type BaseVehicleFormState = {
    cost: string
    insurancePerYear: string
    taxesPerYear: string
    maintenancePerYear: string
}

export type ElectricVehicleFormState = BaseVehicleFormState & {
    batteryAutonomy: string
    batteryCapacity: string
    electricityPrice: string
}

export type GasVehicleFormState = BaseVehicleFormState & {
    fuelEfficiency: string
    gasPrice: string
}

export type CommonsFormState = {
    interestRatePerYear: string
    inflationPerYear: string
    distanceDrivenPerWeek: string
    currentMonth: string
    annualPaymentsMonth: string
}
