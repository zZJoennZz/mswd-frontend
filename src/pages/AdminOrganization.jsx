import React from 'react';
//import { Link } from 'react-router-dom';
import {
    Container,
    Breadcrumb,
    Row,
    Col
} from 'react-bootstrap';

import AdminDivision from '../components/AdminDivision';
import AdminPosition from '../components/AdminPosition';

const AdminOrganization = () => {
    return (
        <Container fluid>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Organization</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col md={12}>
                    <AdminDivision />
                </Col>
            </Row>
            <hr />
            <Row>
                <Col md={12}>
                    <AdminPosition />
                </Col>
            </Row>
        </Container>
    )
}

export default AdminOrganization;