import React from 'react';
import { Icon, Dropdown, Menu } from 'antd';
import { connect } from 'react-redux';
import { addColumn } from '../../store/actions/boardActions';

class BoardRowHeaderMenu extends React.Component {

    onClick = ({ key }) => {
        this.props.addColumn(key);
    };

    menu = (
        <Menu onClick={this.onClick}>
          <Menu.Item key="text">
            <a className="table_menu__link"><Icon type="form" />Text</a>
          </Menu.Item>
          <Menu.Item key="select">
            <a className="table_menu__link"><Icon type="arrow-down" />Select</a>
          </Menu.Item>
          <Menu.Item key="date">
            <a className="table_menu__link"><Icon type="calendar" />Date</a>
          </Menu.Item>
        </Menu>
    );

    render() {
        return <th className="table__header__menu__container">
            <Dropdown overlay={this.menu} className="table__header__menu__container__dropdown">
                <Icon type="plus-circle" />
            </Dropdown>
        </th>
    }
}

const mapStateToProps = (state) => {
    return{
      board: state.boards.currentBoard
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addColumn: (type) => dispatch(addColumn(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardRowHeaderMenu);
