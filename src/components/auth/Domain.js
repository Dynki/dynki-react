import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import DomainForm from './DomainForm';
import { checkDomain } from '../../store/actions/domainActions';

class Domain extends Component {
    constructor(props) {
        super(props);
        this.onCheckDomain = this.onCheckDomain.bind(this);
        this.onCheckDomain = debounce(this.onCheckDomain, 1000)
    }

    onCheckDomain(name) {
        console.log('Name::', name);
        this.props.CheckDomain(name);
    }
      
    render() {

        const {...domain } = this.props.domain;
 
        return (
            <div className="login">
                <h1 className="registration__heading">Name your team</h1>
                <h4>Give your team a name they can be proud of</h4>
                <DomainForm {...domain} onCheckDomain={this.onCheckDomain}></DomainForm>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError,
      pending: state.auth.pending,
      auth: state.firebase.auth,
      domain: state.domain
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        CheckDomain: (name) => dispatch(checkDomain(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Domain);