import { useEffect } from 'react'
import { View } from 'react-native'
import { useFormState } from 'react-hook-form'
import { useLocalStorage } from '@/hooks'
import { FormNumberInputs } from './FormNumberInputs'
import { FormMonthPicker } from './FormMonthPicker'
import { getUnitAbbreviation, checkTabValidity } from '@/utils'
import { useTranslation } from 'react-i18next'
import type { TabValidStates } from '@/types'
import type { FormNumberInputType } from './FormNumberInput'

interface Props {
    control: any
    setTabIsValid: (isValid: TabValidStates) => void
}

export default function CommonsForm({ control, setTabIsValid }: Props) {
    const { t } = useTranslation()
    const distance = getUnitAbbreviation(useLocalStorage('distance')[0] ?? '')
    const { errors, dirtyFields } = useFormState({
        control,
        name: 'commons',
    })

    const isAllRequiredFieldsFilled = dirtyFields.commons?.distanceDrivenPerWeek

    const hasTabErrors =
        Object.keys(errors).filter((tab) => tab === 'commons').length > 0

    useEffect(() => {
        checkTabValidity({
            hasTabErrors,
            isAllRequiredFieldsFilled,
            setTabIsValid,
        })
    }, [hasTabErrors, isAllRequiredFieldsFilled, setTabIsValid])

    const fields: FormNumberInputType[] = [
        {
            name: 'commons.distanceDrivenPerWeek',
            label: t('form.commons.distanceDrivenPerWeek.label'),
            required: true,
            iconRight: distance,
            placeholder: '0',
        },
        {
            name: 'commons.interestRatePerYear',
            label: t('form.commons.interestRatePerYear.label'),
            iconRight: '%',
            placeholder: '0.00',
            hint: t('form.commons.interestRatePerYear.hint'),
        },
        {
            name: 'commons.inflationPerYear',
            label: t('form.commons.inflationPerYear.label'),
            iconRight: '%',
            placeholder: '0.00',
            hint: t('form.commons.interestRatePerYear.hint'),
        },
    ]

    const currentMonth = (
        <FormMonthPicker
            control={control}
            name="commons.currentMonth"
            label={t('form.commons.currentMonth.label')}
        />
    )
    const annualPaymentsMonth = (
        <FormMonthPicker
            control={control}
            name="commons.annualPaymentsMonth"
            label={t('form.commons.annualPaymentsMonth.label')}
            hint={t('form.commons.annualPaymentsMonth.hint')}
        />
    )

    return (
        <View>
            <FormNumberInputs control={control} fields={fields} />
            {currentMonth}
            <View className="mt-5"></View>
            {annualPaymentsMonth}
            <View className="mt-5"></View>
        </View>
    )
}
