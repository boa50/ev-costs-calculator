import { useEffect } from 'react'
import { Grid, Row, Col } from '@/components'
import { useFormState } from 'react-hook-form'
import { useLocalStorage } from '@/hooks'
import { FormNumberInput } from './FormNumberInput'
import { FormMonthPicker } from './FormMonthPicker'
import { getUnitAbbreviation, checkTabValidity } from '@/utils'
import type { TabValidStates } from '@/types'

interface Props {
    control: any
    setTabIsValid: (isValid: TabValidStates) => void
}

export default function CommonsForm({ control, setTabIsValid }: Props) {
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
            label="Interest rate per year"
            iconRight="%"
            placeholder="0.00"
            hint="How much you can earn by investing in safe investments"
        />
    )
    const inflationPerYear = (
        <FormNumberInput
            control={control}
            name="commons.inflationPerYear"
            label="Inflation per year"
            iconRight="%"
            placeholder="0.00"
            hint="Average of the forecast of your country inflation for the next years"
        />
    )
    const currentMonth = (
        <FormMonthPicker
            control={control}
            name="commons.currentMonth"
            label="Current month"
        />
    )
    const annualPaymentsMonth = (
        <FormMonthPicker
            control={control}
            name="commons.annualPaymentsMonth"
            label="Annual payments month"
            hint="Month when you must pay annual costs"
        />
    )
    const distanceDrivenPerWeek = (
        <FormNumberInput
            control={control}
            name="commons.distanceDrivenPerWeek"
            label="Distance driven per week"
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
