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
    background-color: ${props => props.color + ';'};
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

    const avatarColors = ['#141b41ff','#306bacff','#6f9cebff','#98b9f2ff','#ED7D3A','#4e6766ff','#5ab1bbff','#a5c882ff',
    '#f7dd72ff','#b66d0dff','#ea526fff','#e76b74ff','#d7af70ff','#937d64ff','#585b56ff','#731dd8ff','#48a9a6ff',
    '#e4dfdaff','#9cf6f6ff','#daa588ff','#f06543ff','#31393cff','#fdca40ff','#f79824ff','#b9d6f2ff','#246eb9ff',
    '#4cb944ff']

    const user = entry.user.displayName
    const date = moment(entry.start).format('ddd MMM DD')
    const timeFrom = moment(entry.start).format('h:mm:ss A')
    const timeTo = moment(entry.end).format('h:mm:ss A')
    const days = _.padStart(moment.duration(entry.duration, 'seconds').days(), 2, '0')
    const hours = _.padStart(moment.duration(entry.duration, 'seconds').hours(), 2, '0')
    const minutes = _.padStart(moment.duration(entry.duration, 'seconds').minutes(), 2, '0')
    const seconds = _.padStart(moment.duration(entry.duration, 'seconds').seconds(), 2, '0')

    return (
        <Container>
            <StyledAvatar 
                size="small"
                color={avatarColors[user.charCodeAt() - 96]}
            >
                {user.charAt(0).toLocaleUpperCase()}
            </StyledAvatar>
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
