import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

const AuthWrapper = Component => props => {
    const { domain, dispatch, ...restProps } = props; // Removing dispatch to avoid passing it down unnessararly. 

    const hasRole = roleName => {
        const roles = props.user.claims.domainIds[domain.domainId].roles;

        return roles.find(r => r === roleName);
    }

    return <Component hasRole={hasRole} {...restProps}/>;
}

const mapStateToProps = state => ({
    domain: state.domain,
    user: state.auth.currentUser
})

const composedAuthWrapper = compose(
    connect(mapStateToProps, null),
    AuthWrapper
)

export default composedAuthWrapper;