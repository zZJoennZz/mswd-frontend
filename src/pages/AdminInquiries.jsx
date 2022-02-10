import React from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Breadcrumb,
    Spinner,
    Table,
    Badge,
    Form,
    Modal,
    Button
} from 'react-bootstrap';

import api from '../api/api';

const ChangeStatusModal = (props) => {

    const changeStatus = async () => {
        let statusChange = props.selInq.status === "0" ? 1 : 0;
        
        try {
            await api.put(`client_message/put/${props.selInq.inq_id}`, {'status' : statusChange});
            props.getCtMsg();
            props.onHide();
        } catch (error) {
            props.onHide();
            alert(error);
        }

        props.onHide();
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Change status into {props.selInq.status === "0" ? <Badge bg="success">Solved</Badge> : <Badge bg="warning">Unsolve</Badge>}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={{ fontStyle: "italic" }}>
                    Please confirm to update the status
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={changeStatus}>Confirm</Button>
                <Button variant="danger" onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

const AdminInquiries = () => {

    let [ctMsg, setCtMsg] = React.useState(false);

    //
    let [modalShow, setModalShow] = React.useState(false);

    //selected inquiry
    let [selectedInq, setSelectedInq] = React.useState(0);

    const getCtMsg = async () => {
        let res = await api.get('client_message');
        setCtMsg(res.data.data);
    }

    React.useEffect(() => {
        getCtMsg();
    }, [])

    const changeDateFormat = (dateToChange) => {
        let theDate = new Date(dateToChange);
        return theDate.toLocaleDateString("en-US");
    }

    const openModal = (inq_id, status) => {
        setSelectedInq({inq_id, status});
        setModalShow(true)
    }

    return (
        <Container fluid>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Inquiries</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col md={12}>
                    <Form>
                        <Form.Group className="mb-3" controlId="frmSearch">
                            <Form.Control type="text" placeholder="Search" />
                        </Form.Group>
                    </Form>
                    {
                        !ctMsg ?
                            <><Spinner animation="border" size="sm" /> Fetching data...</>
                        :
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Subject</th>
                                        <th>Submitted by</th>
                                        <th>Status</th>
                                        <th>Submitted on</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ctMsg.map(d => 
                                            <tr key={d.id}>
                                                <td>{d.id}</td>
                                                <td><Link to="/">{d.subject}</Link></td>
                                                <td>{d.full_name}</td>
                                                <td><p style={{ cursor: "pointer" }} onClick={openModal.bind(this, d.id, d.status)}>{d.status === "0" ? <Badge bg="warning">Unsolve</Badge> : <Badge bg="success">Solved</Badge>}</p></td>
                                                <td>{changeDateFormat(d.created_at)}</td>
                                            </tr>    
                                        )
                                    }
                                </tbody>
                            </Table>
                    }
                </Col>
            </Row>
            <ChangeStatusModal 
                show={modalShow}
                selInq={selectedInq}
                onHide={() => setModalShow(false)}
                getCtMsg={getCtMsg}
            />
        </Container>  
    );
};

export default AdminInquiries;
