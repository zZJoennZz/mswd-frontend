import React from 'react';
//import { Link } from 'react-router-dom';
import {
    Container,
    Breadcrumb,
    Row,
    Col
} from 'react-bootstrap';

import AdminDivision from '../components/AdminDivision';

const AdminOrganization = () => {
    return (
        <Container fluid>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Organization</Breadcrumb.Item>
            </Breadcrumb>
            <Row className="mb-12">
                <AdminDivision />
            </Row>
        </Container>
    )
}

export default AdminOrganization;