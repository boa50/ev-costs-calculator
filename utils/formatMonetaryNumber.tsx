export function formatMonetaryNumber(num: number): string {
    return num.toFixed(2).replace(/[.,]00$/, '')
}
