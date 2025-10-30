import { useState, useCallback } from 'react'
import {
    View,
    Pressable,
    Text,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import colors from '@/colors'

interface Props {
    label?: string
    options: { label: string; value: string }[]
    value: string
    setValue: (value: string) => void
}

export function MinimalPicker({ label, options, value, setValue }: Props) {
    const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false)
    const [localValue, setLocalValue] = useState<string>(value)

    const highlightProgress = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor =
            highlightProgress.value === 1 ? colors.gray[100] : 'transparent'
        return {
            backgroundColor: withTiming(backgroundColor, { duration: 300 }),
        }
    })

    const closeOptionsView = useCallback(() => {
        setIsOptionsVisible(false)
    }, [])

    const handleCancel = useCallback(() => {
        closeOptionsView()
        setLocalValue(value)
    }, [value, closeOptionsView])

    const handleOk = useCallback(() => {
        closeOptionsView()
        setValue(localValue)
    }, [localValue, setValue, closeOptionsView])

    return (
        <View>
            <Pressable
                onPress={() => setIsOptionsVisible(true)}
                onPressIn={() => (highlightProgress.value = 1)}
                onPressOut={() => (highlightProgress.value = 0)}
            >
                <Animated.View className="gap-px p-2" style={animatedStyle}>
                    <Text className="text-text-dark text-md">{label}</Text>
                    <Text className="text-text-dark-faded text-sm">
                        {value}
                    </Text>
                </Animated.View>
            </Pressable>
            <Modal
                transparent={true}
                visible={isOptionsVisible}
                animationType="none"
            >
                <TouchableWithoutFeedback onPress={closeOptionsView}>
                    <View className="flex-1 justify-center items-center bg-shadow/25">
                        <TouchableWithoutFeedback>
                            <View className="bg-background-card p-4 rounded-lg min-w-52">
                                <View>
                                    <Text className="font-medium text-xl mb-3 text-text-dark">
                                        {label}
                                    </Text>
                                </View>
                                <View className="gap-3">
                                    {options.map((option) => (
                                        <View key={option.value}>
                                            <Pressable
                                                className="flex-row gap-3 items-center"
                                                onPress={() =>
                                                    setLocalValue(option.value)
                                                }
                                            >
                                                <MaterialCommunityIcons
                                                    name={
                                                        localValue ===
                                                        option.value
                                                            ? 'circle-slice-8'
                                                            : 'circle-outline'
                                                    }
                                                    size={20}
                                                    color={
                                                        localValue ===
                                                        option.value
                                                            ? colors.accent
                                                                  .standard
                                                            : colors.text[
                                                                  'dark-faded'
                                                              ]
                                                    }
                                                />
                                                <Text className="text-text-dark">
                                                    {option.label}
                                                </Text>
                                            </Pressable>
                                        </View>
                                    ))}
                                </View>
                                <View className="flex-row gap-3 justify-end mt-4">
                                    <Pressable onPress={handleCancel}>
                                        <Text className="text-accent-standard font-medium">
                                            Cancel
                                        </Text>
                                    </Pressable>
                                    <Pressable onPress={handleOk}>
                                        <Text className="text-accent-standard font-medium">
                                            Ok
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}
