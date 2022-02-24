import React from 'react';
import {
    Container,
    Breadcrumb
} from 'react-bootstrap';

const AdminSettings = () => {
    return (
        <Container fluid>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Settings</Breadcrumb.Item>
            </Breadcrumb>
        </Container>
    )
}

export default AdminSettings;