type BaseVehicle = {
    buyingCost: number
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

type EvFields =
    | 'buyingCost'
    | 'insurancePerYear'
    | 'taxesPerYear'
    | 'maintenancePerYear'
    | 'batteryAutonomy'
    | 'batteryCapacity'
    | 'electricityPrice'

type GasFields =
    | 'buyingCost'
    | 'insurancePerYear'
    | 'taxesPerYear'
    | 'maintenancePerYear'
    | 'fuelEfficiency'
    | 'gasPrice'

export type CommonsFields =
    | 'interestRatePerYear'
    | 'inflationPerYear'
    | 'currentMonth'
    | 'annualPaymentsMonth'
    | 'distanceDrivenPerWeek'

export type FormValues = {
    ev: {
        [key in EvFields]: string
    }
    gas: {
        [key in GasFields]: string
    }
    commons: {
        [key in CommonsFields]: string
    }
}

export type Costs = {
    annual: number
    monthly: number
    perYear: number
}
export type Economy = Costs & {
    numYears: number | undefined
    numMonths: number | undefined
    isMaxYears: boolean | undefined
}

export type ComponentMeasures = {
    width: number
    height: number
    pageX: number
    pageY: number
}
