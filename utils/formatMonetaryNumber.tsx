import { getLocales } from 'expo-localization'

export function formatMonetaryNumber(num: number): string {
    const userLocale = getLocales()
    const numDecimals = num % 1 === 0 ? 0 : 2

    return new Intl.NumberFormat(userLocale[0].languageTag, {
        style: 'currency',
        currency: userLocale[0].currencyCode ?? 'USD',
        minimumFractionDigits: numDecimals,
        maximumFractionDigits: numDecimals,
    }).format(num)
}
