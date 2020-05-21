import React from "react"
import { Radio, Tooltip, Typography, Input } from 'antd'
import { connect } from 'react-redux'
import styles from 'styled-components'

import { updateNumberProps } from '../../../../store/actions/boardActions'

const { Text } = Typography

const NumberProperites = styles.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`

const UnitContainer = styles.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 20px;
    padding-top: 10px;
`
const FormulaContainer = styles.div`
    display: flex;
    flex-direction: row;
    padding-top: 10px;
`

const ChildContainer = styles.div`
    cursor: pointer;
`

const StyledInput = styles(Input)`
    width: 150px;
    min-width: 150px;
    margin-right: 20px;
`

const NumberModal = ({ children, col, numProps, updateNumberProps }) => {

    const [visible, setVisible] = React.useState(false)
    const [unit, setUnit] = React.useState(numProps.unit)
    const [alignment, setAlignment] = React.useState(numProps.alignment)
    const [customValue, setCustomValue] = React.useState(undefined)
    const [formula, setFormula] = React.useState(numProps.formula)
    const [tooltip, setTooltip] = React.useState(undefined)

    React.useEffect(() => {
        if (!["None", "$", "£", "%"].includes(numProps.unit)) {
            setCustomValue(numProps.unit)
        }
    }, [numProps.unit])

    const onChangeCustom = e => {
        setCustomValue(e.target.value)
        setUnit(e.target.value)
    }

    const onChangeCustomWithEnter = e => {
        setCustomValue(e.target.value)
        setUnit(e.target.value)
        numProps.unit = e.target.value
        updateNumberProps(col, numProps)
    }

    const onChangeUnit = e => {
        setCustomValue('')
        setUnit(e.target.value)
        numProps.unit = e.target.value
        updateNumberProps(col, numProps)
    }

    const onChangeAlignment = e => {
        setAlignment(e.target.value)
        numProps.alignment = e.target.value
        updateNumberProps(col, numProps)
    }

    const onChangeFormula = e => {
        setFormula(e.target.value)
        numProps.formula = e.target.value
        updateNumberProps(col, numProps)
    }

    const customBlur = () => {
        numProps.unit = unit
        updateNumberProps(col, numProps)
    }

    const onClick = () => {
        setVisible(true)
    }

    const overlay = () => {
        console.log('render overlay')

        return (
            <NumberProperites>
                <Text strong level={4}>Unit</Text>
                <UnitContainer>
                    <Radio.Group 
                        defaultValue={numProps.unit} 
                        size="small" 
                        onChange={onChangeUnit}
                        value={numProps.unit}
                    >
                        <Radio.Button value="None">None</Radio.Button>
                        <Radio.Button value="$">$</Radio.Button>
                        <Radio.Button value="£">£</Radio.Button>
                        <Radio.Button value="%">%</Radio.Button>
                    </Radio.Group>

                    <StyledInput 
                        value={customValue}
                        onBlur={customBlur}
                        onChange={onChangeCustom}
                        onPressEnter={onChangeCustomWithEnter}
                        size="small"
                        placeholder="Custom"
                    />

                    <Radio.Group defaultValue={numProps.alignment} size="small" onChange={onChangeAlignment}>
                        <Radio.Button value="L">L</Radio.Button>
                        <Radio.Button value="R">R</Radio.Button>
                    </Radio.Group>

                </UnitContainer>
                <Text strong level={4}>Formula</Text>
                <FormulaContainer>
                    <Radio.Group 
                        defaultValue={numProps.formula} 
                        onChange={onChangeFormula}
                        size="small"
                        value={formula}
                    >
                        <Radio.Button value="None">None</Radio.Button>
                        <Radio.Button value="Sum">Sum</Radio.Button>
                        <Radio.Button value="Average">Average</Radio.Button>
                        <Radio.Button value="Min">Min</Radio.Button>
                        <Radio.Button value="Max">Max</Radio.Button>
                    </Radio.Group>
                </FormulaContainer>
            </NumberProperites>
        )
    };

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
            placement="left"
        >
            <ChildContainer onClick={onClick} >
                {children}
            </ChildContainer>
        </Tooltip>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        updateNumberProps: (col, properties) => dispatch(updateNumberProps(col, properties))
    }
}

const mapStateToProps = state => {
    return{
      board: state.boards.currentBoard
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NumberModal)
