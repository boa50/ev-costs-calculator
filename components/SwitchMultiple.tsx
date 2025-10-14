import { useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
import Animated, {
    useSharedValue,
    withSpring,
    withTiming,
    useAnimatedStyle,
} from 'react-native-reanimated'
import colors from '@/colors'

interface Props {
    label: string
    options: { label: string; value: string }[]
    value: string
    setValue: (value: string) => void
    btnWidth?: number
}

export function SwitchMultiple({
    label,
    options,
    value,
    setValue,
    btnWidth = 64,
}: Props) {
    const optionPosition = options.findIndex((option) => option.value === value)
    const translateX = useSharedValue<number>(
        calculateTranslateX(optionPosition, btnWidth)
    )

    useEffect(() => {
        if (optionPosition >= 0)
            translateX.value = withSpring(
                calculateTranslateX(optionPosition, btnWidth)
            )
    }, [optionPosition, translateX, btnWidth])

    return (
        <View className="flex-row gap-4 items-center justify-between">
            <Text className="text-text-dark">{label}</Text>
            <View
                style={{
                    padding: 2,
                    boxShadow: [
                        {
                            offsetX: 0,
                            offsetY: 0,
                            blurRadius: 2,
                            spreadDistance: 0.5,
                            color: colors.gray[300],
                            inset: true,
                        },
                    ],
                }}
                className="rounded-md flex-row bg-gray-200"
            >
                <Animated.View
                    style={{
                        width: btnWidth,
                        margin: 2,
                        transform: [{ translateX }],
                    }}
                    className="absolute h-full rounded-md shadow-lg shadow-shadow bg-gray-100"
                ></Animated.View>
                {options.map((option) => (
                    <SwitchItem
                        key={option.value}
                        label={option.label}
                        value={option.value}
                        btnWidth={btnWidth}
                        selectedValue={value}
                        setValue={setValue}
                    />
                ))}
            </View>
        </View>
    )
}

interface SwitchItemProps {
    label: string
    value: string
    btnWidth: number
    selectedValue: string
    setValue: (value: string) => void
}

function SwitchItem({
    label,
    value,
    btnWidth,
    selectedValue,
    setValue,
}: SwitchItemProps) {
    const isSelected = selectedValue === value
    const durationIn = 200
    const durationOut = 50
    const style = useAnimatedStyle(() => ({
        color: isSelected
            ? withTiming(colors.accent.standard, { duration: durationIn })
            : withTiming(colors.gray[400], { duration: durationOut }),
        fontWeight: isSelected
            ? withTiming(500, { duration: durationIn })
            : withTiming(400, { duration: durationOut }),
    }))

    return (
        <Pressable onPress={() => setValue(value)}>
            <View
                style={{ width: btnWidth }}
                className={`py-1 border rounded-md items-center border-transparent`}
            >
                <Animated.Text style={style}>{label}</Animated.Text>
            </View>
        </Pressable>
    )
}

function calculateTranslateX(position: number, btnWidth: number) {
    return position * btnWidth
}
