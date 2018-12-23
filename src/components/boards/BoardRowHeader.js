import React from 'react';
import { Icon, Input } from 'antd';

class BoardRowHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    submitForm() {
        this.refs['headerForm'].submit();
    }

    render() {
        return (
            <form ref="headerForm" className="table__header__columns">
                {this.props.columns.map((c, idx) => {
                    return idx === 0 ? (
                        <div className="table__header__columns__container--first">
                            <Input value={this.state.value} className="table__header__input text--no-border" type="text" onBlur={this.submitForm} onChange={this.handleChange} />
                        </div>
                    ) : (
                            <div className="table__header__columns__container">
                                <Icon type="close-square" />
                                <Input value={this.state.value} className="table__header__input text--no-border" type="text" onBlur={this.submitForm} onChange={this.handleChange} />
                            </div>
                        )
                })
                }
            </form>
        )
    }
}

export default BoardRowHeader;