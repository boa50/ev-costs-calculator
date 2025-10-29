import { RefObject } from 'react'
import { View } from 'react-native'
import type { ComponentMeasures } from '@/types'

export function getViewMeasures(ref: RefObject<View | null>) {
    let measures: ComponentMeasures = {
        width: 0,
        height: 0,
        pageX: 0,
        pageY: 0,
    }

    ref.current?.measure((x, y, width, height, pageX, pageY) => {
        measures = { width, height, pageX, pageY }
    })

    return measures
}
