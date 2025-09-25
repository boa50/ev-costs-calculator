import { useMMKVString } from 'react-native-mmkv'

type DataFields = 'test' | 'test2'

export function useLocalStorage(key: DataFields) {
    return useMMKVString(key)
}
