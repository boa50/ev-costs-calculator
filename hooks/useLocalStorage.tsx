import { useMMKVString } from 'react-native-mmkv'

type DataFields =
    | 'distance'
    | 'gasMeasurement'
    | 'fuelEfficiency'
    | 'formValues'

export function useLocalStorage(key: DataFields) {
    return useMMKVString(key)
}
