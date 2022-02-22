import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Breadcrumb
} from 'react-bootstrap';
//import api from '../api/api';

const AdminDashboard = ({ dashCtr }) => {
    let [currDay, setCurrDay] = useState('Loading...');
    let [currTime, setCurrTime] = useState('Loading...');

    const kFormatter = (num, digits) => {
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" }
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function(item) {
            return num >= item.value;
        });
        return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    }

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
                            <Card.Title>{dashCtr === "Loading..." ? dashCtr : kFormatter(dashCtr.inq_count)}</Card.Title>
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
                            <Card.Title>{dashCtr === "Loading..." ? dashCtr : kFormatter(dashCtr.app_count)}</Card.Title>
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
                            <Card.Title>{dashCtr === "Loading..." ? dashCtr : kFormatter(dashCtr.app_proce_count)}</Card.Title>
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
