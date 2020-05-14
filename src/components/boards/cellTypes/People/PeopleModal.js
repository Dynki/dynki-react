import React from "react"
import { Avatar, Select, Tooltip } from 'antd'
import { connect } from 'react-redux'
import styles from 'styled-components'

import { updateSelectedPeople } from '../../../../store/actions/boardActions'

const { Option } = Select

const PeopleSelector = styles.div`
    display: flex;
    flex-direction: column;
    min-width: 200px;
    padding: 10px;
`


const ChildContainer = styles.div`
    align-items: center;
    border-bottom: solid;
    border-bottom-width: 1px;
    border-bottom-color: #CFD3D7;

    border-right: solid;
    border-right-width: 1px;
    border-right-color: #CFD3D7;

    background-color: #EFF1F3;
    cursor: pointer;

    display: flex;
    flex-direction: row;
    height: 40px;
    justify-content: center;
    min-width: 174px;
`

const StyledAvatar = styles(Avatar)`
    background-color: #3095DE;
    border: solid;
    border-width: 1px;
    border-color: #EFF1F3;

    color: #ffffff;

    position: relative;
    left: ${props => props.offset === 'true' ? '-9px;' : '0px;'}
`

const PeopleModal = ({ groupKey, members, model, rowId, selectedPeople, updateSelectedPeople }) => {

    const [visible, setVisible] = React.useState(false)
    const [selected, setSelectted] = React.useState(selectedPeople ? selectedPeople : [])
    const [options, setOptions] = React.useState(members)
    const [value, setValue] = React.useState(selectedPeople ? selectedPeople.map(s => ({ key: s.uid, label: s.email })) : undefined)
    const [tooltip, setTooltip] = React.useState(undefined)

    const handleChange = values => {
        setValue(values)
        const valuesSelected = members.filter(m => values.map(v => v.key).includes(m.uid))
        setSelectted(valuesSelected)
        updateSelectedPeople(valuesSelected, model, rowId, groupKey)
    }

    const filterMembers = value => {
        setOptions(members.filter(m => m.email.includes(value)))
    }

    const onClick = () => {
        setVisible(true)
    }

    const overlay = () => {
        return (
            <PeopleSelector>
                 <Select
                    autoFocus={true}
                    labelInValue
                    notFoundContent={<div>Nobody here</div>}
                    filterOption={false}
                    mode="multiple"
                    onSearch={filterMembers}
                    onChange={handleChange}
                    placeholder="Search people"
                    style={{ width: '100%' }}
                    value={value}
                >
                    {options.map(d => (
                        <Option key={d.uid}>{d.email}</Option>
                    ))}
                </Select>
            </PeopleSelector>
        )
    }

    const saveTooltip = node => {
        setTooltip(node)
    };

    const onVisibleChange = visible => {
        setVisible(visible)
    };

    return (
        <Tooltip
            visible={visible}
            prefixCls={"ant-popover"}
            overlay={overlay}
            ref={saveTooltip}
            onVisibleChange={onVisibleChange}
            trigger="click"
            placement="bottom"
        >
            <ChildContainer onClick={onClick} >
                {selected.map((p, i) => {
                    return <Tooltip title={p.email} placement="left" key={p.uid}>
                        <StyledAvatar offset={i > 0 ? 'true' : 'false'}>{p.email.charAt(0).toLocaleUpperCase()}</StyledAvatar>
                    </Tooltip>
                })}
            </ChildContainer>
        </Tooltip>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        updateSelectedPeople: (valuesSelected, model, rowId, groupKey) => dispatch(updateSelectedPeople(valuesSelected, model, rowId, groupKey))
    }
}

const mapStateToProps = state => {
    return{
      board: state.boards.currentBoard,
      members: state.teams.currentTeam.members
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleModal)
