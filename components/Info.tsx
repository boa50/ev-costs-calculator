import { useState } from 'react'
import { Pressable } from 'react-native'
import { Tooltip } from './Tooltip'
import Ionicons from '@expo/vector-icons/Ionicons'
import colors from '@/colors'

interface Props {
    text: string
    iconSize?: number
    color?: string
    tooltipMaxWidth?: number
    layoutPaddingX?: number
    layoutPaddingY?: number
}

export function Info({
    text,
    iconSize = 14,
    color = colors.gray[800],
    tooltipMaxWidth = 200,
    layoutPaddingX,
    layoutPaddingY,
}: Props) {
    const [showTootlip, setShowTooltip] = useState<boolean>(false)

    const handleToggleTooltip = () => setShowTooltip((prevState) => !prevState)

    return (
        <Tooltip
            text={text}
            isOpen={showTootlip}
            maxWidth={tooltipMaxWidth}
            layoutPaddingX={layoutPaddingX}
            layoutPaddingY={layoutPaddingY}
        >
            <Pressable onPress={handleToggleTooltip}>
                <Ionicons
                    name={`${showTootlip ? 'information-circle-sharp' : 'information-circle-outline'}`}
                    size={iconSize}
                    color={color}
                />
            </Pressable>
        </Tooltip>
    )
}
