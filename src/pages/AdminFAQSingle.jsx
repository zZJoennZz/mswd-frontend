import React from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Breadcrumb,
    Spinner, 
} from 'react-bootstrap';

import GlobalToast from '../components/GlobalToast';

import { useParams } from 'react-router-dom';

import api from '../api/api';

const AdminFAQSingle = () => {
    let { faqId } = useParams();
    let [faq, setFaq] = React.useState(false);
    let [showToast, setShowToast] = React.useState(false);
    let [toastMsg, setToastMsg] = React.useState("Nothing to see here");
    let [updated, setUpdated] = React.useState({});

    const saveChanges = async (e) => {
        e.preventDefault();
        let confirmChanges = window.confirm("Are you sure to save changes? You cannot undo this.");
        try {
            if (confirmChanges) {
                await api.put(`faq/put/${faqId}`, updated)
                    .then(res => {
                        setToastMsg(res.data.message);
                        setShowToast(true);
                    })
                .catch(err => {
                    setToastMsg(err + ". Somethin went wrong, please contact your website administrator.");
                    setShowToast(true);
                });
            }
        } catch (error) {
            setToastMsg(error + ". Somethin went wrong, please contact your website administrator.");
            setShowToast(true);
        }
    }

    const textOnChange = (e) => setUpdated({...updated, [e.target.name] : e.target.value});

    React.useEffect(() => {
        const getFaq = async () => {
            try {
                await api.get(`faq/${faqId}`)
                    .then(res => setFaq(res.data.data))
                    .catch(err => {
                        setToastMsg(err);
                        setShowToast(true);
                        setFaq(false);
                    })
            } catch (error) {
                setToastMsg(error + ". Something went wrong! Please refresh the page. If the problem persists, contact your website administrator.");
                setShowToast(true);
                setFaq(false);
            }
        }
        getFaq();
    }, [faqId]);

    return (
        <Container fluid>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/faqs">FAQs</Breadcrumb.Item>
                <Breadcrumb.Item active>Edit FAQ</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col md={12}>
                    {
                        !faq ?
                            <><Spinner animation="border" size="sm" /> Fetching data...</>
                        :
                            <Form onSubmit={saveChanges}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Question</Form.Label>
                                    <Form.Control type="text" onChange={textOnChange} id="question" name="question" defaultValue={faq.question} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Answer</Form.Label>
                                    <Form.Control type="text" onChange={textOnChange} id="answer" name="answer" defaultValue={faq.answer} />
                                </Form.Group>
                                <Button type="submit">Save Changes</Button>
                            </Form>
                    }
                </Col>
            </Row>
            <GlobalToast onClose={() => setShowToast(false)} show={showToast} msg={toastMsg} title="Saved" />
            {/* <ToastContainer position="bottom-end" className="p-3">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Saved</strong>
                        <small>Few seconds ago</small>
                    </Toast.Header>
                    <Toast.Body>{toastMsg}</Toast.Body>
                </Toast>
            </ToastContainer> */}
        </Container>
    )
}

export default AdminFAQSingle;