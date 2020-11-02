import React from 'react';
import { RobotOutlined } from '@ant-design/icons';
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
            <StyledAnchor id="userProfile" onClick={showDrawer}><RobotOutlined /> Account Details</StyledAnchor>
        </React.Fragment>
    );
}

export default withRouter(UserProfileDrawer);