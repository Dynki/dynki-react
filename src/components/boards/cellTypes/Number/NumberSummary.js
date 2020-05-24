import React from 'react'
import styles from 'styled-components'

import NumberModal from './NumberModal'

const Total = styles.div`
    align-items: center;
    background-color: #EFF1F3;

    border: solid;
    border-width: 1px;
    border-color: #CFD3D7;

    border-right: ${props => props.hasNext ? 'none;' : 'solid;'}
    border-right-width: 1px;
    border-right-color: #CFD3D7;

    border-top: solid;
    border-top-width: 1px;
    border-top-color: #CFD3D7;

    display: flex;    
    flex: 0 1;
    flex-direction: column;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    height: 44px;
    min-width: 174px;
    max-width: 174px;
    padding: 5px;
    margin-right: ${props => props.isLast ? '36px;' : '0px;'}
    width: 174px;
`

const TotalValue = styles.div`
    text-align: center;
    width: 100%;
`

const TotalLabel = styles.div`
    font-size: 12px;
    font-weight: normal;
    text-align: center;
    width: 100%;
`


const NumberSummary = ({ column, entities = [], hasNext, isLast }) => {
    const sumValues = () => {
        return entities.reduce((acc, grp) => {
            if (grp[column.model]) {
                return acc + grp[column.model]
            }

            return acc
        }, 0)

    }

    const avgValues = () => {
        let cnt = 0;
        const sum1 = entities.reduce((acc, grp) => {
            if (grp[column.model]!== undefined && grp[column.model] !== null && grp[column.model] !== '') {
                cnt = cnt + 1;
                return acc + grp[column.model]
            }

            return acc
        }, 0)
        
        const sum2 = (sum1 / cnt).toFixed(2)

        return sum2
    }

    const mapValuesToArr = () => {
        let arr = []

        entities.forEach(grp => {
            if (grp[column.model]!== undefined && grp[column.model] !== null && grp[column.model] !== '') {
                arr.push(grp[column.model])
            }
        })

        return arr
    }

    const minValues = () => {
        return Math.min(...mapValuesToArr(entities, column.model))
    }

    const maxValues = () => {
        return Math.max(...mapValuesToArr(entities, column.model))
    }

    let calcVal

    switch (column.properties.formula) {
        case 'None':
            calcVal = 0
            break;
        case 'Sum':
            calcVal = sumValues()
            break;
        case 'Average':
            calcVal = avgValues()
            break;
        case 'Min':
            calcVal = minValues()
            break;
        case 'Max':
            calcVal = maxValues()
            break;
                        
        default:
            calcVal = 0
            break;
    }

    let displayValue;

    if (isFinite(calcVal)) {
        displayValue = calcVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
        displayValue = ''
    }

    const label = column.properties.alignment === 'L' 
    ? `${column.properties.unit === 'None' ? '' : column.properties.unit} ${displayValue}` 
    : `${displayValue} ${column.properties.unit === 'None' ? '' : column.properties.unit}`

    const returnEl = entities.length > 0 ? (
        <NumberModal numProps={column.properties} col={column} key={column.model}>
            <Total hasNext={hasNext} isLast={isLast}>
                <TotalValue>
                    {label}
                </TotalValue>
                <TotalLabel>
                    {column.properties.formula ? column.properties.formula : 'Sum'}
                </TotalLabel>
            </Total>
        </NumberModal>
    ) : null

    return returnEl
}

export default NumberSummary
