import React from 'react'
import styles from 'styled-components'

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

    display: flex;    
    flex-direction: row;
    font-weight: bold;
    justify-content: center;
    height: 34px;
    min-width: 174.5px;
    width: 174.5px;
`

const BoardGroupSummary = ({ board, group, groupKey }) => {
    return (
        <Container>
            {board.columns.map((c, colIdx) => {
                if (colIdx === 0) {
                    return <FirstBlank></FirstBlank>
                }

                let returnEl;

                if (c.class === 'number') {
                    const sum = group.entities.reduce((acc, grp) => {
                        if (grp[c.model]) {
                            return acc + grp[c.model]
                        }

                        return acc;
                    }, 0)

                    returnEl = <Total>{sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Total>

                } else {
                    returnEl = <Blank/>
                }

                return returnEl
            })}

        </Container>
    )
}

export default BoardGroupSummary
