import * as React from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Icon } from 'antd';

import { signOut } from '../../../store/actions/authActions';
import UserProfileDrawer from '../../auth/UserProfileDrawer';

class Toolbar extends React.Component {
    
    render() {

        const menu = (
            <Menu>
              <Menu.Item>
                  <UserProfileDrawer/>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item>
                <a className="usermenu__item" onClick={this.props.signOut}><Icon type="logout" /> Log Out</a>
              </Menu.Item>
            </Menu>
        );
        
        return (
            <div className="toolbar">
                <div className={this.props.progress ? "toolbar__img--progress" : "toolbar__img"}></div>
                <div className="toolbar__brand">Dynki</div>
                <Dropdown overlay={menu} trigger={['click']}>
                    <label id="userprofile-icon" className="toolbar__user-profile">D</label>            
                </Dropdown>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(Toolbar);