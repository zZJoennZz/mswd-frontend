import React from "react";

import { Container, Breadcrumb, Row, Col, Card } from "react-bootstrap";

const AdminReports = () => {
  return (
    <Container fluid>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item active>Reports</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col>
          <h2>Select report to generate</h2>
          <Row>
            <Col>
              <Card bg="primary" text="light" className="mb-3">
                <Card.Body>
                  <Card.Title>Application Report</Card.Title>
                  <Card.Text>Solo parent, senior citizen or PWD</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card bg="primary" text="light" className="mb-3">
                <Card.Body>
                  <Card.Title>Application Report</Card.Title>
                  <Card.Text>Solo parent, senior citizen or PWD</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card bg="primary" text="light" className="mb-3">
                <Card.Body>
                  <Card.Title>Application Report</Card.Title>
                  <Card.Text>Solo parent, senior citizen or PWD</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminReports;
