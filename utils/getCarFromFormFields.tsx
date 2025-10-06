import { convertTextToNumber } from './convertTextToNumber'
import type { ElectricVehicle, GasVehicle, FormValues } from '@/types'

export function getElectricVehicleFromForm(
    formValues: FormValues
): ElectricVehicle {
    const evFormValues = formValues.ev
    const vehicle: any = {}

    Object.entries(evFormValues).forEach(([key, value]) => {
        vehicle[key] = convertTextToNumber(value, true)
    })

    return vehicle
}

export function getGasVehicleFromForm(formValues: FormValues): GasVehicle {
    const gasFormValues = formValues.gas
    const vehicle: any = {}

    Object.entries(gasFormValues).forEach(([key, value]) => {
        vehicle[key] = convertTextToNumber(value, true)
    })

    return vehicle
}
