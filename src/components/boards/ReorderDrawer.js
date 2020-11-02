import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Drawer } from 'antd'
import { SwapOutlined } from '@ant-design/icons'
import { Droppable } from 'react-beautiful-dnd'
import styles from 'styled-components'
import ReorderCell from './ReorderCell'

const MenuIcon = styles(SwapOutlined)`
    margin-right: 10px;
`

const ReorderDrawer = ({ board }) => {

    const [visible, setVisible] = useState(false)

    const onClose = () => {
        setVisible(false);
    }

    return (
        <React.Fragment>
            <div onClick={() => setVisible(true)}>
                <MenuIcon type="swap" />Reorder Columns
            </div>

            <Drawer
                title="Reorder columns"
                width={370}
                onClose={onClose}
                visible={visible}
                style={{
                    overflow: 'auto',
                    height: '100%',
                    paddingBottom: '108px',
                }}
            >
                <Droppable droppableId={"reorder"} type="reorder-column">
                    {outerProvided =>(
                        <ul ref={outerProvided.innerRef} {...outerProvided.droppableProps} className="select__drawer-colors">
                            {board.columns.map((c, i) => {
                                if (i === 0) {
                                    return null;
                                }

                                return (
                                    <li key={i}>
                                        <ReorderCell id={c.id} title={c.title} index={i}/>
                                    </li>
                                )
                            })}
                        </ul>
                    )}  
                </Droppable>
            </Drawer>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    return {
        board: state.boards.currentBoard,
    }
}

export default connect(mapStateToProps, null)(ReorderDrawer)
