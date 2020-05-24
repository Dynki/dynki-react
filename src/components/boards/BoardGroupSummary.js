import React from 'react'
import styles from 'styled-components'
import { connect } from 'react-redux'

import NumberSummary from './cellTypes/Number/NumberSummary'
import TimerSummary from './cellTypes/Timer/TimerSummary'

const Container = styles.div`
    display: flex;
    flex-direction: row;
    padding-right: 2px;
    margin-top: 4px;
    margin-left: auto;
    width: 100%;
`

const FirstBlank = styles.div`
    flex: 1 1;
    min-width: 369px;
    width: 100%;
`

const Blank = styles.div`
    min-width: 175px;

    width: ${props => props.isLast ? '176px;' : '174.5px;'}
    margin-right: ${props => props.isLast ? '36px;' : '0px;'}
`

const BoardGroupSummary = ({ board, boardLastUpdated, group }) => {


    return (
        <Container>
            {board.columns.map((c, colIdx) => {
                if (colIdx === 0) {
                    return <FirstBlank key={c.model}></FirstBlank>
                }

                const isLast = colIdx + 1 === board.columns.length 
                let returnEl

                const hasNext = board.columns[colIdx+1] && 
                    (board.columns[colIdx+1].class === 'number' || board.columns[colIdx+1].class === 'timer')

                if (c.class === 'number') {

                    returnEl = <NumberSummary key={c.model} column={c} entities={group.entities} hasNext={hasNext} isLast={isLast}/>                    
                } else if (c.class === 'timer') {
                    returnEl = <TimerSummary key={c.model} column={c} entities={group.entities} hasNext={hasNext} isLast={isLast} updated={boardLastUpdated}/>                    
                } else {
                    returnEl = <Blank key={c.model} isLast={isLast}/>
                }

                return returnEl
            })}

        </Container>
    )
}


export const mapStateToProps = (state) => {
    return{
        boardLastUpdated: state.boards.boardLastUpdated
    }
}

export default connect(mapStateToProps)(BoardGroupSummary)
