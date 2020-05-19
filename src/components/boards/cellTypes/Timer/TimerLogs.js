import React from "react"
import { Button, Divider, Typography } from 'antd'
import styles from 'styled-components'

import TimerLogEntry from './TimerLogEntry'

const { Title } = Typography

const Container = styles.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 15px;
    min-width: 374px;
    padding: 15px;
`
const CurrentLog = styles.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`

const PreviousLogs = styles.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 10px;
    margin-bottom: 15px;
    margin-top: 15px;
`

const CurrentTime = styles(Title)`
    margin-bottom: 0px!important;
    margin-top: 0px!important;
`

const TimerLogs = ({ duration, entries }) => {

    return (
        <Container>
            <CurrentLog>
                <Title level={4}>Total duration</Title>
                <CurrentTime level={4}>{duration}</CurrentTime>
            </CurrentLog>
            <Divider/>
            <Button type="dashed" icon="plus">Add entry</Button>
            <PreviousLogs>
                {entries ? entries.map(e => (
                    <TimerLogEntry key={e.id} entry={e}/>
                )) : null}
            </PreviousLogs>
        </Container>
    )
}

export default TimerLogs
