import * as React from 'react';
import { connect } from 'react-redux';
import { Toolbar, SideNav } from '..';
import { setDomain } from '../../../store/actions/authActions';

class PostAuthShell extends React.Component {

    componentWillMount() {
        this.props.setDomain();
    }

    render() {
        if (this.props.domainId) {
            console.log('Shell::Component::Render')
            return <div className="post-auth__content">
                <Toolbar></Toolbar>
                <SideNav domainName="Dynki Team"></SideNav>
            </div>
        }

        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        domainId: state.auth.domainId
    }
}

const mapDispatchToPros = (dispatch) => {
    return {
      setDomain: () => dispatch(setDomain())
    }
  }

export default connect(mapStateToProps, mapDispatchToPros)(PostAuthShell);