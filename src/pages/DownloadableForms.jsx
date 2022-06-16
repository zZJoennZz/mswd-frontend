import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const DownloadableForms = () => {
  return (
    <div className="about pt-3" style={{ minHeight: "90vh" }}>
      <Container style={{ textAlign: "left" }}>
        <h1 style={{ textAlign: "left" }}>Downloadable Forms</h1>
        <Row className="p-3">
          <Col md={12} className="mb-5">
            <h2>OSCA ID Application Form</h2>
            <Button
              href="https://u.pcloud.link/publink/show?code=XZAHbXVZRUgqSVvh3BLNRScKYbHwVfJ1enky"
              target="_blank"
              rel="noreferrer"
            >
              Download
            </Button>
          </Col>
          <Col md={12} className="mb-5">
            <h2>PMC Couple Information Sheet</h2>
            <Button
              href="https://u.pcloud.link/publink/show?code=XZrHbXVZuQll6EPKDrSrCBPOkSoAK06ADMK7"
              target="_blank"
              rel="noreferrer"
            >
              Download
            </Button>
          </Col>
          <Col md={12} className="mb-5">
            <h2>
              Philippine Registry Form for Persons With Disability Ver. 4.0
            </h2>
            <Button
              href="https://u.pcloud.link/publink/show?code=XZqrCRVZCu6IfW8zwyuatjMuGGPfFSOYnXvV"
              target="_blank"
              rel="noreferrer"
            >
              Download
            </Button>
          </Col>
          <Col md={12} className="mb-5">
            <h2>Senior Citizen General Intake Sheet</h2>
            <Button
              href="https://u.pcloud.link/publink/show?code=XZ7zbXVZHq5N17iwNqu0O5ELnpDnM8SvsdBy"
              target="_blank"
              rel="noreferrer"
            >
              Download
            </Button>
          </Col>
          <Col md={12} className="mb-3">
            <h2>Application Form for Solo Parent</h2>
            <Button
              href="https://u.pcloud.link/publink/show?code=XZ5zbXVZgWYl5IPIiDbWdakdBIWmQYG9q0bV"
              target="_blank"
              rel="noreferrer"
            >
              Download
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DownloadableForms;
