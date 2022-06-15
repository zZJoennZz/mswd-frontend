import React from "react";

import {
  Container,
  Breadcrumb,
  Button,
  Row,
  Col,
  Table,
  Spinner,
  Form,
} from "react-bootstrap";

import api from "../api/api";

import { sortByDesc } from "../fn/functions";

const AdminFAQs = () => {
  let [searchTxt, setSearchTxt] = React.useState("");
  let [getFaq, setGetFaq] = React.useState(false);

  const getFaqRec = async () => {
    try {
      await api
        .get("faq")
        .then((res) => {
          let data = res.data.data;
          setGetFaq(sortByDesc(data));
        })
        .catch((err) => {
          alert(
            err +
              ". Something went wrong, please contact your website administrator."
          );
          setGetFaq(false);
        });
    } catch (error) {
      alert(
        error +
          ". Something went wrong, please contact your website administrator."
      );
      setGetFaq(false);
    }
  };

  const deleteFaq = async (faqId) => {
    let confirmDelete = window.confirm(
      "Are you sure to delete this FAQ? You cannot undo this."
    );
    try {
      if (confirmDelete) {
        await api
          .delete(`faq/delete/${faqId}`)
          .then((res) => {
            alert(res.data.message);
            getFaqRec();
          })
          .catch((err) =>
            alert(
              err +
                ". Something went wrong, please contact your website administrator."
            )
          );
      }
    } catch (error) {
      alert(
        error +
          ". Something went wrong, please contact your website administrator"
      );
      getFaqRec();
    }
  };

  const changeDateFormat = (dateToChange) => {
    let theDate = new Date(dateToChange);
    return theDate.toLocaleDateString("en-US");
  };

  React.useEffect(() => {
    getFaqRec();
  }, []);

  return (
    <Container fluid>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item active>FAQs</Breadcrumb.Item>
      </Breadcrumb>
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
      </Row>
      <Row className="mb-3">
        <Col md={12}>
          <Button href="/admin/faqs/add">Add New</Button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {!getFaq ? (
            <>
              <Spinner animation="border" size="sm" /> Fetching data...
            </>
          ) : (
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Answer</th>
                  <th width="15%">Submitted on</th>
                  <th width="15%">Last Updated</th>
                  <th width="15%">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getFaq
                  .filter((x) => x.question.includes(searchTxt))
                  .map((d) => (
                    <tr key={d.id}>
                      <td>
                        <span
                          style={{
                            width: "15ch",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            display: "inline-block",
                            overflow: "hidden",
                          }}
                        >
                          {d.question}
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            width: "15ch",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            display: "inline-block",
                            overflow: "hidden",
                          }}
                        >
                          {d.answer}
                        </span>
                      </td>
                      <td>{changeDateFormat(d.created_at)}</td>
                      <td>{changeDateFormat(d.updated_at)}</td>
                      <td>
                        <Button size="sm" href={"/admin/faqs/" + d.id}>
                          Edit
                        </Button>{" "}
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={deleteFaq.bind(this, d.id)}
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
    </Container>
  );
};

export default AdminFAQs;
