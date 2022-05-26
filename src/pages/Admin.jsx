import React, { useState, useEffect } from "react";
import api from "../api/api";
// import { useParams } from 'react-router-dom';
// import apifrm from '../api/apifrm';

import AdminNavBar from "../components/AdminNavBar";
import AdminSideBar from "../components/AdminSideBar";
import AdminLogin from "../components/AdminLogin";

import AdminDashboard from "./AdminDashboard";
import AdminApplications from "./AdminApplications";
import AdminSingleApplication from "./AdminSingleApplication";
import AdminInquiries from "./AdminInquiries";
import AdminAnnouncements from "./AdminAnnouncements";
import AdminSingleAnnouncement from "./AdminSingleAnnouncement";
import AdminNewAnnouncement from "./AdminNewAnnouncement";
import AdminSingleInquiry from "./AdminSingleInquiry";
import AdminSettings from "./AdminSettings";
import AdminFAQs from "./AdminFAQs";
import AdminFAQNew from "./AdminFAQNew";
import AdminFAQSingle from "./AdminFAQSingle";
import AdminOrganization from "./AdminOrganization";
// import AdminDivision from './AdminDivision';

import { Routes, Route } from "react-router-dom";

import "./admin.css";
import { Container, Row, Col, Spinner } from "react-bootstrap";

const Admin = () => {
  let [isAuth, setIsAuth] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [dashCtr, setDashCtr] = useState(false);
  let [currId, setCurrId] = useState(0);
  let [currName, setCurrName] = useState({
    name: "",
    last_name: "",
  });

  const checkToken = async () => {
    setIsLoading(true);

    try {
      let res = await api.post("validate");
      if (res.data.success) {
        setCurrId(res.data.id);
        setCurrName({
          name: res.data.name,
          last_name: res.data.last_name,
        });
        setIsAuth(true);
      } else {
        setCurrId(0);
        setIsAuth(false);
      }
    } catch (e) {
      console.log(e);
      setCurrId(0);
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const logOut = async () => {
    setIsLoading(true);
    await api.post("signout");
    setCurrId(0);
    setIsAuth(false);
    setIsLoading(false);
  };

  const checkAuth = (result) => {
    setIsLoading(true);
    if (result) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const getCtr = async () => {
      let res = await api.get("dashboard/count");
      setDashCtr(res.data);
    };
    getCtr();
    checkToken();
  }, [isAuth]);

  return (
    <div>
      {isLoading ? (
        <div className="m-5">
          <Spinner animation="grow" variant="info" />
        </div>
      ) : isAuth ? (
        <>
          <AdminNavBar currentUser={currName} logOut={logOut} />
          <Container fluid>
            <Row>
              <Col
                as="nav"
                id="sidebar"
                md={3}
                lg={2}
                className="d-md-block bg-light sidebar"
              >
                <AdminSideBar />
              </Col>
              <Col
                as="main"
                style={{ minHeight: "90vh", overflow: "auto" }}
                md={9}
                lg={10}
                className="text-start ml-sm-auto px-md-4 py-4 admin-body"
              >
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={<AdminDashboard dashCtr={dashCtr} />}
                  />
                  <Route
                    exact
                    path="/applications"
                    element={<AdminApplications />}
                  />
                  <Route
                    exact
                    path="/applications/:appId"
                    element={<AdminSingleApplication />}
                  />
                  <Route exact path="/inquiries" element={<AdminInquiries />} />
                  <Route
                    exact
                    path="/inquiries/:inqId"
                    element={<AdminSingleInquiry />}
                  />
                  <Route
                    exact
                    path="/announcements"
                    element={<AdminAnnouncements />}
                  />
                  <Route
                    exact
                    path="/announcements/:annId"
                    element={<AdminSingleAnnouncement />}
                  />
                  <Route
                    exact
                    path="/announcements/new"
                    element={<AdminNewAnnouncement />}
                  />
                  <Route
                    exact
                    path="/settings"
                    element={<AdminSettings userId={currId} />}
                  />
                  <Route exact path="/faqs" element={<AdminFAQs />} />
                  <Route
                    exact
                    path="/faqs/:faqId"
                    element={<AdminFAQSingle />}
                  />
                  <Route exact path="/faqs/add" element={<AdminFAQNew />} />
                  <Route
                    exact
                    path="/organization"
                    element={<AdminOrganization />}
                  />
                </Routes>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <AdminLogin checkAuth={checkAuth} />
      )}
    </div>
  );
};

export default Admin;
