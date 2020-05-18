import React from "react"
import { Divider } from 'antd'
import styles from 'styled-components'

import TimerLogEntry from './TimerLogEntry'

const Container = styles.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 15px;
    min-width: 374px;
    padding: 15px;
`
const CurrentLog = styles.div``

const PreviousLogs = styles.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-bottom: 15px;
`
const TimerLogs = ({ entries }) => {

    if (!entries) {
        return null
    }

    return (
        <Container>
            <CurrentLog>
                0000
            </CurrentLog>
            <Divider/>
            <PreviousLogs>
                {entries.map(e => (
                    <TimerLogEntry entry={e}/>
                ))}
            </PreviousLogs>
        </Container>
    )
}

export default TimerLogs
