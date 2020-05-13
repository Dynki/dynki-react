import React from 'react'
import { InputNumber } from 'antd'
import styles from 'styled-components'
import useOutsideClick from '../../../../hooks/ClickOutside'

const StyledInputNumber = styles(InputNumber)`
    border-radius: 0px;
    height: 100%;
    width: 174px;

    input {
        border-radius: 0px;
        height: 38px;
        text-align: center;
    }
`

const NumberLabel = styles.div`
    align-items: center;
    background-color: #EFF1F3;
    border-bottom: solid;
    border-bottom-width: 1px;
    border-bottom-color: #CFD3D7;
    border-right: solid;
    border-right-width: 1px;
    border-right-color: #CFD3D7;
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 100%;
    width: 174px;
`

const Container = styles.div`
    height: 100%;
    width: 100%;
`

const NumberForm = ({ allowWrite, board, col, groupKey, modelName, numberProps, onUpdateBoard, rowId }) => {
    const [focussed, setFocussed] = React.useState(false)
    const [dirty, setDirty] = React.useState(false)
    const [idx, setIdx] = React.useState(undefined)
    const [value, setValue] = React.useState(undefined)
    const containerRef = React.useRef(null)

    useOutsideClick(containerRef, () => {
        setFocussed(false)
    })

    const handleSubmit = () => onUpdateBoard(board)

    React.useEffect(() => {
        const rowIdx = board.groups[groupKey].entities.findIndex(r => rowId === r.id)
        setIdx(rowIdx)

        const colValue = board && board.groups[groupKey] 
                && board.groups[groupKey].entities[rowIdx] 
                && board.groups[groupKey].entities[rowIdx][modelName] !== undefined ? 
                board.groups[groupKey].entities[rowIdx][modelName] : undefined

        setValue(colValue)
    }, [])

    const handleChange = val => {
        setDirty(true)
        setValue(val)
    }

    const handleBlur = () => {
        if (dirty) {
            setFocussed(false)
            console.log('set value', value)
            board.groups[groupKey].entities[idx][modelName] = value
            handleSubmit()
        }
    }

    const displayValue = value !== undefined && value !== null ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ''

    let label = numberProps.alignment === 'L' 
        ? `${numberProps.unit === 'None' ? '' : numberProps.unit} ${displayValue}` 
        : `${displayValue} ${numberProps.unit === 'None' ? '' : numberProps.unit}`

    if (displayValue === '') {
        label = ''
    }
    
    return (
        <Container ref={containerRef} onClick={() => setFocussed(true)}>
            { focussed ? 
                <StyledInputNumber 
                    disabled={!allowWrite}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    onPressEnter={handleBlur}
                    value={value}
                />
                :
                <NumberLabel>
                    {label}
                </NumberLabel>
            }   
        </Container>
    )
}

export default NumberForm
