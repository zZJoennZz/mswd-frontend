import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Breadcrumb,
    Row,
    Col,
    Spinner,
    Table,
    Badge,
    Form
} from 'react-bootstrap';

import api from '../api/api';
import { sortByDesc } from '../fn/functions';

const AdminApplications = () => {

    let [applicationList, setApplicationList] = useState(false);

    const deleteApp = async (appId) => {
        let a = window.confirm("Are you sure to delete this application? You cannot undo this action.");

        if (a) {
            await api.delete(`application/delete/${appId}`)
                .then(() => alert("Application deleted."))
                .then(() => getApp())
                .catch((e) => alert("Something went wrong. Contact your website administrator and send this message: " + e));
        }
    }

    const getApp = async () => {
        let res = await api.get("application");
        let data = res.data.data;
        setApplicationList(sortByDesc(data));
    }

    useEffect(() => {
        getApp();
    }, [])

    const changeDateFormat = (dateToChange) => {
        let theDate = new Date(dateToChange);
        return theDate.toLocaleDateString("en-US");
    }

    return (
        <Container fluid>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Applications</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col md={12}>
                <Form>
                    <Form.Group className="mb-3" controlId="frmSearch">
                        <Form.Control type="text" placeholder="Search" />
                    </Form.Group>
                </Form>
                    {
                        !applicationList ?
                            <><Spinner animation="border" size="sm" /> Fetching data...</>
                        :
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
                                    {
                                        applicationList.map(d => <tr key={d.id}>
                                            <td><Link to={`/admin/applications/${d.id}`}>{d.application_id}</Link></td>
                                            <td>{JSON.parse(d.application_data).first_name + " " + JSON.parse(d.application_data).middle_name + " " + JSON.parse(d.application_data).last_name}</td>
                                            <td>{JSON.parse(d.application_data).appliType === 1 ? "Solo Parent" : JSON.parse(d.application_data).appliType === 2 ? "PWD" : JSON.parse(d.application_data).appliType === 3 ? "Senior Citizen" : "" }</td>
                                            <td>{d.status === 0 ? <Badge bg="warning">Processing</Badge> : d.status === 2 ? <Badge bg="danger">Denied</Badge> : <Badge bg="success">Completed</Badge>}</td>
                                            <td>{changeDateFormat(d.created_at)}</td>
                                            <td>{changeDateFormat(d.updated_at)} <Badge onClick={deleteApp.bind(this, d.id)} bg="danger" style={{ cursor: "pointer", float: "right" }}>X</Badge></td>
                                        </tr>)
                                    }
                                </tbody>
                            </Table>     
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default AdminApplications;
