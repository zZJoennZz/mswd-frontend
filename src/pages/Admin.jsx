import React from 'react';
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
            <Col xs={2} style={{ background: 'gray', minHeight: '100vh', position: 'fixed' }}>
            <Nav activeKey="/home" onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
                <Nav.Item>
                    <Nav.Link href="/home">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                    Disabled
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            </Col>
            <Col xs={10}>
                ASDASDASD
            </Col>
        </Row>
    </Container>
  );
};

export default Admin;
