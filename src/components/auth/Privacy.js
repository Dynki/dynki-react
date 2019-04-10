import React from 'react';
import { Modal } from 'antd';

const Privacy = (props) => {

    const showModal = () => {
        Modal.info({
            title: 'Privacy policy',
            content: 'Privacy policy'
        });
    }

    return (
        <React.Fragment>
            <a href="#" onClick={showModal}>privacy policy</a>
        </React.Fragment>
    )
}

export default Privacy;