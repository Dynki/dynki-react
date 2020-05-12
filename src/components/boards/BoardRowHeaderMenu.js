import React from 'react';
import { Icon, Dropdown, Menu } from 'antd';
import { connect } from 'react-redux';
import { addColumn } from '../../store/actions/boardActions';
import styles from 'styled-components';

const StyledLink = styles.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: inline;
    margin: 0;
    padding: 0;
    text-align: start;
  
    :hover {
        text-decoration: none;
    }

    :focus {
        text-decoration: none;
    }
`;


class BoardRowHeaderMenu extends React.Component {

    onClick = ({ key }) => {
        this.props.addColumn(key);
    };

    menu = (
        <Menu onClick={this.onClick} className="table__header__menu">
          <Menu.Item key="text">
            <StyledLink className="table_menu__link"><Icon type="form" />Text</StyledLink>
          </Menu.Item>
          <Menu.Item key="number">
            <StyledLink className="table_menu__link"><Icon type="number" />Number</StyledLink>
          </Menu.Item>
          <Menu.Item key="select">
            <StyledLink className="table_menu__link"><Icon type="arrow-down" />Select</StyledLink>
          </Menu.Item>
          <Menu.Item key="date">
            <StyledLink className="table_menu__link"><Icon type="calendar" />Date</StyledLink>
          </Menu.Item>
          <Menu.Item key="datedue">
            <StyledLink className="table_menu__link"><Icon type="calendar" />Date Due</StyledLink>
          </Menu.Item>
        </Menu>
    );

    render() {
        return <th className="table__header__menu__container">
            <Dropdown disabled={!this.props.allowWrite} overlay={this.menu} className="table__header__menu__container__dropdown">
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
