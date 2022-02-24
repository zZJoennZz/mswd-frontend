import React from 'react';
import {
    Form,
    Button,
    Spinner
} from 'react-bootstrap';

import api from '../api/api';

const ContactForm = ({ prefix }) => {
    let subPrefix = parseInt(prefix) === undefined ? "" : parseInt(prefix) === 1 ? "[Social Case Study Report]" : parseInt(prefix) === 3 ? "[Purchase Booklet]" : parseInt(prefix) === 4 ? "[Certificate of Indigency]" : parseInt(prefix) === 5 ? "[Issuance of Pre-Marriage Counselling (PMC) Certificate]" : "";

    let [frmData, setFrmData] = React.useState({});
    let [frmSubmit, setFrmSubmit] = React.useState(false);

    const onChangeText = (e) => {
        if (e.target.name === "subject") {
            setFrmData({...frmData, [e.target.name] : subPrefix + ' ' + e.target.value})
        } else {
            setFrmData({...frmData, [e.target.name] : e.target.value})
        }
    }

    const onSubmitFrm = async (e) => {
        e.preventDefault();
        setFrmSubmit(true);
        try {
            await api.post("client_message/post", frmData)
                .then((res) => alert("Your inquiry is submitted!"));
            
            setFrmSubmit(false);
        } catch (error) {
            alert(error);
            setFrmSubmit(false);
        }
    }

    return (
        <div style={{textAlign: 'left', padding: '10px'}}>
            <Form onSubmit={onSubmitFrm}>
                <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" onChange={onChangeText} name="email_address" id="email_address" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" onChange={onChangeText} name="full_name" id="full_name" placeholder="Enter full name" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" onChange={onChangeText} name="subject" id="subject" placeholder="Enter your inquiry subject" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" onChange={onChangeText} name="message" id="message" rows={3} placeholder="Enter your inquiry message" />
                </Form.Group>
                {
                    frmSubmit ?
                        <Button variant="primary" disabled>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> Submitting...
                        </Button>
                    :
                        <Button variant="primary" type="submit">Submit</Button>
                }
            </Form>
        </div>
    );
}

export default ContactForm;
