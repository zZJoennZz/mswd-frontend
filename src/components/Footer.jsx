import React from 'react';
import { 
    Container,
    Row,
    Col
} from 'react-bootstrap';

const Footer = () => {
    return (
        <div className="p-3 text-white bg-dark">
            <Container>
                <Row>
                    <Col xs="12">
                        &copy; {new Date().getFullYear()} MSWD
                    </Col>
                    <Col xs="12">
                        <small>Banner Image by Ramon F Velasquez</small>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;
