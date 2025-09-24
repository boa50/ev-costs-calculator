import { useState, useLayoutEffect, useRef } from 'react'
import { useHeaderHeight } from '@/hooks'
import { Pressable, View, Text, useWindowDimensions } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import colors from 'tailwindcss/colors'

interface Props {
    text: string
    size?: number
    color?: string
}

interface TooltipDimensions {
    height: number
    width: number
}

interface TooltipPosition {
    top?: number
    bottom?: number
    left?: number
    right?: number
}

export function Info({ text, size = 14, color = colors.gray[800] }: Props) {
    const targetRef = useRef<View>(null)
    const [showTootlip, setShowTooltip] = useState<boolean>(false)
    const [tooltipDimensions, setTooltipDimensions] =
        useState<TooltipDimensions>()
    const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>()

    const handleToggleTooltip = () => setShowTooltip((prevState) => !prevState)

    const headerHeight = useHeaderHeight()
    const screenDimensions = useWindowDimensions()

    useLayoutEffect(() => {
        if (tooltipDimensions !== undefined)
            targetRef.current?.measure((x, y, width, height, pageX, pageY) => {
                const tooltipNewPosition = calculateTooltipPosition(
                    tooltipDimensions,
                    pageY,
                    pageX,
                    width,
                    headerHeight,
                    screenDimensions.width
                )

                setTooltipPosition(tooltipNewPosition)
            })
    }, [tooltipDimensions, headerHeight, screenDimensions])

    return (
        <View>
            <Tooltip
                text={text}
                isOpen={showTootlip}
                position={tooltipPosition}
                setTooltipDimensions={setTooltipDimensions}
            />
            <Pressable onPress={handleToggleTooltip} ref={targetRef}>
                <Ionicons
                    name={`${showTootlip ? 'information-circle-sharp' : 'information-circle-outline'}`}
                    size={size}
                    color={color}
                />
            </Pressable>
        </View>
    )
}

interface TooltipProps {
    text: string
    isOpen: boolean
    position?: TooltipPosition
    setTooltipDimensions: React.Dispatch<
        React.SetStateAction<TooltipDimensions | undefined>
    >
}

function Tooltip({
    text,
    isOpen,
    position,
    setTooltipDimensions,
}: TooltipProps) {
    const ref = useRef<View>(null)

    useLayoutEffect(() => {
        ref.current?.measure((x, y, width, height, pageX, pageY) => {
            setTooltipDimensions({ height: height, width: width })
        })
    }, [isOpen, setTooltipDimensions])

    return (
        <View
            ref={ref}
            style={{ ...position, width: 200 }}
            className={`absolute bg-neutral-600 p-2 rounded-sm
                ${isOpen ? 'visible z-50' : 'invisible -z-50'}`}
        >
            <Text className="text-sm text-white">{text}</Text>
        </View>
    )
}

function calculateTooltipPosition(
    tooltipDimensions: TooltipDimensions,
    pageY: number,
    pageX: number,
    width: number,
    headerHeight: number,
    screenWidth: number
): TooltipPosition {
    const tooltipPadding = 18

    const tooltipPosition: TooltipPosition = {
        top: undefined,
        bottom: undefined,
        left: undefined,
        right: undefined,
    }

    if (tooltipDimensions?.height + tooltipPadding < pageY - headerHeight)
        tooltipPosition.bottom = tooltipPadding
    else tooltipPosition.top = tooltipPadding

    tooltipPosition.left = -(
        (tooltipPadding + tooltipDimensions?.width - width) /
        2
    )

    if (-tooltipPosition.left > pageX)
        tooltipPosition.left = -pageX + tooltipPadding / 2
    else if (
        pageX + (tooltipDimensions.width + tooltipPadding) / 2 >
        screenWidth
    ) {
        tooltipPosition.right = -(
            screenWidth -
            (pageX + width) -
            tooltipPadding / 2
        )
        tooltipPosition.left = undefined
    }

    return tooltipPosition
}
