import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Menu, Dropdown } from 'antd';

import { signOut } from '../../../store/actions/authActions';

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
        
        return <div className="toolbar">
            <div className={this.props.progress ? "toolbar__img--progress" : "toolbar__img"}></div>
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