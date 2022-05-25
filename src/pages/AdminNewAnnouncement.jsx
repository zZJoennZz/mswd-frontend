import React from "react";

import { Container, Breadcrumb, Row, Col, Form, Button } from "react-bootstrap";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import api from "../api/api";

const AdminNewAnnouncement = () => {
  let [annce, setAnnce] = React.useState({});
  let [annceBody, setAnnceBody] = React.useState({});
  let [annceImg, setAnnceImg] = React.useState(0);

  const onChangeUpdatedText = (e) => setAnnce(e.target.value);
  const sunEditorOnChange = (content) => setAnnceBody(content);
  const fileOnChange = (e) => {
    setAnnceImg(e.target.files);
  };

  const onSubmitUpdated = async (e) => {
    e.preventDefault();
    try {
      let frmData = new FormData();

      frmData.append("announcement_img", annceImg[0]);
      frmData.append("announcement_title", annce);
      frmData.append("announcement_body", annceBody);

      await api.post(`announcement/post`, frmData);
      alert("Announcement is now posted!");
      window.location.href = "/admin/announcements";
    } catch (error) {
      alert(error + ". Please contact your website administrator.");
    }
  };

  return (
    <Container fluid>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="/admin/announcements">
          Announcements
        </Breadcrumb.Item>
        <Breadcrumb.Item active>New Announcement</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col md={12}>
          <Form onSubmit={onSubmitUpdated}>
            <Form.Group className="mb-3">
              <Form.Label>Announcement Title</Form.Label>
              <Form.Control
                type="text"
                name="announcement_title"
                id="announcement_title"
                onChange={onChangeUpdatedText}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Announcement Body</Form.Label>
              <SunEditor
                height="500"
                name="announcement_body"
                id="announcement_body"
                onChange={sunEditorOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Announcement Image</Form.Label>
              <Form.Control
                type="file"
                name="file"
                id="file"
                onChange={fileOnChange}
              />
            </Form.Group>
            <Button type="submit">Save</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminNewAnnouncement;
