import { Pressable, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import colors from 'tailwindcss/colors'

type Props = {
    icon: 'settings-backup-restore' | 'save-alt'
    theme?: 'primary' | 'secondary'
    onPress?: () => void
    width?: string
}

export function IconButton({ icon, theme, onPress, width = 'w-full' }: Props) {
    const pressableDynamicClasses =
        theme === 'secondary'
            ? 'border-sky-700 bg-sky-700/5 active:bg-sky-700/15'
            : 'bg-sky-700 active:bg-sky-700/90 border-transparent'
    const iconColour = theme === 'secondary' ? colors.sky[700] : colors.white

    return (
        <View className={width}>
            <Pressable
                style={{ padding: 8.2 }}
                className={`rounded-2xl flex items-center w-full border ${pressableDynamicClasses}`}
                onPress={onPress}
            >
                <MaterialIcons name={icon} size={23} color={iconColour} />
            </Pressable>
        </View>
    )
}
