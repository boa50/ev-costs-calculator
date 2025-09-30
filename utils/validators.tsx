export function isInputNumberValid(inputValue: string): boolean {
    const regex = /^\d+[\.\,]?\d*$/
    return regex.test(inputValue)
}
