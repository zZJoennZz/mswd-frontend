import React from 'react';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

import ContactForm from '../components/ContactForm';

const ContactUs = () => {
    return (
        <Container className="mt-5 mb-5" style={{ minHeight: "80vh" }}>
            <Row>
                <Col md={12}>
                    <ContactForm />
                </Col>
            </Row>
        </Container>
    )
}

export default ContactUs;