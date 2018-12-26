import React from 'react';
import { Icon, Dropdown, Menu } from 'antd';
import BoardRowHeaderForm from './BoardRowHeaderForm';

const BoardRowHeader = (props) => {
    const menu = (
        <Menu>
          <Menu.Item>
            <a class="table_menu__link"><Icon type="form" />Text</a>
          </Menu.Item>
        </Menu>
    );

    return ( 
        <th className="table__header">
            <section className="table__header__columns">
                {props.board.columns.map((c, idx) => {
                    return idx === 0 ? (
                        <div key={idx} className="table__header__columns__container--first">
                            <BoardRowHeaderForm onUpdateBoard={props.onUpdateBoard} board={props.board} colIdx={idx}></BoardRowHeaderForm>
                        </div>
                    ) : (
                        <div key={idx} className="table__header__columns__container">
                            <Icon type="close-square" />
                            <BoardRowHeaderForm onUpdateBoard={props.onUpdateBoard} board={props.board} colIdx={idx}></BoardRowHeaderForm>
                        </div>
                    )
                })
                }
                <div className="table__header__menu__container">
                    <Dropdown overlay={menu} className="table__header__menu__container__dropdown">
                        <Icon type="plus-circle" />
                    </Dropdown>
                </div>
            </section>
        </th>
    
    )
}

export default BoardRowHeader;