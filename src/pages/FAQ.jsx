import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Accordion,
    Spinner
} from 'react-bootstrap'

import api from '../api/api';

const FAQ = () => {
    let [faq, setFaq] = useState([]);

    const getFaq = async () => {
        let res = await api('faq');
        setFaq(res.data);
    }

    useEffect(() => {    
        getFaq();
    }, []);
    
    return (
            <Container className="p-3">
                <Row>
                    <Col md={12}>
                        <h1 className="mb-3">Frequently Asked Questions</h1>
                            {
                                faq.data 
                                ?
                                <Accordion style={{ textAlign: "left" }}>
                                    {
                                        faq.data.map(d => 
                                                <Accordion.Item key={d.id+d.question} eventKey={d.id}>
                                                    <Accordion.Header>{d.question}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <div style={{ background: "#ebf7fa", padding: "10px", borderRadius: "5px" }}>
                                                            {d.answer}
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>  
                                            )
                                    }
                                </Accordion>
                                :
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            }
                    </Col>
                </Row>
            </Container>
        );
};

export default FAQ;
