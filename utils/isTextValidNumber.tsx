export function isTextValidNumber(text: string): boolean {
    const regex = /^\d{1,10}$|(?=^.{1,10}$)^\d+[\.\,]\d{0,2}$/g
    return regex.test(text)
}
