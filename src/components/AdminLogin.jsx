import React, { useState } from "react";

import api from "../api/api";

import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

import { Link } from "react-router-dom";

import mswdLogo from "../img/mswdo-logo.png";

//accepts argument if the user is logged
const AdminLogin = ({ checkAuth }) => {
  //initiate the state for the form values
  let [frmOnChange, setFrmOnChange] = useState({});

  //onChange function to set state the form values
  const textOnChange = (e) => {
    setFrmOnChange({ ...frmOnChange, [e.target.name]: e.target.value });
  };

  //submit form value function, async
  const frmOnSubmit = async (e) => {
    //stops the form to continue with normal procedure when submitting a form, ie. reloading the page or loading the action
    e.preventDefault();

    //initiate the form data
    const frmData = new FormData();
    frmData.append("email", frmOnChange.username);
    frmData.append("password", frmOnChange.password);

    try {
      let res = await api.post("signin", frmData);
      if (res.status === 200 && res.data.isAdmin === "1") {
        alert("You are logged in!");
        localStorage.removeItem("token");
        localStorage.setItem("token", `Bearer ` + res.data.token);
        checkAuth(true);
      } else {
        alert("You have NO authorization here!");
      }
    } catch (e) {
      alert("Logging in failed Error: " + e);
      localStorage.removeItem("token");
      checkAuth(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={4}></Col>
        <Col md={4} style={{ textAlign: "left" }}>
          <Row style={{ marginTop: "30vh" }} className="mb-3">
            <Col md={12} style={{ display: "flex" }}>
              <img
                height={80}
                style={{ margin: "auto" }}
                src={mswdLogo}
                alt="admin icon"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card className="p-3">
                <Form onSubmit={frmOnSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={textOnChange}
                      name="username"
                      id="username"
                      placeholder="Enter email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={textOnChange}
                      name="password"
                      id="password"
                      placeholder="Password"
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Form>
                <div className="small" style={{ textAlign: "right" }}>
                  <Link to="/">Return to website</Link>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>
  );
};

export default AdminLogin;
