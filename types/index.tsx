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

export type FormFields =
    | 'ev.buyingCost'
    | 'ev.insurancePerYear'
    | 'ev.taxesPerYear'
    | 'ev.maintenancePerYear'
    | 'ev.batteryAutonomy'
    | 'ev.batteryCapacity'
    | 'ev.electricityPrice'
    | 'gas.buyingCost'
    | 'gas.insurancePerYear'
    | 'gas.taxesPerYear'
    | 'gas.maintenancePerYear'
    | 'gas.fuelEfficiency'
    | 'gas.gasPrice'
    | 'commons.interestRatePerYear'
    | 'commons.inflationPerYear'
    | 'commons.currentMonth'
    | 'commons.annualPaymentsMonth'
    | 'commons.distanceDrivenPerWeek'

export type TabNames = 'ev' | 'gas' | 'commons'
export type TabValidStates = 'valid' | 'invalid' | 'incomplete'
