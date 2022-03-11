import React, { useState, useEffect } from 'react';
import { 
    Container,
    Row,
    Col,
    Button,
    Spinner
} from 'react-bootstrap';

import api from '../api/api';

import { sortByDesc } from '../fn/functions';

//components
import NewsBox from '../components/NewsBox';
import ContactForm from '../components/ContactForm';

const Home = () => {
    let [ann, setAnn] = useState(false);

    const getAnn = async() => {
        let res = await api.get("announcement");
        let data = res.data.data;

        setAnn(sortByDesc(data));
    }

    useEffect(() => {
        getAnn();
    }, []);
    
    return (
        <div>
            <div style={{ background: `linear-gradient(0deg, rgba(25, 25, 25, 0.8), rgba(58, 58, 58, 0.5)), url('https://i.ibb.co/3TjmLDx/1440px-San-Rafael-Bulacanjf4845-01.jpg'), #000`, backgroundPosition: 'center', color: '#fff' }}>
                <Container>
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
                    <Row className="pb-5">
                        <Col xs="12">
                            <Button size="lg" variant="light" href="/services" className="mt-5">Services</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container className="pt-5 pb-5">
                <Row>
                    <Col md="8">
                        <h3 className="mb-3">Announcements</h3>
                        <div className="newsBox" style={{ maxHeight: '500px', overflow: 'auto' }}>
                            {
                                !ann ?
                                    <Spinner className="mt-5" animation="border" variant="info" />
                                :
                                    ann.map(d => 
                                            <NewsBox key={d.id} announcementData={d} />
                                        )                   
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
