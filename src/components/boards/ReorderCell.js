import React from 'react';
import { Icon, Typography } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import styles from 'styled-components';

const { Text } = Typography;

const Cell = styles.div`
    align-items: center;
    border: dashed;
    border-width: 1px;
    border-color: #595959;
    display: flex;
    flex-direction: row;
    padding: 10px;

    :hover {
        border-color: #79BAEC;
    }
`;

const MenuIcon = styles(Icon)`
    cursor: pointer;
    height: 10px;
    margin-bottom: 10px;
    padding-right: 0px;
    width: 5px;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    transform: rotate(90deg);
`;

const ReorderCell = ({ id, index, title }) => {

    return (
        <Draggable key={'value' + index} draggableId={'reorder-column-' + index} index={index}>
        {provided => (
            <div
                ref={provided.innerRef} {...provided.draggableProps}
            >
                <div >
                    
                    <Cell {...provided.dragHandleProps}>
                        <MenuIcon type="ellipsis"/>
                        <MenuIcon type="ellipsis"/>
                        <Text>{title}</Text>
                    </Cell>
                </div>
            </div>
        )}
    </Draggable>
    )
};


export default ReorderCell;
