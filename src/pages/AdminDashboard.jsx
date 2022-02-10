import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Breadcrumb
} from 'react-bootstrap';

const AdminDashboard = () => {
    let [currDay, setCurrDay] = useState('Loading...');
    let [currTime, setCurrTime] = useState('Loading...');

    const getCurrentDay = () => {
        let currDate = new Date();
        let days = [
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
        ];
        setCurrDay(days[currDate.getDay()-1]);
    }

    const getCurrTime = () => {
        let currTime = new Date();
        var ampm = currTime.getHours() >= 12 ? ' PM' : ' AM';
        var currDate = currTime.getMonth() + 1 + "/" + currTime.getDate() + "/" + currTime.getFullYear(); 
        setCurrTime(currDate + ' - ' + currTime.getHours() + ":" + currTime.getMinutes() + ":" + currTime.getSeconds() + ampm);
    }

    setInterval(() => {
        getCurrentDay();
        getCurrTime();
    }, 1000);

    return (
        <Container fluid>
            <Breadcrumb>
                <Breadcrumb.Item active>Admin Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col md="12">
                    <h1 onClick={getCurrTime} className="h2">Dashboard</h1>
                    <p className="text-muted">Summary of businesses</p>
                </Col>
            </Row>
            <Row>
                <Col md={6} lg={3}>
                    <Card className="mb-3" border="primary" style={{ minHeight: "160px" }}>
                        <Card.Header as="h5">Inquiries</Card.Header>
                        <Card.Body>
                            <Card.Title>23k</Card.Title>
                            <Card.Text>
                                Total # of Inquiries
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={3}>
                    <Card className="mb-3" border="warning" style={{ minHeight: "160px" }}>
                        <Card.Header as="h5">Applications</Card.Header>
                        <Card.Body>
                            <Card.Title>112</Card.Title>
                            <Card.Text>
                                Total # of Applications
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={3}>
                    <Card className="mb-3" border="info" style={{ minHeight: "160px" }}>
                        <Card.Header as="h5">Processing</Card.Header>
                        <Card.Body>
                            <Card.Title>2k</Card.Title>
                            <Card.Text>
                                Total # of Processing Applications
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="mb-3" border="secondary" style={{ minHeight: "160px" }}>
                        <Card.Header as="h5">Date and Time</Card.Header>
                        <Card.Body>
                            <Card.Title>{currDay}</Card.Title>
                            <Card.Text>
                                {currTime}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>    
    );
};

export default AdminDashboard;
