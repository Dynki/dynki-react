import React from 'react';
import { connect } from 'react-redux';

// Container for teams components.
export class Teams extends React.Component {

    render() {
        return (
            <section className="teams">
            </section> 
        )
    }
}

export const mapStateToProps = (state) => {
    return{
      teams: state.teams.teams,
      team: state.teams.currentTeam,
      progress: state.base.progress
    }
}

export const mapDispatchToProps = (dispatch) => {
    return{
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teams);