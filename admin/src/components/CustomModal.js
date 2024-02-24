import React from 'react';
import { Modal } from 'antd';

const CustomModal = (props) => {
    const { open, hideModal, title, performAction } = props;
    return (
        <Modal
            title="Modal"
            open={open}
            onOk={performAction}
            onCancel={hideModal}
            okText="Ok"
            cancelText="Cancel"
            >
            <p>{title}</p>
        </Modal>
    )
}

export default CustomModal;