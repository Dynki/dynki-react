import React from 'react'
import styles from 'styled-components'
import NumberModal from './cellTypes/Number/NumberModal'

const Container = styles.div`
    display: flex;
    flex-direction: row;
    padding-right: 49px;
    margin-left: 1px;
    width: 100%;
`

const FirstBlank = styles.div`
    width: 100%;
`

const Blank = styles.div`
    min-width: 173.5px;
    width: 173.5px;
`
const Total = styles.div`
    align-items: center;
    background-color: #EFF1F3;

    border: solid;
    border-width: 1px;
    border-color: #CFD3D7;
    border-top: none;
    border-right: ${props => props.hasNext ? 'none;' : 'solid;'}
    border-right-width: 1px;
    border-right-color: #CFD3D7;

    display: flex;    
    flex-direction: column;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    height: 44px;
    min-width: 174.5px;
    padding: 5px;
    width: 174.5px;
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

const BoardGroupSummary = ({ board, group, groupKey }) => {

    const sumValues = (entities, column) => {
        return entities.reduce((acc, grp) => {
            if (grp[column.model]) {
                return acc + grp[column.model]
            }

            return acc
        }, 0)

    }

    const avgValues = (entities, column) => {
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

    const mapValuesToArr = (entities, model) => {
        let arr = []

        entities.map(grp => {
            if (grp[model]!== undefined && grp[model] !== null && grp[model] !== '') {
                arr.push(grp[model])
            }
        })

        return arr
    }

    const minValues = (entities, column) => {
        console.log()
        return Math.min(...mapValuesToArr(entities, column.model))
    }

    const maxValues = (entities, column) => {
        console.log()
        return Math.max(...mapValuesToArr(entities, column.model))
    }

    return (
        <Container>
            {board.columns.map((c, colIdx) => {
                if (colIdx === 0) {
                    return <FirstBlank key={c.model}></FirstBlank>
                }

                let returnEl

                if (c.class === 'number') {
                    const hasNext = board.columns[colIdx+1] && board.columns[colIdx+1].class === 'number'

                    let calcVal

                    switch (c.properties.formula) {
                        case 'None':
                            calcVal = 0
                            break;
                        case 'Sum':
                            calcVal = sumValues(group.entities, c)
                            break;
                        case 'Average':
                            calcVal = avgValues(group.entities, c)
                            break;
                        case 'Min':
                            calcVal = minValues(group.entities, c)
                            break;
                        case 'Max':
                            calcVal = maxValues(group.entities, c)
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

                    const label = c.properties.alignment === 'L' 
                    ? `${c.properties.unit === 'None' ? '' : c.properties.unit} ${displayValue}` 
                    : `${displayValue} ${c.properties.unit === 'None' ? '' : c.properties.unit}`

                    returnEl = (
                        <NumberModal numProps={c.properties} col={c} key={c.model}>
                            <Total hasNext={hasNext}>
                                <TotalValue>
                                    {label}
                                </TotalValue>
                                <TotalLabel>
                                    {c.properties.formula ? c.properties.formula : 'Sum'}
                                </TotalLabel>
                            </Total>
                        </NumberModal>
                    )
                    
                } else {
                    returnEl = <Blank key={c.model}/>
                }

                return returnEl
            })}

        </Container>
    )
}

export default BoardGroupSummary
