import React, { useState, useEffect } from 'react';
import { 
    Container,
    Row,
    Col,
    Button,
    Spinner
} from 'react-bootstrap';

import api from '../api/api';

//components
import NewsBox from '../components/NewsBox';
import ContactForm from '../components/ContactForm';

const Home = () => {
    let [ann, setAnn] = useState([]);

    const getAnn = async() => {
        let res = await api.get("announcement");
        setAnn(res.data);
    }

    useEffect(() => {
        getAnn();
    }, []);
    
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
                        <Button size="lg" variant="outline-primary" href="/services" className="mt-5">Services</Button>
                    </Col>
                </Row>
            </Container>
            <Container className="pt-5 pb-5">
                <Row>
                    <Col md="8">
                        <h3 className="mb-3">Announcements</h3>
                        <div className="newsBox" style={{ maxHeight: '500px', overflow: 'auto' }}>
                            {
                                ann.data ?
                                    ann.data.map(d => 
                                            <NewsBox key={d.id} announcementData={d} />
                                        )
                                :
                                    <Spinner className="mt-5" animation="border" variant="info" />   
                            }
                        </div>
                    </Col>
                    <Col md="4">
                        <h3 className="mb-3">Inquire</h3>
                        <ContactForm />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;
