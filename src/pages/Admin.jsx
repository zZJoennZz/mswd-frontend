import React, { useState, useEffect } from 'react';
import api from '../api/api';
// import { useParams } from 'react-router-dom';
// import apifrm from '../api/apifrm';

import AdminNavBar from '../components/AdminNavBar';
import AdminSideBar from '../components/AdminSideBar';
import AdminLogin from '../components/AdminLogin';

import AdminDashboard from './AdminDashboard';
import AdminApplications from './AdminApplications';
import AdminSingleApplication from './AdminSingleApplication';
import AdminInquiries from './AdminInquiries';
import AdminAnnouncements from './AdminAnnouncements';
import AdminSingleAnnouncement from './AdminSingleAnnouncement';
import AdminNewAnnouncement from './AdminNewAnnouncement';
import AdminSingleInquiry from './AdminSingleInquiry';

import { Routes, Route } from 'react-router-dom';

import './admin.css';
import {
    Container,
    Row,
    Col,
    Spinner
  } from "react-bootstrap";

const Admin = () => {

    let [isAuth, setIsAuth] = useState(false);
    let [isLoading, setIsLoading] = useState(true);
    let [dashCtr, setDashCtr] = useState(false);

    const checkToken = async () => {
        setIsLoading(true);
        
        try {
            let res = await api.post("validate");
            if (res.data.success) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
        } catch(e) {
            console.log(e);
            setIsLoading(false);
        }

        setIsLoading(false);
    }

    const logOut = async () => {
        setIsLoading(true);
        await api.post("signout");

        setIsAuth(false);
        setIsLoading(false);
    }

    const checkAuth = (result) => {
        setIsLoading(true);
        if (result) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        const getCtr = async () => {
            let res = await api.get('dashboard/count');
            setDashCtr(res.data);
        }
        getCtr();
        checkToken();
    }, [isAuth])
    
    return (
        <div>

            {
                isLoading ?
                    <div className="m-5"><Spinner animation="grow" variant="info" /></div>
                :   
                    isAuth ?
                        <>
                            <AdminNavBar logOut={logOut} />
                            <Container fluid>
                                <Row>
                                    <Col as="nav" id="sidebar" md={3} lg={2} className="d-md-block bg-light sidebar">
                                        <AdminSideBar />
                                    </Col>
                                    <Col as="main" style={{ height: "100vh" }} md={9} lg={10} className="text-start ml-sm-auto px-md-4 py-4">
                                        <Routes>
                                            <Route exact path="/" element={<AdminDashboard dashCtr={dashCtr} />} />
                                            <Route exact path="/applications" element={<AdminApplications />} />
                                            <Route exact path="/applications/:appId" element={<AdminSingleApplication />} />
                                            <Route exact path="/inquiries" element={<AdminInquiries />} />
                                            <Route exact path="/inquiries/:inqId" element={<AdminSingleInquiry />} />
                                            <Route exact path="/announcements" element={<AdminAnnouncements />} />
                                            <Route exact path="/announcements/:annId" element={<AdminSingleAnnouncement />} />
                                            <Route exact path="/announcements/new" element={<AdminNewAnnouncement />} />
                                        </Routes>
                                    </Col>
                                </Row>
                            </Container>
                        </>
                    :
                        <AdminLogin checkAuth={checkAuth} />    
            }
            
        </div>
    );
};

export default Admin;
