import { Input, Grid, Row, Col, Picker } from '@/components'
import { useLocalStorage } from '@/hooks'
import { getCurrentMonthNumber, getUnitAbbreviation } from '@/utils'
import type { CommonsFormState } from '@/types'

interface Props {
    state: CommonsFormState
    setState: React.Dispatch<React.SetStateAction<CommonsFormState>>
}

export default function CommonsForm({ state, setState }: Props) {
    const distance = getUnitAbbreviation(useLocalStorage('distance')[0] ?? '')
    const changeState = (key: keyof CommonsFormState, value: string) => {
        setState((prevState) => ({ ...prevState, [key]: value }))
    }

    const interestRatePerYear = (
        <Input
            label="Interest rate per year"
            value={state.interestRatePerYear}
            setValue={(value) => changeState('interestRatePerYear', value)}
            iconRight="%"
            placeholder="0.00"
            hint="How much you can earn by investing in safe investments"
        />
    )
    const inflationPerYear = (
        <Input
            label="Inflation per year"
            value={state.inflationPerYear}
            setValue={(value) => changeState('inflationPerYear', value)}
            iconRight="%"
            placeholder="0.00"
            hint="Average of the forecast of your country inflation for the next years"
        />
    )
    const currentMonth = (
        <Picker
            label="Current month"
            type="month"
            value={state.currentMonth}
            setValue={(value) => changeState('currentMonth', value)}
        />
    )
    const annualPaymentsMonth = (
        <Picker
            label="Annual payments month"
            type="month"
            value={state.annualPaymentsMonth}
            setValue={(value) => changeState('annualPaymentsMonth', value)}
            hint="Month when you must pay annual costs"
        />
    )
    const distanceDrivenPerWeek = (
        <Input
            label="Distance driven per week"
            value={state.distanceDrivenPerWeek}
            setValue={(value) => changeState('distanceDrivenPerWeek', value)}
            required={true}
            iconRight={distance}
            placeholder="0"
        />
    )

    return (
        <Grid additionalClasses="gap-3">
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

export function getCommonsInitialState(): CommonsFormState {
    return {
        interestRatePerYear: '',
        inflationPerYear: '',
        currentMonth: getCurrentMonthNumber(),
        annualPaymentsMonth: '1',
        distanceDrivenPerWeek: '',
    }
}
