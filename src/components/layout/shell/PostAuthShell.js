import * as React from 'react';
import { connect } from 'react-redux';
import { Toolbar, SideNav } from '..';
import { setDomain } from '../../../store/actions/authActions';

class PostAuthShell extends React.Component {

    componentWillMount() {
        this.props.setDomain();
    }

    render() {
        console.log('Shell::Component::Render')
        return <div className="post-auth__content">
            <Toolbar></Toolbar>
            <SideNav domainName="Dynki Team"></SideNav>
        </div>
    }
}

const mapDispatchToPros = (dispatch) => {
    return {
      setDomain: () => dispatch(setDomain())
    }
  }

export default connect(null, mapDispatchToPros)(PostAuthShell);