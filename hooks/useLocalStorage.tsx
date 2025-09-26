import { useMMKVString } from 'react-native-mmkv'

type DataFields = 'distance' | 'gasMeasurement' | 'fuelEfficiency'

export function useLocalStorage(key: DataFields) {
    return useMMKVString(key)
}
