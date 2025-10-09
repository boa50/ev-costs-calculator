import type { TabValidStates } from '@/types'

interface Props {
    hasTabErrors: boolean
    isAllRequiredFieldsFilled: boolean
    setTabIsValid: (isValid: TabValidStates) => void
}

export function checkTabValidity({
    hasTabErrors,
    isAllRequiredFieldsFilled,
    setTabIsValid,
}: Props) {
    if (hasTabErrors) {
        setTabIsValid('invalid')
    } else if (!isAllRequiredFieldsFilled) {
        setTabIsValid('incomplete')
    } else {
        setTabIsValid('valid')
    }
}
