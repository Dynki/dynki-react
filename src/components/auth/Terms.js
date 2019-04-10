import React from 'react';
import { Modal } from 'antd';

const Terms = (props) => {

    const showModal = () => {
        Modal.info({
            title: 'Terms of service',
            content: 'Terms of service'
        });
    }

    return (
        <React.Fragment>
            <a href="#" onClick={showModal}>terms of service</a>
        </React.Fragment>
    )
}

export default Terms;