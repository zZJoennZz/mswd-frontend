import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import OrgChart from "../components/OrgChart";

const About = () => {
  return (
    <>
      <Container className="about text-start pt-3">
        <h1 className="mb-5">About Us</h1>
        <Card className="mb-3">
          <Card.Header>
            <h3 className="text-center">Vision Statement</h3>
          </Card.Header>
          <Card.Body>
            <Card.Text style={{ fontSize: "1.4rem" }}>
              Empowered families and individuals in the municipality who
              actively participate in community affairs and have normal level of
              social functioning.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Header>
            <h3 className="text-center">Mission Statement</h3>
          </Card.Header>
          <Card.Body>
            <Card.Text style={{ fontSize: "1.4rem" }}>
              Care, protection, and rehabilitation of the municipality's
              population which has the least in life, and needs social welfare
              assistance, and social work interventions to restore their normal
              social functioning, and participation in community affairs.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Header>
            <h3 className="text-center">Objectives</h3>
          </Card.Header>
          <Card.Body>
            <Card.Text style={{ fontSize: "1.4rem" }}>
              <ol>
                <li>
                  Provision of preventive, protective, rehabilitative, and
                  developmental programs and services for:
                  <ul>
                    <li>Family & Community Welfare</li>
                    <li>Child and Youth Welfare</li>
                    <li>Women Welfare Program</li>
                    <li>Person with Disability Welfare</li>
                    <li>Emergency Assistance Welfare</li>
                  </ul>
                </li>
                <li>
                  Formulation and advocacy of just and responsive social welfare
                  and development legislative agenda policies and plans as well
                  as ensuring this effective implementation of all programs.
                </li>
                <li>
                  Strengthen agency and community networks, linkages and
                  collaboration for a responsive and strategic delivery of
                  social protective services.
                </li>
              </ol>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Header>
            <h3 className="text-center">Pledge of Commitment</h3>
          </Card.Header>
          <Card.Body>
            <Card.Text style={{ fontSize: "1.4rem" }}>
              <p>
                We, the official and employees of the Municipal Social Welfare
                and Development Office of San Rafael, Bulacan pledge and commit
                to deliver quality services that will really meet the needs of
                our clientele as promised in this Citizen's Charter; to ensure
                their normal social fucntioning and maximum participation in
                community affairs.
              </p>
              <p>
                We, will demonstrate sensitivity and appropriate behavior and
                professionalism based on the social worker's code of ethics.
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
      <Container fluid>
        <Row>
          <Col md={12}>
            <OrgChart />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
