import { isTextValidNumber } from './isTextValidNumber'

export function convertTextToNumber(
    text: string,
    convertNanToZero = false
): number {
    if (isTextValidNumber(text)) return parseFloat(text.replace(/\,/g, '.'))
    else if (convertNanToZero) return 0
    else return NaN
}
