import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Breadcrumb,
  Spinner,
  Row,
  Col,
  Table,
  Badge,
  Form,
  Button,
} from "react-bootstrap";

import api from "../api/api";

const AdminSingleInquiry = () => {
  let { inqId } = useParams();
  let [inq, setInq] = React.useState(false);
  let [staffNote, setStaffNote] = React.useState("");

  const changeStatus = async () => {
    let statusChange = inq.status === "0" ? 1 : 0;

    try {
      await api.put(`client_message/put/${inqId}`, { status: statusChange });
      getInq();
    } catch (error) {
      alert(error + ". Please contact website administrator!");
    }
  };

  const saveStaffNote = async (e) => {
    try {
      if (staffNote.trim() !== "") {
        await api
          .put(`client_message/put_note/${inqId}`, { notes: staffNote })
          .then((data) => alert(data.data.message));
      } else {
        alert("Please don't leave note empty.");
      }
    } catch (error) {
      alert(error + ". Please contact website administrator!");
    }
  };

  const noteOnChange = (e) => setStaffNote(e.target.value);

  const getInq = async () => {
    try {
      let res = await api.get(`client_message/${inqId}`);
      setInq(res.data.data);
    } catch (error) {
      setInq(false);
      alert(error + ". Please contact website administrator!");
    }
  };

  React.useEffect(() => {
    getInq();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inqId]);

  return (
    <Container fluid>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="/admin/inquiries">Inquiries</Breadcrumb.Item>
        <Breadcrumb.Item active>
          {!inq ? (
            <>
              <Spinner animation="border" size="sm" /> Fetching data...
            </>
          ) : (
            <>
              {inq.subject} by {inq.full_name}
            </>
          )}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col md={12}>
          {!inq ? (
            <>
              <Spinner animation="border" size="sm" /> Fetching data...
            </>
          ) : (
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th colSpan={2}>{inq.full_name}'s Inquiry</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Email Address</th>
                  <td>
                    <a href={"mailto:" + inq.email_address}>
                      {inq.email_address}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>Contact Number</th>
                  <td>{inq.contact_number}</td>
                </tr>
                <tr>
                  <th>Full Name</th>
                  <td>{inq.full_name}</td>
                </tr>
                <tr>
                  <th>Inquiry Subject</th>
                  <td>{inq.subject}</td>
                </tr>
                <tr>
                  <th>Message</th>
                  <td>{inq.message}</td>
                </tr>
                <tr>
                  <th>Staff Notes</th>
                  <td>
                    <Form.Control
                      className="mb-2"
                      as="textarea"
                      defaultValue={inq.notes}
                      onChange={noteOnChange}
                    />
                    <Button onClick={saveStaffNote}>Save Notes</Button>
                  </td>
                </tr>
                <tr>
                  <th>
                    Status{" "}
                    <small className="text-muted">Click to change status</small>
                  </th>
                  <td>
                    <p style={{ cursor: "pointer" }} onClick={changeStatus}>
                      {inq.status === "0" ? (
                        <Badge bg="warning">Unsolve</Badge>
                      ) : (
                        <Badge bg="success">Solved</Badge>
                      )}
                    </p>
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminSingleInquiry;
