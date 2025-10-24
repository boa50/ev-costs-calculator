import { useState, useContext } from 'react'
import { AdsContext } from './ads/AdsContext'
import { useRouter } from 'expo-router'
import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ControlOutsideClick } from './ControlOutsideClick'
import colors from '@/colors'

interface Props {
    title?: string
    routeName: string
}

export function Header({ title, routeName }: Props) {
    const router = useRouter()
    const isIndex = routeName === 'index'

    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false)

    const handleToggleMenu = () => {
        setIsMenuVisible((prevState) => !prevState)
    }
    const handleHideMenu = () => {
        setIsMenuVisible(false)
    }

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
                {isIndex && <MenuIcon handleToggleMenu={handleToggleMenu} />}
            </View>
            {isMenuVisible && <MenuIems handleHideMenu={handleHideMenu} />}
            <ControlOutsideClick
                isVisible={isMenuVisible}
                onPress={handleHideMenu}
                zIndex={40}
            />
        </SafeAreaView>
    )
}

function MenuIcon({ handleToggleMenu }: { handleToggleMenu: () => void }) {
    return (
        <Pressable onPress={handleToggleMenu}>
            <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color={colors.icon.light}
            />
        </Pressable>
    )
}

function MenuIems({ handleHideMenu }: { handleHideMenu: () => void }) {
    const { showPrivacyOptions, formAvailable } = useContext(AdsContext)
    const { t } = useTranslation()

    return (
        <View>
            <View
                className="absolute -top-1 self-end z-50 
                    bg-background-card p-2 shadow-shadow shadow-xl rounded-sm 
                    mr-4 gap-1 max-w-2/5"
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
                            handleHideMenu()
                        }}
                    >
                        <Text>{t('menu.configurePrivacy')}</Text>
                    </TouchableOpacity>
                )}
            </View>
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
            <Text
                className="text-text-dark"
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}
