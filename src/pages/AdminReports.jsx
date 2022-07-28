import React from "react";

import { Container, Breadcrumb, Row, Col, Form } from "react-bootstrap";

import AdminIdReport from "../components/AdminIdReport";

const AdminReports = () => {
  let [repType, setRepType] = React.useState("");
  let [repCat, setRepCat] = React.useState("");
  let [repStatus, setRepStatus] = React.useState("");

  const updateCat = (catVal) => {
    if (catVal === "new") {
      setRepStatus(false);
      setRepCat("new");
    } else if (catVal === "loss") {
      setRepStatus(false);
      setRepCat("loss");
    } else if (catVal === "renew") {
      setRepStatus(false);
      setRepCat("renew");
    } else if (catVal === 0) {
      setRepCat("");
      setRepStatus(0);
    } else if (catVal === 2) {
      setRepCat("");
      setRepStatus(2);
    } else if (catVal === 1) {
      setRepCat("");
      setRepStatus(1);
    }

    return 0;
  };

  return (
    <Container fluid>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item active>Reports</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col>
          <h2>Select report to generate</h2>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Check
            type="radio"
            id="report-type"
            name="report-type"
            label="Solo Parents"
            onClick={() => setRepType(1)}
          />
          <Form.Check
            type="radio"
            id="report-type"
            name="report-type"
            label="PWD"
            onClick={() => setRepType(2)}
          />
          <Form.Check
            type="radio"
            id="report-type"
            name="report-type"
            label="Senior Citizen"
            onClick={() => setRepType(3)}
          />
        </Col>
        <Col md={6}>
          {repType === "" ? (
            ""
          ) : (
            <>
              <Form.Check
                type="radio"
                id="report-cat"
                name="report-cat"
                label="New"
                onClick={updateCat.bind(this, "new")}
              />
              <Form.Check
                type="radio"
                id="report-cat"
                name="report-cat"
                label="Loss"
                onClick={updateCat.bind(this, "loss")}
              />
              {repType === 2 ? (
                <Form.Check
                  type="radio"
                  id="report-cat"
                  name="report-cat"
                  label="Renew"
                  onClick={updateCat.bind(this, "renew")}
                />
              ) : (
                ""
              )}
              <Form.Check
                type="radio"
                id="report-cat"
                name="report-cat"
                label="Processing"
                onClick={updateCat.bind(this, 0)}
              />
              <Form.Check
                type="radio"
                id="report-cat"
                name="report-cat"
                label="Approved"
                onClick={updateCat.bind(this, 1)}
              />
              <Form.Check
                type="radio"
                id="report-cat"
                name="report-cat"
                label="Denied"
                onClick={updateCat.bind(this, 2)}
              />
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {repType === "" && (repCat === "" || repStatus === "") ? (
            <small>Please select report to generate first</small>
          ) : (
            <AdminIdReport
              repType={repType}
              repCat={repCat}
              repStatus={repStatus}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminReports;
