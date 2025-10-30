import { useState, useRef, useEffect, useId } from 'react'
import { Pressable, View } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import { useTooltip } from './TooltipContext'
import Ionicons from '@expo/vector-icons/Ionicons'
import colors from '@/colors'

interface Props {
    text: string
    iconSize?: number
    color?: string
}

export function Info({ text, iconSize = 14, color = colors.gray[800] }: Props) {
    const elementId = useId()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { anchorElementId, showTooltip, hideTooltip } = useTooltip()
    const ref = useRef<View>(null)
    const headerHeight = useHeaderHeight()

    const handleToggleTooltip = () => {
        if (isOpen) {
            hideTooltip()
            setIsOpen(false)
        } else {
            showTooltip(text, ref, headerHeight, elementId)
            setIsOpen(true)
        }
    }

    useEffect(() => {
        if (isOpen && anchorElementId !== elementId) setIsOpen(false)
    }, [anchorElementId, elementId, isOpen])

    return (
        <Pressable onPress={handleToggleTooltip} ref={ref}>
            <Ionicons
                name={`${isOpen ? 'information-circle-sharp' : 'information-circle-outline'}`}
                size={iconSize}
                color={color}
            />
        </Pressable>
    )
}
