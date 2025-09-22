import { convertTextToNumber } from './convertTextToNumber'
import type { ElectricVehicle, ElectricVehicleFormState } from '@/types'

export function getElectricVehicleFromFormFields(
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
