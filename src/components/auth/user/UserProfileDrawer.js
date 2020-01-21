import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const StyledAnchor = styled.a`
    margin: 10px;

    i {
        margin-right: 10px;
    }
`;

const UserProfileDrawer = (props) => {


    const showDrawer = () => {
        // setVisible(true);
        props.history.push('/account');
    };

    return (
        <React.Fragment>
            <StyledAnchor id="userProfile" onClick={showDrawer}><Icon type="robot" /> Account Details</StyledAnchor>
        </React.Fragment>
    );
}

export default withRouter(UserProfileDrawer);