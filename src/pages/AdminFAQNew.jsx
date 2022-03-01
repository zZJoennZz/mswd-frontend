import React from 'react';
import {
    Container,
    Row,
    Col,
    Breadcrumb,
    Form,
    Button
} from 'react-bootstrap';

import api from '../api/api';

const AdminFAQNew = () => {
    let [faq, setFaq] = React.useState({});

    const onSubmitFrm = async (e) => {
        e.preventDefault();
        try {
            await api.post('faq/post', faq)
                .then(res => {
                    alert(res.data.message);
                    window.location.href = "/admin/faqs";
                })
                .catch(err => alert(err + ". Please contact your website administrator."));
        } catch (error) {
            alert(error + ". Please contact your website administrator.");
        }
    }

    const onChangeText = (e) => setFaq({...faq, [e.target.name] : e.target.value})

    return (
        <Container fluid>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/faqs">FAQs</Breadcrumb.Item>
                <Breadcrumb.Item active>Add New</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col md={12}>
                    <Form onSubmit={onSubmitFrm}>
                        <Form.Group className="mb-3">
                            <Form.Label>Question</Form.Label>
                            <Form.Control type="text" name="question" id="question" onChange={onChangeText} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Answer</Form.Label>
                            <Form.Control type="text" name="answer" id="answer" onChange={onChangeText} />
                        </Form.Group>
                        
                        <Button type="submit">Save</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminFAQNew;