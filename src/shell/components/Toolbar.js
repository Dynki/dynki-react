import * as React from 'react';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom'
import { signOut } from '../../store/actions/authActions';
import { connect } from 'react-redux';

class Toolbar extends React.Component {
    
    render() {

        const menu = (
            <Menu>
              <Menu.Item>
                <Link to='/'>User Profile</Link>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item>
                <a onClick={this.props.signOut}>Log Out</a>
              </Menu.Item>
            </Menu>
        );
        
        console.log('Shell::Component::Render')
        return <div className="toolbar">
            <div className="toolbar__img"></div>
            <div className="toolbar__brand">Dynki</div>
            <Dropdown overlay={menu}>
                <label id="userprofile-icon" className="toolbar__user-profile">D</label>            
            </Dropdown>,
        </div>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(Toolbar);