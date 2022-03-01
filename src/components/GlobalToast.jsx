import React from 'react';
import {
    ToastContainer,
    Toast
} from 'react-bootstrap';

const GlobalToast = (props) => {
    return (
        <ToastContainer position="bottom-end" className="p-3">
            <Toast {...props} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">{props.title}</strong>
                    <small>Few seconds ago</small>
                </Toast.Header>
                <Toast.Body>{props.msg}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default GlobalToast