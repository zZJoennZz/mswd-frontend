import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import axios from "axios";

const AdminEditUser = () => {
  const [isShowPass, setIsShowPass] = React.useState(false);
  let { userId } = useParams();
  let [userDetail, setUserDetail] = React.useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });

  let [userDetail1, setUserDetail1] = React.useState({
    name: "",
    last_name: "",
    email1: "",
    password1: "",
  });

  const onChangeText = (e) =>
    setUserDetail1({ ...userDetail1, [e.target.name]: e.target.value });

  const onSubmitSave = async (e) => {
    e.preventDefault();
    let headers = {
      Authorization: localStorage.getItem("token"),
      "Allow-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    let data = new FormData();

    data.append("name", userDetail1.name);
    data.append("last_name", userDetail1.last_name);
    data.append("email", userDetail1.email1);
    data.append("password", userDetail1.password1);

    try {
      await axios
        .post(`${process.env.REACT_APP_API}updatesingle/${userId}`, data, {
          headers,
        })
        .then((res) => alert("Success!"))
        .catch((err) => alert(err));
    } catch (error) {
      alert(error);
    }
  };

  React.useEffect(() => {
    let headers = {
      Authorization: localStorage.getItem("token"),
      Accept: "application/json",
      "Content-Type": "application/json",
      "Allow-Control-Allow-Origin": "*",
    };
    axios
      .get(`${process.env.REACT_APP_API}getsingle/${userId}`, { headers })
      .then((res) => setUserDetail(res.data.data))
      .catch((err) => alert(err));
  }, [userId]);

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <a href="/admin/settings">{"<"} Back</a>
        </Col>
        <Form autoComplete="off" onSubmit={onSubmitSave}>
          <input type="hidden" value="prayer" />
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  onChange={onChangeText}
                  defaultValue={userDetail.name}
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  onChange={onChangeText}
                  defaultValue={userDetail.last_name}
                  type="text"
                  name="last_name"
                  id="last_name"
                  autoComplete="off"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  onChange={onChangeText}
                  defaultValue={userDetail.email}
                  type="email"
                  name="email1"
                  id="email1"
                  autoComplete="off"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>{" "}
                <span
                  className="small text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsShowPass(!isShowPass)}
                >
                  {isShowPass ? "Hide password" : "Show password"}
                </span>
                <Form.Control
                  onChange={onChangeText}
                  type={isShowPass ? "text" : "password"}
                  name="password1"
                  id="password1"
                  autoComplete="off"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Button type="submit">Save Changes</Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default AdminEditUser;
