import {
    createContext,
    useState,
    useRef,
    useLayoutEffect,
    useContext,
    type ReactNode,
    type RefObject,
} from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import Animated, { withTiming, useAnimatedStyle } from 'react-native-reanimated'
import { getViewMeasures } from '@/utils'
import type { ComponentMeasures } from '@/types'

type Dimensions = {
    height: number
    width: number
}

type Position = {
    top?: number
    bottom?: number
    left?: number
    right?: number
}

type AnimationsTimeouts = {
    showing?: number
    visible?: number
}

const TooltipContext = createContext<{
    anchorElementId: string | undefined
    showTooltip: (
        msg: string,
        anchorRef: RefObject<View | null>,
        headerHeight: number,
        anchorElementId?: string
    ) => void
    showTooltipWithTiming: (
        msg: string,
        anchorRef: RefObject<View | null>,
        headerHeight: number,
        duration?: number
    ) => void
    hideTooltip: () => void
}>({
    anchorElementId: undefined,
    showTooltip: () => {},
    showTooltipWithTiming: () => {},
    hideTooltip: () => {},
})

export const TooltipProvider = ({ children }: { children: ReactNode }) => {
    const [message, setMessage] = useState<string>('')
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isShowing, setIsShowing] = useState<boolean>(false)
    const [anchorElementId, setAnchorElementId] = useState<string>()
    const [animationsTimeouts, setAnimationsTimeouts] =
        useState<AnimationsTimeouts>()
    const animationDuration = 200

    const [position, setPosition] = useState<Position>()
    const [anchorMeasures, setAnchorMeasures] = useState<ComponentMeasures>()
    const [headerHeight, setHeaderHeight] = useState<number>(0)

    const viewStyle = useAnimatedStyle(() => ({
        opacity: isShowing
            ? withTiming(1, { duration: animationDuration })
            : withTiming(0, { duration: animationDuration / 2 }),
    }))

    const hideTooltip = () => {
        clearTimeout(animationsTimeouts?.showing)
        clearTimeout(animationsTimeouts?.visible)

        setMessage('')
        setIsVisible(false)
        setIsShowing(false)
        setAnchorElementId(undefined)
    }

    const showTooltip = (
        msg: string,
        anchorRef: RefObject<View | null>,
        headerHeight: number,
        anchorElementId?: string
    ) => {
        hideTooltip()

        setMessage(msg)
        const anchorMeasures = getViewMeasures(anchorRef)
        setAnchorMeasures(anchorMeasures)
        setHeaderHeight(headerHeight)

        setIsVisible(true)
        setIsShowing(true)
        setAnchorElementId(anchorElementId)
    }

    const showTooltipWithTiming = (
        msg: string,
        anchorRef: RefObject<View | null>,
        headerHeight: number,
        duration = 1500
    ) => {
        showTooltip(msg, anchorRef, headerHeight)

        const showingTimeoutId = setTimeout(() => {
            setIsShowing(false)
        }, duration)

        const visibleTimeoutId = setTimeout(() => {
            setIsVisible(false)
        }, duration + animationDuration)

        setAnimationsTimeouts((prevState) => ({
            ...prevState,
            showing: showingTimeoutId,
            visible: visibleTimeoutId,
        }))
    }

    const screenDimensions = useWindowDimensions()

    const ref = useRef<View>(null)
    useLayoutEffect(() => {
        if (isVisible) {
            ref.current?.measure((x, y, width, height, pageX, pageY) => {
                const newPosition = calculatePosition(
                    { height, width },
                    anchorMeasures ?? {
                        width: 0,
                        height: 0,
                        pageX: 0,
                        pageY: 0,
                    },
                    headerHeight,
                    screenDimensions.width
                )

                setPosition(newPosition)
            })
        } else {
            setPosition(undefined)
        }
    }, [isVisible, anchorMeasures, screenDimensions, headerHeight])

    const Tooltip = () =>
        isVisible && (
            <Animated.View
                ref={ref}
                className={`absolute z-50 p-2 bg-background-info rounded-sm`}
                style={[viewStyle, { ...position }]}
            >
                <Text className="text-text-light text-sm">{message}</Text>
            </Animated.View>
        )

    return (
        <TooltipContext
            value={{
                anchorElementId,
                showTooltip,
                showTooltipWithTiming,
                hideTooltip,
            }}
        >
            {children}
            <Tooltip />
        </TooltipContext>
    )
}

export const useTooltip = () => useContext(TooltipContext)

function calculatePosition(
    dimensions: Dimensions,
    anchorMeasures: ComponentMeasures,
    headerHeight: number,
    screenWidth: number
): Position {
    const padding = 4

    const {
        width: anchorWidth,
        height: anchorHeight,
        pageX: anchorPageX,
        pageY: anchorPageY,
    } = anchorMeasures

    const position: Position = {
        top: undefined,
        bottom: undefined,
        left: undefined,
        right: undefined,
    }

    const defaultTop = anchorPageY - (dimensions.height + padding)
    const defaultLeft = anchorPageX + anchorWidth / 2 - dimensions.width / 2

    if (defaultTop < headerHeight + padding) {
        position.top = anchorPageY + anchorHeight + padding
    } else {
        position.top = defaultTop
    }

    if (defaultLeft < padding) {
        position.left = padding
    } else if (
        anchorPageX + anchorWidth / 2 + dimensions.width / 2 + padding >
        screenWidth
    ) {
        position.right = padding
    } else {
        position.left = defaultLeft
    }

    return position
}
