import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Drawer, Icon } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import styles from 'styled-components';
import ReorderCell from './ReorderCell';

const MenuIcon = styles(Icon)`
    margin-right: 10px;
`;

const ReorderGroupDrawer = ({ board }) => {

    const [visible, setVisible] = useState(false);

    const onClose = () => {
        setVisible(false);
    };

    return (
        <React.Fragment>
            <div onClick={() => setVisible(true)}>
                <MenuIcon type="swap" />Reorder Groups
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
                <Droppable droppableId={"reorder"} type="reorder-group">
                    {outerProvided =>(
                        <ul ref={outerProvided.innerRef} {...outerProvided.droppableProps} className="select__drawer-colors">
                            {board.groups.map((g, i) => {
                                return (
                                    <li key={i}>
                                        <ReorderCell id={g.id} title={g.name} index={i}/>
                                    </li>
                                )
                            })}
                        </ul>
                    )}  
                </Droppable>
            </Drawer>
        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    return {
        board: state.boards.currentBoard,
    }
}

export default connect(mapStateToProps, null)(ReorderGroupDrawer);
