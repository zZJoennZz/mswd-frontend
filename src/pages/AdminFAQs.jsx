import React from 'react';
//import { Link } from 'react-router-dom';
import {
    Container,
    Breadcrumb,
    Button,
    Row,
    Col,
    Table,
    Spinner
} from 'react-bootstrap';

import api from '../api/api';

const AdminFAQs = () => {
    let [getFaq, setGetFaq] = React.useState(false);

    const getFaqRec = async () => {
        try {
            await api.get("faq")
                .then(res => setGetFaq(res.data.data))
                .catch(err => {
                    alert(err + ". Something went wrong, please contact your website administrator.")
                    setGetFaq(false);
                });
        } catch (error) {
            alert(error + ". Something went wrong, please contact your website administrator.");
            setGetFaq(false);
        }
    }

    const changeDateFormat = (dateToChange) => {
        let theDate = new Date(dateToChange);
        return theDate.toLocaleDateString("en-US");
    }

    React.useEffect(() => {
        getFaqRec();
    }, [])

    return (
        <Container fluid>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>FAQs</Breadcrumb.Item>
            </Breadcrumb>
            <Row className="mb-3">
                <Col md={12}>
                    <Button>Add New</Button>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    {
                        !getFaq ?
                            <><Spinner animation="border" size="sm" /> Fetching data...</>
                        :
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                        <th>Answer</th>
                                        <th>Submitted on</th>
                                        <th>Last Updated</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        getFaq.map(d => 
                                            <tr key={d.id}>
                                                <td>{d.question}</td>
                                                <td>{d.answer}</td>
                                                <td>{changeDateFormat(d.created_at)}</td>
                                                <td>{changeDateFormat(d.updated_at)}</td>
                                                <td>Edit Delete</td>
                                            </tr>    
                                        )
                                    }
                                </tbody>
                            </Table>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default AdminFAQs;