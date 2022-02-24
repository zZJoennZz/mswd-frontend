import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
    Container,
    Breadcrumb,
    Row,
    Col,
    Spinner,
    Table,
    Form,
    Button,
    Badge
} from 'react-bootstrap';

import api from '../api/api';

const AdminAnnouncements = () => {

    let [annList, setAnnList] = useState(false);

    const getAnn = async () => {
        try {
            let res = await api.get("announcement");
            setAnnList(res.data.data);
        } catch (error) {
            alert(error + " Please contact website administrator!");
            setAnnList(false);
        }
    }

    const deleteAnn = async (annId) => {
        let confirmDelete = window.confirm("Are you sure to delete this? You will not be able to restore this record.");
        if (confirmDelete) {
            try {
                await api.delete(`announcement/delete/${annId}`)
                .then(data => alert(data.data.message))
                .catch(err => alert("Announcement NOT deleted. " + err));
                getAnn();
            } catch (error) {
                alert("Something went wrong. " + error);
            }
        }
    }

    useEffect(() => {
        getAnn();
    }, [])

    const changeDateFormat = (dateToChange) => {
        let theDate = new Date(dateToChange);
        return theDate.toLocaleDateString("en-US");
    }

    return (
        <Container fluid>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Announcements</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                
                <Col md={12}>
                <Form>
                    <Form.Group className="mb-3" controlId="frmSearch">
                        <Form.Control type="text" placeholder="Search" />
                    </Form.Group>
                </Form>
                <div className="mb-3">  
                    <Button href="/admin/announcements/new">Add New</Button>
                </div>
                    {
                        !annList ?
                            <><Spinner animation="border" size="sm" /> Fetching data...</>
                        :
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Announcement Title</th>
                                        <th>Posted On</th>
                                        <th>Last Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        annList.map(d => <tr key={d.id}>
                                            <td><Link to={`/admin/announcements/${d.id}`}>{d.announcement_title}</Link></td>
                                            <td>{changeDateFormat(d.created_at)}</td>
                                            <td>{changeDateFormat(d.updated_at)} <Badge onClick={deleteAnn.bind(this, d.id)} bg="danger" style={{ cursor: "pointer", float: "right" }}>X</Badge></td>
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

export default AdminAnnouncements;
