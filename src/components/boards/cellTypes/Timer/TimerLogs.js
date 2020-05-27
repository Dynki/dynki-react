import React, { useCallback, useEffect } from "react"
import { Button, Divider, Pagination, Popconfirm, Typography } from 'antd'
import styles from 'styled-components'

import TimerLogEntry from './TimerLogEntry'

const { Text, Title } = Typography

const StyledPopconfirm = styles(Popconfirm)`
    margin-left: auto;
`
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
    max-height: ${props => (props.pageSize * 45 )+'px;'}
`

const CurrentTime = styles(Title)`
    margin-bottom: 0px!important;
    margin-top: 5px!important;
`

const TimerLogs = ({ duration, entries, onDeleteAll, onDeleteEntry }) => {

    const [page, setPage] = React.useState(1)
    const [pageSize, setPageSize] = React.useState(5)
    const [total, setTotal] = React.useState(entries.length)

    useEffect(() => { 
        setTotal(entries.length)
    }, [entries])

    const onPageChange = useCallback((page, pageSize) => setPage(page))
    const onPageSizeChange = useCallback((current, size) => {
        setPageSize(size)
        setPage(1)
    })

    return (
        <Container>
            <StyledPopconfirm title="Clear all logs for all users?" okText="Yes please" onConfirm={onDeleteAll}>
                <Button type="link">Clear All</Button>
            </StyledPopconfirm>
            <CurrentLog>
                <Text>Total duration</Text>
                <CurrentTime level={4}>{duration}</CurrentTime>
            </CurrentLog>
            <Divider/>
            {/* <Button type="dashed" icon="plus">Add entry</Button> */}
            <PreviousLogs pageSize={pageSize}>
                {entries ? entries.slice((page-1) * pageSize, page * pageSize).map(e => (
                    <TimerLogEntry key={e.id} entry={e} onDelete={onDeleteEntry}/>
                )) : null}
            </PreviousLogs>
            <Pagination 
                current={page}
                defaultPageSize={5}
                onChange={onPageChange}
                onShowSizeChange={onPageSizeChange}
                pageSizeOptions={['5', '10', '25', '50']}
                showSizeChanger 
                size="small" 
                total={total} 
            />
        </Container>
    )
}

export default TimerLogs
