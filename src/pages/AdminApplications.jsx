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
              <Col md={4}>
                <div>Filter by:</div>
                <Form.Check
                  name="filter-by"
                  onClick={(e) => setFilterType("both")}
                  inline
                  label="Both"
                  type="radio"
                />
                <Form.Check
                  name="filter-by"
                  onClick={(e) => setFilterType("name")}
                  inline
                  label="Name"
                  type="radio"
                />
                <Form.Check
                  name="filter-by"
                  onClick={(e) => setFilterType("appnum")}
                  inline
                  label="Application #"
                  type="radio"
                />
              </Col>
              <Col md={8}>
                <div>Only show:</div>
                <Form.Check
                  onClick={(e) => setOnlyShow("all")}
                  name="only-show"
                  inline
                  label="All"
                  type="radio"
                />
                <Form.Check
                  onClick={(e) => setOnlyShow(1)}
                  name="only-show"
                  inline
                  label="Solo Parent"
                  type="radio"
                />
                <Form.Check
                  onClick={(e) => setOnlyShow(2)}
                  name="only-show"
                  inline
                  label="Person with Disabilities"
                  type="radio"
                />
                <Form.Check
                  onClick={(e) => setOnlyShow(3)}
                  name="only-show"
                  inline
                  label="Senior Citizen"
                  type="radio"
                />
              </Col>
            </Row>
          </Form>
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
                {applicationList
                  .filter((appList) => {
                    if (searchTxt === "" && onlyShow === "all") {
                      return appList;
                    }

                    let toReturn = false;

                    if (onlyShow === "" || onlyShow === "all") {
                      toReturn = true;
                    } else {
                      let currJson = JSON.parse(
                        appList.application_data
                      ).appliType;
                      if (currJson === onlyShow) {
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
                          JSON.parse(
                            appList.application_data
                          ).email_address.includes(searchTxt) ||
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
                  })
                  .map((d) => (
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
