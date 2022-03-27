import React from 'react';
import {
    Form,
    Button,
    Spinner
} from 'react-bootstrap';

import api from '../api/api';

const ContactForm = ({ prefix }) => {
    let subPrefix = parseInt(prefix) === undefined ? "" : parseInt(prefix) === 1 ? "[Social Case Study Report]" : parseInt(prefix) === 3 ? "[Purchase Booklet]" : parseInt(prefix) === 4 ? "[Certificate of Indigency]" : parseInt(prefix) === 5 ? "[Issuance of Pre-Marriage Counselling (PMC) Certificate]" : "";

    let [frmData, setFrmData] = React.useState({
        'email_address' : '',
        'full_name' : '',
        'subject' : '',
        'message' : ''
    });
    let [frmSubmit, setFrmSubmit] = React.useState(false);

    const onChangeText = (e) => {
        setFrmData({...frmData, [e.target.name] : e.target.value})
        // if (e.target.name === "subject") {
        //     if (e.target.value === "") {
        //         setFrmData({...frmData, [e.target.name] : subPrefix + ' ' + e.target.value})
        //     } else {
        //         setFrmData({...frmData, [e.target.name] : e.target.value})
        //     }
        // } else {
        //     setFrmData({...frmData, [e.target.name] : e.target.value})
        // }
    }

    const onSubmitFrm = async (e) => {
        e.preventDefault();
        setFrmSubmit(true);
        let formD = {
            'email_address' : frmData.email_address,
            'full_name' : frmData.full_name,
            'subject' : subPrefix + ' ' + frmData.subject,
            'message' : frmData.message,
        };
        try {
            await api.post("client_message/post", formD)
                .then((res) => {
                    alert("Your inquiry is submitted!");
                    setFrmData({
                        'email_address' : '',
                        'full_name' : '',
                        'subject' : '',
                        'message' : ''
                    });
                });
            
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
                    <Form.Control value={frmData.email_address} type="email" onChange={onChangeText} name="email_address" id="email_address" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control value={frmData.full_name} type="text" onChange={onChangeText} name="full_name" id="full_name" placeholder="Enter full name" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control value={frmData.subject} type="text" onChange={onChangeText} name="subject" id="subject" placeholder="Enter your inquiry subject" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control value={frmData.message} as="textarea" onChange={onChangeText} name="message" id="message" rows={3} placeholder="Enter your inquiry message" />
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
