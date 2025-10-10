import { useEffect } from 'react'
import { Grid, Row, Col } from '@/components'
import { useFormState } from 'react-hook-form'
import { useLocalStorage } from '@/hooks'
import { FormNumberInput } from './FormNumberInput'
import { FormMonthPicker } from './FormMonthPicker'
import { getUnitAbbreviation, checkTabValidity } from '@/utils'
import { useTranslation } from 'react-i18next'
import type { TabValidStates } from '@/types'

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

    const interestRatePerYear = (
        <FormNumberInput
            control={control}
            name="commons.interestRatePerYear"
            label={t('form.commons.interestRatePerYear.label')}
            iconRight="%"
            placeholder="0.00"
            hint={t('form.commons.interestRatePerYear.hint')}
        />
    )
    const inflationPerYear = (
        <FormNumberInput
            control={control}
            name="commons.inflationPerYear"
            label={t('form.commons.inflationPerYear.label')}
            iconRight="%"
            placeholder="0.00"
            hint={t('form.commons.interestRatePerYear.hint')}
        />
    )
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
    const distanceDrivenPerWeek = (
        <FormNumberInput
            control={control}
            name="commons.distanceDrivenPerWeek"
            label={t('form.commons.distanceDrivenPerWeek.label')}
            required={true}
            iconRight={distance}
            placeholder="0"
        />
    )

    return (
        <Grid>
            <Row>
                <Col>{distanceDrivenPerWeek}</Col>
                <Col>{currentMonth}</Col>
            </Row>

            <Row>
                <Col>{annualPaymentsMonth}</Col>
                <Col>{interestRatePerYear}</Col>
            </Row>
            <Row>
                <Col>{inflationPerYear}</Col>
                <Col></Col>
            </Row>
        </Grid>
    )
}
