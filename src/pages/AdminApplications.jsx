import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Breadcrumb,
  Row,
  Col,
  Spinner,
  Table,
  Badge,
  Form,
  Card,
} from "react-bootstrap";

import api from "../api/api";
import { sortByDesc } from "../fn/functions";

const AdminApplications = () => {
  let [searchTxt, setSearchTxt] = React.useState("");
  let [applicationList, setApplicationList] = useState(false);
  let [filterType, setFilterType] = useState("");
  let [onlyShow, setOnlyShow] = useState("all");

  const deleteApp = async (appId) => {
    let a = window.confirm(
      "Are you sure to delete this application? You cannot undo this action."
    );

    if (a) {
      await api
        .delete(`application/delete/${appId}`)
        .then(() => alert("Application deleted."))
        .then(() => getApp())
        .catch((e) =>
          alert(
            "Something went wrong. Contact your website administrator and send this message: " +
              e
          )
        );
    }
  };

  const getApp = async () => {
    let res = await api.get("application");
    let data = res.data.data;
    setApplicationList(sortByDesc(data));
  };

  useEffect(() => {
    getApp();
  }, []);

  const changeDateFormat = (dateToChange) => {
    let theDate = new Date(dateToChange);
    return theDate.toLocaleDateString("en-US");
  };

  let filteredApps = !applicationList
    ? {}
    : applicationList.filter((appList) => {
        if (searchTxt === "" && onlyShow === "all") {
          return appList;
        }

        let toReturn = false;

        if (onlyShow === "" || onlyShow === "all") {
          toReturn = true;
        } else {
          let currJson = JSON.parse(appList.application_data);
          if (currJson.appliType === onlyShow) {
            toReturn = true;
          }

          if (currJson.appli_type === onlyShow) {
            toReturn = true;
          }
        }

        if (toReturn) {
          if (filterType === "both") {
            let name =
              JSON.parse(appList.application_data).first_name +
              " " +
              JSON.parse(appList.application_data).middle_name +
              " " +
              JSON.parse(appList.application_data).last_name;
            toReturn =
              name.includes(searchTxt) ||
              JSON.parse(appList.application_data).email_address.includes(
                searchTxt
              ) ||
              appList.application_id.includes(searchTxt);
          } else if (filterType === "name") {
            let name =
              JSON.parse(appList.application_data).first_name +
              " " +
              JSON.parse(appList.application_data).middle_name +
              " " +
              JSON.parse(appList.application_data).last_name;
            toReturn = name.includes(searchTxt);
          } else {
            toReturn = appList.application_id.includes(searchTxt);
          }
        }

        return toReturn;
      });

  const kFormatter = (num, digits) => {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0";
  };

  return (
    <Container fluid>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item active>Applications</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col md={12}>
          <Form>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group className="mb-3" controlId="frmSearch">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearchTxt(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <div>Filter by:</div>
                <Form.Check
                  name="filter-by"
                  onClick={() => setFilterType("both")}
                  inline
                  label="Both"
                  type="radio"
                />
                <Form.Check
                  name="filter-by"
                  onClick={() => setFilterType("name")}
                  inline
                  label="Name"
                  type="radio"
                />
                <Form.Check
                  name="filter-by"
                  onClick={() => setFilterType("appnum")}
                  inline
                  label="Application #"
                  type="radio"
                />
              </Col>
              <Col>
                <div>Only show:</div>
                <Form.Check
                  onClick={() => setOnlyShow("all")}
                  name="only-show"
                  inline
                  label="All"
                  type="radio"
                />
                <Form.Check
                  onClick={() => setOnlyShow(1)}
                  name="only-show"
                  inline
                  label="Solo Parent"
                  type="radio"
                />
                <Form.Check
                  onClick={() => setOnlyShow(2)}
                  name="only-show"
                  inline
                  label="Person with Disabilities"
                  type="radio"
                />
                <Form.Check
                  onClick={() => setOnlyShow(3)}
                  name="only-show"
                  inline
                  label="Senior Citizen"
                  type="radio"
                />
                <Form.Check
                  onClick={() => setOnlyShow("loss")}
                  name="only-show"
                  inline
                  label="Loss"
                  type="radio"
                />
              </Col>
            </Row>
          </Form>
          <Row>
            <Col md={6} lg={3}>
              <Card
                className="mb-3"
                border="warning"
                style={{ minHeight: "160px" }}
              >
                <Card.Header as="h5">Processing</Card.Header>
                <Card.Body>
                  <Card.Title>
                    {!applicationList
                      ? ""
                      : kFormatter(
                          filteredApps.filter((app) => app.status === 0).length
                        )}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card
                className="mb-3"
                border="success"
                style={{ minHeight: "160px" }}
              >
                <Card.Header as="h5">Completed</Card.Header>
                <Card.Body>
                  <Card.Title>
                    {!applicationList
                      ? ""
                      : kFormatter(
                          filteredApps.filter((app) => app.status === 3).length
                        )}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card
                className="mb-3"
                border="danger"
                style={{ minHeight: "160px" }}
              >
                <Card.Header as="h5">Denied</Card.Header>
                <Card.Body>
                  <Card.Title>
                    {!applicationList
                      ? ""
                      : kFormatter(
                          filteredApps.filter((app) => app.status === 2).length
                        )}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card
                className="mb-3"
                border="secondary"
                style={{ minHeight: "160px" }}
              >
                <Card.Header as="h5">Renew (for PWD)</Card.Header>
                <Card.Body>
                  <Card.Title>
                    {!applicationList
                      ? ""
                      : kFormatter(
                          filteredApps.filter(
                            (app) =>
                              JSON.parse(app.application_data).appli_type ===
                              "renew"
                          ).length
                        )}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {!applicationList ? (
            <>
              <Spinner animation="border" size="sm" /> Fetching data...
            </>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Full Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Submitted On</th>
                  <th>Last Update</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((d) => (
                  <tr key={d.id}>
                    <td>
                      <Link to={`/admin/applications/${d.id}`}>
                        {d.application_id}
                      </Link>
                    </td>
                    <td>
                      {JSON.parse(d.application_data).first_name +
                        " " +
                        JSON.parse(d.application_data).middle_name +
                        " " +
                        JSON.parse(d.application_data).last_name}
                    </td>
                    <td>
                      {JSON.parse(d.application_data).appliType === 1
                        ? "Solo Parent"
                        : JSON.parse(d.application_data).appliType === 2
                        ? "PWD"
                        : JSON.parse(d.application_data).appliType === 3
                        ? "Senior Citizen"
                        : ""}
                    </td>
                    <td>
                      {d.status === 0 ? (
                        <Badge bg="warning">Processing</Badge>
                      ) : d.status === 2 ? (
                        <Badge bg="danger">Denied</Badge>
                      ) : (
                        <Badge bg="success">Completed</Badge>
                      )}
                    </td>
                    <td>{changeDateFormat(d.created_at)}</td>
                    <td>
                      {changeDateFormat(d.updated_at)}{" "}
                      <Badge
                        onClick={deleteApp.bind(this, d.id)}
                        bg="danger"
                        style={{ cursor: "pointer", float: "right" }}
                      >
                        X
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminApplications;
