import { Input, Grid, Row, Col } from '@/components'
import type { CommonsFormState } from '@/types'

interface Props {
    state: CommonsFormState
    setState: React.Dispatch<React.SetStateAction<CommonsFormState>>
}

export default function CommonsForm({ state, setState }: Props) {
    const changeState = (key: keyof CommonsFormState, value: string) => {
        setState((prevState) => ({ ...prevState, [key]: value }))
    }

    return (
        <Grid>
            <Row>
                <Col>
                    <Input
                        label="Interest rate per year"
                        value={state.interestRatePerYear}
                        setValue={(value) =>
                            changeState('interestRatePerYear', value)
                        }
                        iconRight="%"
                        placeholder="0.00"
                    />
                </Col>
                <Col>
                    <Input
                        label="Inflation per year"
                        value={state.inflationPerYear}
                        setValue={(value) =>
                            changeState('inflationPerYear', value)
                        }
                        iconRight="%"
                        placeholder="0.00"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input
                        label="Current month"
                        value={state.currentMonth}
                        setValue={(value) => changeState('currentMonth', value)}
                    />
                </Col>
                <Col>
                    <Input
                        label="Annual payments month"
                        value={state.annualPaymentsMonth}
                        setValue={(value) =>
                            changeState('annualPaymentsMonth', value)
                        }
                    />
                </Col>
            </Row>

            <Input
                label="Distance driven per week"
                value={state.distanceDrivenPerWeek}
                setValue={(value) =>
                    changeState('distanceDrivenPerWeek', value)
                }
                iconRight="km"
                placeholder="0"
            />
        </Grid>
    )
}
