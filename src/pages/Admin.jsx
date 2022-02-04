import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import apifrm from '../api/apifrm';

import './admin.css';
import {
    Nav,
    Container,
    Row,
    Col
} from 'react-bootstrap';

const Admin = () => {
    
    return (
        <Container fluid>
            <Row>
                <Col md={3} style={{ minHeight: '100vh', background: 'red', minWidth: '250px' }}>
                    ASDASDASDADASD
                </Col>
                <Col md={9}>
                    Hello
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;
