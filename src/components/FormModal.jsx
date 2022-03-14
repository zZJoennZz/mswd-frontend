import React from 'react';

import {
    Button,
    Modal
} from 'react-bootstrap';

const FormModal = ({title, content, btntxt, onHide, btnclick, show}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {content}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit" onClick={btnclick}>{btntxt}</Button>
                <Button variant="danger" onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FormModal;