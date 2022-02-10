import React, { useState, useEffect } from 'react';
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

const AdminApplications = () => {

    let [applicationList, setApplicationList] = useState(false);

    const getApp = async () => {
        let res = await api.get("appli");
        setApplicationList(res.data.data);
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
                                        <th>Status</th>
                                        <th>Submitted On</th>
                                        <th>Last Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        applicationList.map(d => <tr key={d.id}>
                                            <td>{d.application_id}</td>
                                            <td>{d.first_name + " " + d.middle_name + " " + d.last_name}</td>
                                            <td>{d.status === 0 ? <Badge bg="warning">Processing</Badge> : <Badge bg="success">Completed</Badge>}</td>
                                            <td>{changeDateFormat(d.created_at)}</td>
                                            <td>{changeDateFormat(d.updated_at)}</td>
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
