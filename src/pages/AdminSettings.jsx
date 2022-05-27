import React from "react";
import { Container, Breadcrumb, Row, Col, Nav, Tab } from "react-bootstrap";

import AdminAddUser from "../components/AdminAddUser";
import AdminManageAcct from "../components/AdminManageAcct";
import AdminUserList from "../components/AdminUserList";

import apifrm from "../api/apifrm";

import api from "../api/api";

import GlobalToast from "../components/GlobalToast";

const AdminSettings = ({ userId }) => {
  let [userList, setUserList] = React.useState(false);
  let [userDetail, setUserDetail] = React.useState({
    name: "",
    password: "",
    email: "",
  });
  let [showToast, setShowToast] = React.useState(false);
  let [toastMsg, setToastMsg] = React.useState("Nothing for you to see.");

  const getUserList = async () => {
    try {
      api.get("getall").then((res) => setUserList(res.data.data));
    } catch (error) {
      setShowToast(true);
      setToastMsg(
        "Something went wrong. User not fetched. Please refresh the page or contact website administrator."
      );
    }
  };

  const onSubmitSaveUser = async (frmDat, userId) => {
    let data = {
      name: frmDat.name,
      last_name: frmDat.last_name,
      email: frmDat.email,
      password: frmDat.password,
    };
    try {
      await api
        .put(`updatesingle/${userId}`, data)
        .then((res) => {
          setShowToast(true);
          setToastMsg("Account changes successfully saved.");
        })
        .catch((err) => {
          setShowToast(true);
          setToastMsg(
            "Something went wrong. User changes is not saved. Please refresh the page or contact website administrator."
          );
        });
    } catch (error) {
      setShowToast(true);
      setToastMsg(
        "Something went wrong. User changes is not saved. Please refresh the page or contact website administrator."
      );
    }
  };

  const onSubmitAddNew = async (e) => {
    e.preventDefault();

    const frmData = new FormData();
    frmData.append("email", userDetail.email);
    frmData.append("password", userDetail.password);
    frmData.append("name", userDetail.name);
    frmData.append("last_name", userDetail.last_name);

    await apifrm
      .post("signup", frmData)
      .then((res) => {
        setShowToast(true);
        setToastMsg("User successfully added!");
        setUserDetail({
          name: "",
          last_name: "",
          password: "",
          email: "",
        });
      })
      .catch((e) => {
        setShowToast(true);
        setToastMsg(
          "Something went wrong. User is not saved. Please refresh the page or contact website administrator."
        );
      });
  };

  const onSubmitSave = async (frmData) => {
    try {
      let data = {
        name: frmData.name1,
        last_name: frmData.last_name1,
        email: frmData.email1,
        password: frmData.password1,
      };
      await api
        .put("updateprofile", data)
        .then((res) => {
          setShowToast(true);
          setToastMsg("You account changes successfully saved.");
        })
        .catch((e) => {
          setShowToast(true);
          setToastMsg(
            "Something went wrong. User changes is not saved. Please refresh the page or contact website administrator."
          );
        });
    } catch (error) {
      setShowToast(true);
      setToastMsg(
        "Something went wrong. User changes is not saved. Please refresh the page or contact website administrator."
      );
    }
  };

  const onChangeText = (e) =>
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });

  React.useEffect(() => {
    getUserList();
  }, [showToast]);

  return (
    <Container fluid>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item active>Settings</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col md={12}>
          <Tab.Container
            id="left-tabs"
            defaultActiveKey={userId !== 1 ? "manage" : "add"}
          >
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  {userId !== 1 ? (
                    ""
                  ) : (
                    <Nav.Item style={{ cursor: "pointer" }}>
                      <Nav.Link eventKey="add">Add New User</Nav.Link>
                    </Nav.Item>
                  )}
                  <Nav.Item style={{ cursor: "pointer" }}>
                    <Nav.Link eventKey="manage">Manage Account</Nav.Link>
                  </Nav.Item>
                  {userId !== 1 ? (
                    ""
                  ) : (
                    <Nav.Item style={{ cursor: "pointer" }}>
                      <Nav.Link eventKey="manage-user">Manage Users</Nav.Link>
                    </Nav.Item>
                  )}
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  {userId !== 1 ? (
                    ""
                  ) : (
                    <Tab.Pane eventKey="add">
                      <AdminAddUser
                        userDets={userDetail}
                        onSubmitAdd={onSubmitAddNew}
                        onChangeField={onChangeText}
                      />
                    </Tab.Pane>
                  )}
                  <Tab.Pane eventKey="manage">
                    <AdminManageAcct saveChanges={onSubmitSave} />
                  </Tab.Pane>
                  {userId !== 1 ? (
                    ""
                  ) : (
                    <Tab.Pane eventKey="manage-user">
                      <AdminUserList
                        saveChanges={onSubmitSaveUser}
                        usrList={userList}
                      />
                    </Tab.Pane>
                  )}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
      <GlobalToast
        onClose={() => setShowToast(false)}
        show={showToast}
        msg={toastMsg}
        title="Notification"
      />
    </Container>
  );
};

export default AdminSettings;
