import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

const AuthWrapper = Component => props => {
    const { domain, dispatch, subscriptpion, ...restProps } = props; // Removing dispatch to avoid passing it down unnessararly. 

    const hasRole = roleName => {
        const roles = props.user.claims.domainIds[domain.domainId].roles;

        return roles.find(r => r === roleName);
    }

    const isActiveSubscriber = () => {
        return subscriptpion && (subscriptpion.status === 'active' || subscriptpion.status === 'trialing');
    }

    return <Component hasRole={hasRole} isActiveSubscriber={isActiveSubscriber} {...restProps}/>;
}

const mapStateToProps = state => ({
    domain: state.domain,
    subscriptpion: state.subscription,
    user: state.auth.currentUser
})

const composedAuthWrapper = compose(
    connect(mapStateToProps, null),
    AuthWrapper
)

export default composedAuthWrapper;