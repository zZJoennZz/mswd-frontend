import React from 'react';
import { 
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';

//components
import NewsBox from '../components/NewsBox';
import ContactForm from '../components/ContactForm';

const Home = () => {
    return (
        <div>
            <Container className="mt-5">
                <Row className="pt-5">
                    <Col xs="12">
                        <h1>Municipal Social Welfare and Development Office</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <h3>San Rafael, Bulacan Office</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Button size="lg" variant="primary" className="mt-5">Services</Button>
                    </Col>
                </Row>
            </Container>
            <Container className="pt-5 pb-5">
                <Row>
                    <Col md="6">
                        <h3 className="mb-3">Announcements</h3>
                        <div style={{ maxHeight: '500px', overflow: 'auto' }}>
                            <NewsBox />
                            <NewsBox />
                            <NewsBox />
                            <NewsBox />
                            <NewsBox />
                        </div>
                    </Col>
                    <Col md="6">
                        <h3 className="mb-3">Contact Us</h3>
                        <ContactForm />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;
