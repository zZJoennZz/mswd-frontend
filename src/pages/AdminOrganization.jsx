import React from "react";
//import { Link } from 'react-router-dom';
import {
  Container,
  Breadcrumb,
  Row,
  Col,
  Button,
  ButtonGroup,
} from "react-bootstrap";

import AdminDivision from "../components/AdminDivision";
import AdminPosition from "../components/AdminPosition";
import AdminOrgPeople from "../components/AdminOrgPeople";
import AdminOrgChart from "../components/AdminOrgChart";

const AdminOrganization = () => {
  return (
    <Container fluid>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item active>Organization</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col md={12}>
          <h3 className="mb-3">Organizational Chart</h3>
          <ButtonGroup className="mb-4">
            <Button variant="primary" href="#divisions">
              Manage Divisions
            </Button>
            <Button variant="primary" href="#positions">
              Manage Positions
            </Button>
            <Button variant="primary" href="#people">
              Manage People
            </Button>
          </ButtonGroup>
          <AdminOrgChart />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={12} id="divisions">
          <div className="mb-3">
            <h3 className="mb-1">Manage Divisions</h3>
            <small>Manage the division names here</small>
          </div>
          <AdminDivision />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={12} id="positions">
          <div className="mb-3">
            <h3 className="mb-1">Manage Positions</h3>
            <small>Manage the positions here</small>
          </div>
          <AdminPosition />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={12} id="people">
          <div className="mb-3">
            <h3 className="mb-1">Manage People</h3>
            <small>Manage the people here</small>
          </div>
          <AdminOrgPeople />
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

export default AdminOrganization;
