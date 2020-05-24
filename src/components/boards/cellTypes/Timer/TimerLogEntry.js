import React from "react"
import * as moment from 'moment'
import styles from 'styled-components'
import { Avatar, Icon, Popconfirm, Typography, Tooltip } from 'antd'
import * as _ from 'lodash'

const { Text } = Typography

const Container = styles.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 50px;
    justify-content: space-between;
    width: 460px;
`
const LogLabel = styles(Text)`
    // margin: 10px!important;
`

const StyledAvatar = styles(Avatar)`
    // margin-right: 10px;
`

const DeleteIcon = styles(Icon)`
    font-size: 21px;
    margin-left: 20px;

    & svg {
        fill: #FF4D4F;
    }
`

const ActiveIcon = styles(Icon)`
    font-size: 21px;
    margin-left: 20px;

    & svg {
        fill: #CFD3D7;
    }
`


const TimerLogs = ({ entry, onDelete }) => {

    if (!entry) {
        return null
    }

    const date = moment(entry.start).format('ddd MMM DD')
    const timeFrom = moment(entry.start).format('h:mm:ss A')
    const timeTo = moment(entry.end).format('h:mm:ss A')
    const days = _.padStart(moment.duration(entry.duration, 'seconds').days(), 2, '0')
    const hours = _.padStart(moment.duration(entry.duration, 'seconds').hours(), 2, '0')
    const minutes = _.padStart(moment.duration(entry.duration, 'seconds').minutes(), 2, '0')
    const seconds = _.padStart(moment.duration(entry.duration, 'seconds').seconds(), 2, '0')

    return (
        <Container>
            <StyledAvatar size="small">A</StyledAvatar>
            <LogLabel>{date}</LogLabel>
            <LogLabel>{`${timeFrom} - ${timeTo === 'Invalid date' ? 'Still running ' : timeTo}`}</LogLabel>
            <LogLabel>{`${days === '00' ? '' : days+':'}${hours}:${minutes}:${seconds}`}</LogLabel>
            <Popconfirm 
                title="Delete entry?" 
                cancelText="Arrrg no!" 
                okText="Yes please" 
                placement="leftTop" 
                onConfirm={() => onDelete(entry.id)}>
                <DeleteIcon type="close-circle"/>
            </Popconfirm>
        </Container>
    )
}

export default TimerLogs
