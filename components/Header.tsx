import { useState } from 'react'
import { useRouter } from 'expo-router'
import { View, Text, Pressable } from 'react-native'
import { useTranslation } from 'react-i18next'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import colors from '@/colors'

interface Props {
    title?: string
    routeName: string
}

export function Header({ title, routeName }: Props) {
    const router = useRouter()
    const isIndex = routeName === 'index'

    return (
        <View className="flex-row h-20 pt-9 pb-3 px-4 bg-accent-standard items-center">
            {router.canGoBack() && (
                <Pressable onPress={router.back} className="mr-2 -ml-1">
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={24}
                        color={colors.icon.light}
                    />
                </Pressable>
            )}
            <Text className="flex-1 text-text-light text-xl font-medium">
                {title}
            </Text>
            {isIndex && <Menu />}
        </View>
    )
}

function Menu() {
    const { t } = useTranslation()

    const [isVisible, setIsVisible] = useState<boolean>(false)

    const handleToggleMenu = () => {
        setIsVisible((prevState) => !prevState)
    }
    const handleHideMenu = () => {
        setIsVisible(false)
    }

    return (
        <View>
            <Pressable onPress={handleToggleMenu}>
                <MaterialCommunityIcons
                    name="dots-vertical"
                    size={24}
                    color={colors.icon.light}
                />
            </Pressable>
            {isVisible && (
                <View className="absolute top-8 -right-3 z-50">
                    <View
                        className="bg-background-card p-2 shadow-shadow shadow-xl rounded-sm self-end mr-2"
                        style={{ width: 102 }}
                    >
                        <MenuItem
                            label={t('menu.manageUnits')}
                            pathname="/manageUnits"
                            handleHideMenu={handleHideMenu}
                        />
                    </View>
                </View>
            )}
        </View>
    )
}

function MenuItem({
    label,
    pathname,
    handleHideMenu,
}: {
    label: string
    pathname: '/manageUnits'
    handleHideMenu: () => void
}) {
    const router = useRouter()

    return (
        <Pressable
            onPress={() => {
                router.navigate(pathname)
                handleHideMenu()
            }}
        >
            <Text className="text-text-dark">{label}</Text>
        </Pressable>
    )
}
