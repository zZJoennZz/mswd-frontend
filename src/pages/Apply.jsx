import React, { useState } from 'react';
//import { useParams } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Form,
    Alert
} from 'react-bootstrap';

import IdAppliSoloParent from '../components/IdAppliSoloParent';
import IdAppliPwd from '../components/IdAppliPwd';
import IdAppliSeniorCitizen from '../components/IdAppliSeniorCitizen';

const Apply = () => {
    //let { serviceId } = useParams();

    let [selectedCt, setSelectedCt] = useState(false);

    let [frmResult, setFrmResult] = useState("");

    const submitForm = (result) => {  
        try {
            setFrmResult(result);
        } catch (e) {
            setFrmResult("failed");
        }
    } 

    const appTypeOnChange = (e) => setSelectedCt(e.target.value);

    return (
        <Container className="mt-3 mb-3" style={{textAlign: "left"}}>
            { selectedCt !== 0 ? <span onClick={() => setSelectedCt(0)} style={{ cursor: "pointer" }}>{"< Back"}</span> : ""}
            {
                !selectedCt ?
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Select what kind of application</Form.Label>
                                <Form.Select name="application_type" id="application_type" onChange={appTypeOnChange}>
                                    <option>Select</option>
                                    <option value={1}>Solo parent</option>
                                    <option value={2}>PWD</option>
                                    <option value={3}>Senior Citizen</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                :
                    frmResult === "" ?  
                        <>
                            {selectedCt === "1" ? <IdAppliSoloParent submitApplication={submitForm} /> : ""}
                            
                            {selectedCt === "2" ? <IdAppliPwd submitApplication={submitForm} /> : ""}

                            {selectedCt === "3" ? <IdAppliSeniorCitizen submitApplication={submitForm} /> : ""}
                        </>
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
