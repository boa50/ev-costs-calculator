import { isTextValidNumber } from './isTextValidNumber'

export function convertTextToNumber(text: string): number {
    if (isTextValidNumber(text)) return parseFloat(text.replace(/\,/g, '.'))
    else return NaN
}
