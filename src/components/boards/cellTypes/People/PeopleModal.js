import React from "react"
import { Avatar, Select, Tooltip } from 'antd'
import { connect } from 'react-redux'
import styles from 'styled-components'

import { updateSelectedPeople } from '../../../../store/actions/boardActions'

const { Option } = Select

const PeopleSelector = styles.div`
    display: flex;
    flex-direction: column;
    min-width: 300px;
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

const AvatarsContainer = styles.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const InlineAvatar = styles(Avatar)`
    background-color: ${props => props.color + ';'};
    border: solid;
    border-width: 1px;
    border-color: #EFF1F3;

    color: #ffffff;

    margin-right: 5px;
`

const StyledAvatar = styles(Avatar)`
    background-color: ${props => props.color + ';'};
    border: solid;
    border-width: 1px;
    border-color: #EFF1F3;

    color: #ffffff;

    position: relative;
    ${props => props.idx === 0 ? 'margin-left: auto;' : ''}
    left: ${props => props.offset === 'true' ? `-${9 * props.idx}px;` : '0px;'}
`

const StyledOption = styles(Option)`
    height: 100px;
    
    .ant-select-selection__choice__content {
        min-height: 100px;
    }
`

const StyledSelect = styles(Select)`
    
    & li {
        height: 35px!important;
        line-height: 31px!important;
    }

    & .ant-select-selection__placeholder {
        margin-top: -4px!important; 
    }
`

const PeopleModal = ({ groupKey, members, model, rowId, selectedPeople, updateSelectedPeople }) => {

    const avatarColors = ['#141b41ff','#306bacff','#6f9cebff','#98b9f2ff','#ED7D3A','#4e6766ff','#5ab1bbff','#a5c882ff',
        '#f7dd72ff','#b66d0dff','#ea526fff','#e76b74ff','#d7af70ff','#937d64ff','#585b56ff','#731dd8ff','#48a9a6ff',
        '#e4dfdaff','#9cf6f6ff','#daa588ff','#f06543ff','#31393cff','#fdca40ff','#f79824ff','#b9d6f2ff','#246eb9ff',
        '#4cb944ff']


    const [visible, setVisible] = React.useState(false)
    const [selected, setSelected] = React.useState(selectedPeople ? selectedPeople : [])
    const [options, setOptions] = React.useState(members)
    const [value, setValue] = React.useState(selectedPeople ? selectedPeople.map(s => ({ key: s.uid, label: s.email })) : undefined)
    const [tooltip, setTooltip] = React.useState(undefined)

    React.useEffect(() => {
        setSelected(selectedPeople ? selectedPeople : [])
        setValue(selectedPeople ? selectedPeople.map(s => ({ key: s.uid, label: s.email })) : undefined)
    }, [selectedPeople])

    const handleChange = values => {
        setValue(values)
        const valuesSelected = members.filter(m => values.map(v => v.key).includes(m.uid))
        setSelected(valuesSelected)
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
                 <StyledSelect
                    // autoFocus={true}
                    filterOption={false}
                    labelInValue
                    mode="multiple"
                    notFoundContent={<div>Nobody here</div>}
                    onSearch={filterMembers}
                    onChange={handleChange}
                    placeholder="Search people"
                    style={{ width: '100%' }}
                    value={value}
                >
                    {options.map(d => (
                        <StyledOption key={d.uid}>
                            <InlineAvatar 
                                size="small" 
                                color={avatarColors[d.email.charCodeAt() - 96]}
                            >
                                {d.email.charAt(0).toLocaleUpperCase()}
                            </InlineAvatar>
                            {d.email}
                        </StyledOption>
                    ))}
                </StyledSelect>
            </PeopleSelector>
        )
    }

    const saveTooltip = node => {
        setTooltip(node)
    };

    const onVisibleChange = visible => {
        setVisible(visible)
    };

    const avatarsToDisplay = selected.slice(0, 5)

    return (
        <Tooltip
            visible={visible}
            prefixCls={"ant-popover"}
            overlay={overlay}
            ref={saveTooltip}
            onVisibleChange={onVisibleChange}
            trigger="click"
            placement="bottomLeft"
        >
            <ChildContainer onClick={onClick} >
                <AvatarsContainer>
                    <div style={{ 'minWidth': `${(avatarsToDisplay.length-1) * 5}px` }}/>
                    {avatarsToDisplay.slice(0,4).map((p, i) => {
                        return <Tooltip title={p.email} placement="left" key={p.uid}>
                            <StyledAvatar 
                                color={avatarColors[p.email.charCodeAt() - 96]}
                                offset={i > 0 ? 'true' : 'false'}
                                idx={i}
                            >
                                {p.email.charAt(0).toLocaleUpperCase()}
                            </StyledAvatar>
                        </Tooltip>
                    })}
                    {avatarsToDisplay.length > 4 ? 
                        <Tooltip title="More than 4 people selected" placement="left" key="endofavatars">
                        <StyledAvatar 
                            color={'#CCCCCC'}
                            offset={'true'}
                            idx={4}
                            size="small"
                        >
                            +
                        </StyledAvatar>
                    </Tooltip>
                    : null}
                </AvatarsContainer>
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
