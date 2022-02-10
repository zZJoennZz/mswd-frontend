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
                </Row>
            </Container>
        </div>
    );
}

export default Footer;