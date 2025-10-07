export function showNumberSingularOrPlural(
    num: number,
    singular: string,
    plural: string
): string {
    if (num === 1) return `${num} ${singular}`
    else return `${num} ${plural}`
}
