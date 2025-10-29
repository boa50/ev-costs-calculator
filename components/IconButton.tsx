import { useRef } from 'react'
import { Pressable, View } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import { useTooltip } from './TooltipContext'
import { getViewMeasures } from '@/utils'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import colors from '@/colors'

type Props = {
    icon: 'settings-backup-restore' | 'save-alt'
    theme?: 'primary' | 'secondary'
    onPress?: () => void
    width?: string
    accessibilityText?: string
}

export function IconButton({
    icon,
    theme,
    onPress,
    width = 'w-full',
    accessibilityText,
}: Props) {
    const pressableDynamicClasses =
        theme === 'secondary'
            ? 'border-accent-standard bg-accent-standard/5 active:bg-accent-standard/15'
            : 'bg-accent-standard active:bg-accent-standard/90 border-transparent'
    const iconColour =
        theme === 'secondary' ? colors.icon.dark : colors.icon.light

    const { showTooltipWithTiming } = useTooltip()
    const ref = useRef<View>(null)
    const headerHeight = useHeaderHeight()

    return (
        <View className={width} ref={ref}>
            <Pressable
                style={{ padding: 8.2 }}
                className={`rounded-2xl flex items-center w-full border ${pressableDynamicClasses}`}
                onPress={onPress}
                onLongPress={() =>
                    accessibilityText &&
                    showTooltipWithTiming(
                        accessibilityText,
                        getViewMeasures(ref),
                        headerHeight
                    )
                }
            >
                <MaterialIcons name={icon} size={23} color={iconColour} />
            </Pressable>
        </View>
    )
}
