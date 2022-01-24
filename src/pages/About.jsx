import React from 'react';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap'

const About = () => {
  return (
    <div className="about pt-3">
        <h1>About</h1>
        <Container>
            <Row className="p-3">
                <Col md="3">
                    <h2>Vision Statement</h2>
                </Col>
                <Col md="9" style={{ fontSize: '24px' }} className="p-3">
                    Empowered families and individuals in the municipality who actively participate in community affairs and have normal level of social functioning.
                </Col>
            </Row>
            <Row>
                <Col md="3">
                    <h2>Mission Statement</h2>
                </Col>
                <Col md="9" style={{ fontSize: '24px' }} className="p-3">
                    Care, protection, and rehabilitation of the municipality's population which has the least in life, and needs social welfare assistance, and social work interventions to restore their normal social functioning, and participation in community affairs.
                </Col>
            </Row>
            <Row>
                <Col md="3">
                    <h2>Objectives</h2>
                </Col>
                <Col md="9" style={{ fontSize: '24px' }} className="p-3">
                    <p>Care, protect, and rehabilitate the physically and mentally handicapped and socially disabled constituents for effective social functioning;</p>
                    <p>Provide an integrated welfare package to its constituents on the basis of their needs & coordinate the service facilities required from such department/agencies. Governmental and Non-Governmental which can best provide them;</p>
                    <p>Arrest the further deterioration of the socially disabling or dehumanizing conditions of disadvantaged segment of the population at the community level.</p>
                    <p>Advocate for policies and measures addressing social welfare concerns.</p>
                </Col>
            </Row>
            <Row>
                <Col md="3">
                    <h2>Pledge of Commitment</h2>
                </Col>
                <Col md="9" style={{ fontSize: '24px' }} className="p-3">
                    <p>We, the official and employees of the Municipal Social Welfare and Development Office of San Rafael, Bulacan pledge and commit to deliver quality services that will really meet the needs of our clientele as promised in this Citizen's Charter; to ensure their normal social fucntioning and maximum participation in community affairs.</p>
                    <p>We, will demonstrate sensitivity and appropriate behavior and professionalism based on the social worker's code of ethics.</p>
                </Col>
            </Row>
        </Container>
    </div>
  );
};

export default About;
