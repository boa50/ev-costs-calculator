import { useState, useContext } from 'react'
import { AdsContext } from './ads/AdsContext'
import { useRouter } from 'expo-router'
import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@/colors'

interface Props {
    title?: string
    routeName: string
}

export function Header({ title, routeName }: Props) {
    const router = useRouter()
    const isIndex = routeName === 'index'

    return (
        <SafeAreaView className="bg-accent-standard" edges={{ top: 'maximum' }}>
            <View className="flex-row items-end py-3 px-4">
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
        </SafeAreaView>
    )
}

function Menu() {
    const { showPrivacyOptions, formAvailable } = useContext(AdsContext)
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
                        className="bg-background-card p-2 shadow-shadow shadow-xl rounded-sm self-end mr-2 gap-1"
                        style={{ width: 102 }}
                    >
                        <MenuItem
                            label={t('menu.manageUnits')}
                            pathname="/manageUnits"
                            handleHideMenu={handleHideMenu}
                        />

                        {/* Manage Ads Consentment */}
                        {formAvailable && (
                            <TouchableOpacity
                                onPress={() => {
                                    showPrivacyOptions()
                                    setIsVisible(false)
                                }}
                            >
                                <Text>Configure Privacy</Text>
                            </TouchableOpacity>
                        )}
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
        <TouchableOpacity
            onPress={() => {
                router.navigate(pathname)
                handleHideMenu()
            }}
        >
            <Text className="text-text-dark">{label}</Text>
        </TouchableOpacity>
    )
}
