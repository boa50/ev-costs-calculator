import { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import colors from 'tailwindcss/colors'

interface Props {
    title?: string
}

export function Header({ title }: Props) {
    return (
        <View className="flex-row h-18 pt-9 pb-3 px-4 bg-gray-300 items-center">
            <Text className="flex-1 text-xl font-medium">{title}</Text>
            <Menu />
        </View>
    )
}

function Menu() {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const handleToggleMenu = () => {
        setIsVisible((prevState) => !prevState)
    }

    return (
        <View>
            <Pressable onPress={handleToggleMenu}>
                <MaterialCommunityIcons
                    name="dots-vertical"
                    size={24}
                    color={colors.gray[800]}
                />
            </Pressable>
            {isVisible && (
                <View className="absolute top-8 -right-3 z-50">
                    <View
                        className="bg-white p-2 shadow-gray-800 shadow-xl rounded-sm self-end mr-2"
                        style={{ width: 102 }}
                    >
                        <MenuItem label="Manage Units" />
                    </View>
                </View>
            )}
        </View>
    )
}

function MenuItem({ label }: { label: string }) {
    return (
        <Pressable
            onPress={() => {
                console.log('Pressed', label)
            }}
        >
            <Text>{label}</Text>
        </Pressable>
    )
}
