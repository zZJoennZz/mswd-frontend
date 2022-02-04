import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Alert
} from 'react-bootstrap';

import apifrm from '../api/apifrm';

const Apply = () => {
    let { serviceId } = useParams();
    let [req, setReq] = useState(false);
    let [frmDat, setFrmDat] = useState({});
    let [frmResult, setFrmResult] = useState("");

    const submitForm = async (e) => {
        e.preventDefault();

        const frmData = new FormData();

        for (let i = 0; i < req.length; i++) {
            frmData.append(`file[${i}]`, req[i]);
        }

        Object.keys(frmDat).map(key => 
            frmData.append(key, frmDat[key])
        );
        frmData.append("service_id", serviceId);
        
        try {
            let res = await apifrm.post("appli", frmData);
            setFrmResult(res.data.application_id);
        } catch (e) {
            setFrmResult("failed");
        }
    } 

    const fileOnChange = (e) => {
        setReq(e.target.files);
    }

    const textOnChange = (e) => {
        setFrmDat({...frmDat, [e.target.name] : e.target.value});
    }

    return (
        <Container className="mt-3 mb-3" style={{textAlign: "left"}}>
            {
                frmResult === "" ?  
                    <Form onSubmit={submitForm}>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name="first_name" id="first_name" onChange={textOnChange} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Middle Name</Form.Label>
                                    <Form.Control type="text" name="middle_name" id="middle_name" onChange={textOnChange} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="last_name" id="last_name" onChange={textOnChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select name="gender" id="gender" onChange={textOnChange}>
                                        <option>Open to select gender</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Birthday</Form.Label>
                                    <Form.Control type="date" name="birthday" id="birthday" onChange={textOnChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="email" name="email_address" id="email_address" onChange={textOnChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control type="text" name="contact_number" id="contact_number" onChange={textOnChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control type="file" name="file" accept="application/pdf" id="chooseFile" multiple onChange={fileOnChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Text id="formNote" muted>
                                    Please complete all the fields in this form and only upload .PDF files (You can also upload multiple files too.).
                                </Form.Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Button variant="primary" type="submit">
                                    Submit Application
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                :
                    frmResult !== "failed" ?
                        <Alert variant="success">
                            Your application have been submitted successfully! Please save your application # here for tracking: <b>{frmResult}</b>
                        </Alert>
                    :
                        <Alert variant="danger">
                            Something went wrong and your application isn't submitted. Contact us at <Alert.Link href="/contact-us">here</Alert.Link>.
                        </Alert>
            }
            
        </Container>
    );
};

export default Apply;
