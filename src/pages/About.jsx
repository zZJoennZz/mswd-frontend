import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import OrgChart from "../components/OrgChart";

const About = () => {
  return (
    <Container className="text-start about pt-3">
      <h1 className="mb-5">About Us</h1>
      <Card className="mb-3">
        <Card.Header>
          <h3>Vision Statement</h3>
        </Card.Header>
        <Card.Body>
          <Card.Text style={{ fontSize: "1.4rem" }}>
            Empowered families and individuals in the municipality who actively
            participate in community affairs and have normal level of social
            functioning.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header>
          <h3>Mission Statement</h3>
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
          <h3>Objectives</h3>
        </Card.Header>
        <Card.Body>
          <Card.Text style={{ fontSize: "1.4rem" }}>
            <p>
              Care, protect, and rehabilitate the physically and mentally
              handicapped and socially disabled constituents for effective
              social functioning;
            </p>
            <p>
              Provide an integrated welfare package to its constituents on the
              basis of their needs & coordinate the service facilities required
              from such department/agencies. Governmental and Non-Governmental
              which can best provide them;
            </p>
            <p>
              Arrest the further deterioration of the socially disabling or
              dehumanizing conditions of disadvantaged segment of the population
              at the community level.
            </p>
            <p>
              Advocate for policies and measures addressing social welfare
              concerns.
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header>
          <h3>Pledge of Commitment</h3>
        </Card.Header>
        <Card.Body>
          <Card.Text style={{ fontSize: "1.4rem" }}>
            <p>
              We, the official and employees of the Municipal Social Welfare and
              Development Office of San Rafael, Bulacan pledge and commit to
              deliver quality services that will really meet the needs of our
              clientele as promised in this Citizen's Charter; to ensure their
              normal social fucntioning and maximum participation in community
              affairs.
            </p>
            <p>
              We, will demonstrate sensitivity and appropriate behavior and
              professionalism based on the social worker's code of ethics.
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
      <Row>
        <Col md={12}>
          <OrgChart />
        </Col>
      </Row>
    </Container>
  );
};

export default About;
