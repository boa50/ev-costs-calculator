import { useState, useLayoutEffect, useRef, type ReactNode } from 'react'
import { useHeaderHeight } from '@/hooks'
import { View, Text, useWindowDimensions } from 'react-native'

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

interface Props {
    text: string
    isOpen: boolean
    maxWidth: number
    layoutPaddingX?: number
    layoutPaddingY?: number
    children: ReactNode
}

export function Tooltip({
    text,
    isOpen,
    maxWidth,
    layoutPaddingX,
    layoutPaddingY,
    children,
}: Props) {
    const ref = useRef<View>(null)
    const childrenRef = useRef<View>(null)
    const [dimensions, setDimensions] = useState<Dimensions>()
    const [position, setPosition] = useState<Position>()

    const headerHeight = useHeaderHeight()
    const screenDimensions = useWindowDimensions()

    useLayoutEffect(() => {
        if (dimensions !== undefined) {
            if (childrenRef !== undefined) {
                childrenRef.current?.measure(
                    (x, y, width, height, pageX, pageY) => {
                        const newPosition = calculatePosition(
                            dimensions,
                            pageY - (layoutPaddingY ?? 0),
                            pageX - (layoutPaddingX ?? 0),
                            width,
                            headerHeight,
                            screenDimensions.width
                        )

                        setPosition(newPosition)
                    }
                )
            } else {
                const newPosition = calculatePosition(
                    dimensions,
                    0 - (layoutPaddingY ?? 0),
                    0 - (layoutPaddingX ?? 0),
                    0,
                    headerHeight,
                    screenDimensions.width
                )

                setPosition(newPosition)
            }
        }
    }, [
        dimensions,
        headerHeight,
        screenDimensions,
        layoutPaddingX,
        layoutPaddingY,
    ])

    useLayoutEffect(() => {
        ref.current?.measure((x, y, width, height, pageX, pageY) => {
            setDimensions({ height: height, width: width })
        })
    }, [isOpen, setDimensions])

    return (
        <View style={{ width: '100%' }}>
            <View
                ref={ref}
                style={{ ...position, maxWidth: maxWidth }}
                className={`absolute bg-background-info p-2 rounded-sm
                ${isOpen ? 'visible z-50' : 'invisible -z-50'}`}
            >
                <Text className="text-sm text-text-light">{text}</Text>
            </View>
            <View ref={childrenRef} style={{ alignSelf: 'flex-start' }}>
                {children}
            </View>
        </View>
    )
}

function calculatePosition(
    dimensions: Dimensions,
    pageY: number,
    pageX: number,
    width: number,
    headerHeight: number,
    screenWidth: number
): Position {
    const padding = 18

    const position: Position = {
        top: undefined,
        bottom: undefined,
        left: undefined,
        right: undefined,
    }

    if (dimensions?.height + padding < pageY - headerHeight)
        position.bottom = padding
    else position.top = padding

    position.left = -((padding + dimensions?.width - width) / 2)

    if (-position.left > pageX) position.left = -pageX + padding / 2
    else if (pageX + (dimensions.width + padding) / 2 > screenWidth) {
        position.right = -(screenWidth - (pageX + width) - padding / 2)
        position.left = undefined
    }

    return position
}
