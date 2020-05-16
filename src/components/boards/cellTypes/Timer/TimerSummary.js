import React from 'react'
import styles from 'styled-components'
import * as moment from 'moment'
import { Typography } from 'antd'

const { Text } = Typography

const Total = styles.div`
    align-items: center;
    background-color: #EFF1F3;

    border: solid;
    border-width: 1px;
    border-color: #CFD3D7;

    border-right: ${props => props.hasNext ? 'none;' : 'solid;'}
    border-right-width: 1px;
    border-right-color: #CFD3D7;

    border-top: solid;
    border-top-width: 1px;
    border-top-color: #CFD3D7;

    display: flex;    
    flex: 0 1;
    flex-direction: column;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    height: 44px;
    min-width: 174px;
    max-width: 174px;
    padding: 5px;
    margin-right: ${props => props.isLast ? '36px;' : '0px;'}
    width: 174px;
`

const TotalValue = styles.div`
    text-align: center;
    width: 100%;
`

const TotalLabel = styles.div`
    font-size: 12px;
    font-weight: normal;
    text-align: center;
    width: 100%;
`

const TimerSummary = ({ column, entities = [], hasNext, isLast, updated }) => {

    const [hours, setHours] = React.useState(undefined)
    const [minutes, setMinutes] = React.useState(undefined)
    const [seconds, setSeconds] = React.useState(undefined)
    
    const sumDuration = () => {
        return entities.reduce((acc, grp) => {
            if (grp[column.model]) {
                return acc + grp[column.model].totalDuration
            }

            return acc
        }, 0)
    }

    let displayValue = ''

    React.useEffect(() => {
        const duration = moment.duration(sumDuration())
    
        setMinutes(duration.minutes())
        setHours(duration.hours())
        setSeconds(duration.seconds())
    }, [updated])

    const returnEl = entities.length > 0 ? (
        <Total hasNext={hasNext} isLast={isLast}>
            <TotalValue>
                <Text strong>{`${hours ? hours+'h' : ''} ${minutes ? minutes+'m' : '0m'} ${seconds ? seconds+'s' : '0s'}`}</Text>
            </TotalValue>
            <TotalLabel>
                Total
            </TotalLabel>
        </Total>
    ) : null

    return returnEl
}

export default TimerSummary
