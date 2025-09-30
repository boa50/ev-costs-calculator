export function getUnitAbbreviation(unit: string): string {
    switch (unit) {
        case 'kilometres':
            return 'km'
        case 'miles':
            return 'mi'
        case 'litres':
            return 'L'
        case 'gallons':
            return 'gal'

        default:
            return ''
    }
}
