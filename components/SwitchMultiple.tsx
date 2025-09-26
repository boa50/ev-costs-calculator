import { useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
import Animated, {
    useSharedValue,
    withSpring,
    withTiming,
    useAnimatedStyle,
} from 'react-native-reanimated'
import colors from 'tailwindcss/colors'

interface Props {
    label: string
    options: string[]
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
    const optionPosition = options.indexOf(value)
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
            <Text className="text-gray-800">{label}</Text>
            <View
                style={{
                    padding: 2,
                    boxShadow: [
                        {
                            offsetX: 0,
                            offsetY: 0,
                            blurRadius: 2,
                            spreadDistance: 0.5,
                            color: colors.gray[400],
                            inset: true,
                        },
                    ],
                }}
                className="rounded-md flex-row bg-gray-300"
            >
                <Animated.View
                    style={{
                        width: btnWidth,
                        margin: 2,
                        transform: [{ translateX }],
                    }}
                    className="absolute h-full rounded-md border border-sky-600 bg-gray-100"
                ></Animated.View>
                {options.map((option) => (
                    <SwitchItem
                        key={option}
                        label={option}
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
    btnWidth: number
    selectedValue: string
    setValue: (value: string) => void
}

function SwitchItem({
    label,
    btnWidth,
    selectedValue,
    setValue,
}: SwitchItemProps) {
    const isSelected = selectedValue === label
    const durationIn = 200
    const durationOut = 50
    const style = useAnimatedStyle(() => ({
        color: isSelected
            ? withTiming(colors.sky[800], { duration: durationIn })
            : withTiming(colors.gray[500], { duration: durationOut }),
        fontWeight: isSelected
            ? withTiming(500, { duration: durationIn })
            : withTiming(400, { duration: durationOut }),
    }))

    return (
        <Pressable onPress={() => setValue(label)}>
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
