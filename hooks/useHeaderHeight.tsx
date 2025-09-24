import { useHeaderHeight as useHeaderHeightElements } from '@react-navigation/elements'
import { Platform, StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function useHeaderHeight(): number {
    const headerHeight = useHeaderHeightElements()

    const { top } = useSafeAreaInsets()

    return Platform.select({
        ios: headerHeight,
        android: (StatusBar.currentHeight ?? 0) + top,
        default: 0,
    })
}
