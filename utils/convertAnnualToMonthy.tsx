export function convertAnnualToMonthly(
    value: number,
    isPercentage?: boolean
): number {
    if (isPercentage) return (1 + value) ** (1 / 12) - 1
    else return value / 12
}
