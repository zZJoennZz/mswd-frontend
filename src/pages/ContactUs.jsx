import React from 'react';
import {
    Container,
    Row,
    Col,
    Card
} from 'react-bootstrap';

import ContactForm from '../components/ContactForm';

const ContactUs = () => {
    return (
        <Container className="mt-5 mb-5 text-start" style={{ minHeight: "80vh" }}>
            <Row>
                <Col md={12}>
                    <h1 className="mb-3">Contact Us</h1>
                    <Card className="mb-3 p-3">
                        <p>Municipal Social Welfare and Development Office<br />
                        Maharlika Highway, Brgy. Sampaloc, San Rafael Bulacan.<br />
                        (+63) 922-564-5695<br />
                        mswdosanrafaelbulacan@gmail.com</p>
                    </Card>
                    <Card className="p-3">
                        <ContactForm />
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ContactUs;