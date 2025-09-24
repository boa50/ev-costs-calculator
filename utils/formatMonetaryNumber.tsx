export function formatMonetaryNumber(num: number): string {
    return num
        .toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
        .replace(/[.,]00$/, '')
}
