import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Spinner,
  Table,
  Badge,
  Form,
  Modal,
  Button,
} from "react-bootstrap";

import GlobalToast from "../components/GlobalToast";

import api from "../api/api";
import axios from "axios";

import { sortByDesc } from "../fn/functions";

const ChangeStatusModal = (props) => {
  const changeStatus = async () => {
    let statusChange = props.selInq.status === "0" ? 1 : 0;

    try {
      await api.put(`client_message/put/${props.selInq.inq_id}`, {
        status: statusChange,
      });
      props.getCtMsg();
      props.onHide();
    } catch (error) {
      props.onHide();
      alert(error);
    }

    props.onHide();
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change status into{" "}
          {props.selInq.status === "0" ? (
            <Badge bg="success">Solved</Badge>
          ) : (
            <Badge bg="warning">Unsolve</Badge>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ fontStyle: "italic" }}>
          Please confirm to update the status
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={changeStatus}>
          Confirm
        </Button>
        <Button variant="danger" onClick={props.onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const AdminInquiries = () => {
  let [searchTxt, setSearchTxt] = React.useState("");
  let [showToast, setShowToast] = React.useState(false);
  let [toastMsg, setToastMsg] = React.useState("Nothing to see here");
  let [ctMsg, setCtMsg] = React.useState(false);

  //
  let [modalShow, setModalShow] = React.useState(false);

  //selected inquiry
  let [selectedInq, setSelectedInq] = React.useState(0);

  const getCtMsg = async () => {
    let res = await api.get("client_message");
    let data = res.data.data;
    setCtMsg(sortByDesc(data));
  };

  const delCtMsg = async (id) => {
    let a = window.confirm(
      "Are you sure to delete this? You cannot undo this action."
    );
    if (a) {
      try {
        let headers = {
          Authorization: localStorage.getItem("token"),
          Accept: "application/json",
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*",
        };
        await axios
          .delete(`${process.env.REACT_APP_API}client_message/delete/${id}`, {
            headers: headers,
          })
          .then((res) => {
            setToastMsg(res.data.message);
            setShowToast(true);
          })
          .catch((error) => {
            setToastMsg(error);
            setShowToast(true);
          });
      } catch (error) {
        setToastMsg(error);
        setShowToast(true);
      }
    }
  };

  React.useEffect(() => {
    getCtMsg();
  }, [showToast]);

  const changeDateFormat = (dateToChange) => {
    let theDate = new Date(dateToChange);
    return theDate.toLocaleDateString("en-US");
  };

  const openModal = (inq_id, status) => {
    setSelectedInq({ inq_id, status });
    setModalShow(true);
  };

  return (
    <Container fluid>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item active>Inquiries</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col md={12}>
          <Form>
            <Form.Group className="mb-3" controlId="frmSearch">
              <Form.Control
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchTxt(e.target.value)}
              />
            </Form.Group>
          </Form>
          {!ctMsg ? (
            <>
              <Spinner animation="border" size="sm" /> Fetching data...
            </>
          ) : (
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Subject</th>
                  <th>Submitted by</th>
                  <th>Status</th>
                  <th>Submitted on</th>
                </tr>
              </thead>
              <tbody>
                {ctMsg
                  .filter((ctm) => {
                    if (searchTxt === "") {
                      return ctm;
                    }

                    return (
                      ctm.full_name.includes(searchTxt) ||
                      ctm.email_address.includes(searchTxt) ||
                      ctm.subject.includes(searchTxt)
                    );
                  })
                  .map((d) => (
                    <tr key={d.id}>
                      <td>{d.id}</td>
                      <td>
                        <Link to={"/admin/inquiries/" + d.id}>{d.subject}</Link>
                      </td>
                      <td>{d.full_name}</td>
                      <td>
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={openModal.bind(this, d.id, d.status)}
                        >
                          {d.status === "0" ? (
                            <Badge bg="warning">Unsolve</Badge>
                          ) : (
                            <Badge bg="success">Solved</Badge>
                          )}
                        </p>
                      </td>
                      <td>
                        {changeDateFormat(d.created_at)}{" "}
                        <Button
                          style={{ float: "right" }}
                          size="sm"
                          onClick={delCtMsg.bind(this, d.id)}
                          variant="danger"
                        >
                          X
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
      <GlobalToast
        onClose={() => setShowToast(false)}
        show={showToast}
        msg={toastMsg}
        title="Saved"
      />
      <ChangeStatusModal
        show={modalShow}
        selInq={selectedInq}
        onHide={() => setModalShow(false)}
        getCtMsg={getCtMsg}
      />
    </Container>
  );
};

export default AdminInquiries;
