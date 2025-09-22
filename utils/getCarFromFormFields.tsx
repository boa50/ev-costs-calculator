import { convertTextToNumber } from './convertTextToNumber'
import type {
    ElectricVehicle,
    ElectricVehicleFormState,
    GasVehicle,
    GasVehicleFormState,
} from '@/types'

export function getElectricVehicleFromForm(
    formValues: ElectricVehicleFormState
): ElectricVehicle {
    return {
        cost: convertTextToNumber(formValues.cost),
        insurancePerYear: convertTextToNumber(formValues.insurancePerYear),
        taxesPerYear: convertTextToNumber(formValues.taxesPerYear),
        maintenancePerYear: convertTextToNumber(formValues.maintenancePerYear),
        batteryAutonomy: convertTextToNumber(formValues.batteryAutonomy),
        batteryCapacity: convertTextToNumber(formValues.batteryCapacity),
        electricityPrice: convertTextToNumber(formValues.electricityPrice),
    }
}

export function getGasVehicleFromForm(
    formValues: GasVehicleFormState
): GasVehicle {
    return {
        cost: convertTextToNumber(formValues.cost),
        insurancePerYear: convertTextToNumber(formValues.insurancePerYear),
        taxesPerYear: convertTextToNumber(formValues.taxesPerYear),
        maintenancePerYear: convertTextToNumber(formValues.maintenancePerYear),
        autonomy: convertTextToNumber(formValues.autonomy),
        gasPrice: convertTextToNumber(formValues.gasPrice),
    }
}
