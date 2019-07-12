import * as React from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Icon } from 'antd';

import { signOut } from '../../../store/actions/authActions';
import UserProfileDrawer from '../../auth/UserProfileDrawer';
import SidenavDrawer from '../sidenav/SidenavDrawer';

class Toolbar extends React.Component {
    
    render() {

        const { currentUser } = this.props;

        const menu = (
            <Menu>
              <Menu.Item>
                  <UserProfileDrawer/>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item>
                <a id="logout" className="usermenu__item" onClick={this.props.signOut}><Icon type="logout" /> Log Out</a>
              </Menu.Item>
            </Menu>
        );
        
        return (
            <div className="toolbar">
                <SidenavDrawer domain={this.props.domain}/>
                <div id="backToHome" className={this.props.progress ? "toolbar__img--progress" : "toolbar__img"}></div>
                <div className="toolbar__brand">Dynki</div>
                <Dropdown overlay={menu} trigger={['click']}>
                    <label id="userprofile-icon" className="toolbar__user-profile">
                    {currentUser.displayName && currentUser.displayName.length > 0 ?
                        currentUser.displayName[0] : currentUser.email[0]
                    }
                    </label>            
                </Dropdown>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        domain: state.domain,
        currentUser: state.auth.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);