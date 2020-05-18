import React from "react"
import * as moment from 'moment'
import styles from 'styled-components'
import * as _ from 'lodash'

const Container = styles.div`
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`
const LogLabel = styles.div``

const TimerLogs = ({ entry }) => {

    if (!entry) {
        return null
    }

    return (
        <Container>
            <span>
                <LogLabel>{`${moment(entry.start).format('ddd DD')}`}</LogLabel>
            </span>
            <span>
                <LogLabel>{`${moment(entry.start).format('hh:mm:ss A')} - ${moment(entry.end).format('hh:mm:ss A')}`}</LogLabel>
            </span>
            <span>
                <LogLabel>
                    {`
                        ${_.padStart(moment.duration(entry.duration).days(), 2, '0')}:${_.padStart(moment.duration(entry.duration).hours(), 2, '0')}:${_.padStart(moment.duration(entry.duration).minutes(), 2, '0')}:${_.padStart(moment.duration(entry.duration).seconds(), 2, '0')}
                    `}</LogLabel>
            </span>
        </Container>
    )
}

export default TimerLogs
