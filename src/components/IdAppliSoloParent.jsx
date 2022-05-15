import React, { useState, useRef } from 'react';
import {
    Form,
    Button,
    Row,
    Col,
    Spinner
} from 'react-bootstrap';

import apifrm from '../api/apifrm';

const IdAppliSoloParent = ({ submitApplication }) => {
    let [frmData, setFrmData] = useState({'appliType': 1});
    let [pic, setPic] = useState(false);
    let [sig, setSig] = useState(false);
    let [docs, setDocs] = useState(false);
    let [agreeCheck, setAgreeCheck] = useState(true);
    let [fcHolder, setFcHolder] = useState({
        fc_name : '',
        fc_age : '',
        fc_bday : '',
        fc_mi : '',
        fc_rel : '',
        fc_status : ''
    });
    let [isSubmit, setIsSubmit] = useState(false);
    //let [famComp, setFamComp] = useState("");
    const famComRef = useRef('');

    const submitForm = async (e) => {
        setIsSubmit(true);
        e.preventDefault();
        
        try {
            let formData = new FormData();
            formData.append('application_data', JSON.stringify(frmData));
            formData.append('application_pic', pic[0]);
            formData.append('application_sig', sig[0]);
            for (let i = 0; i < docs.length; i++) {
                formData.append(`docs[${i}]`, docs[i])
            }

            let res = await apifrm.post("application/post", formData);
            submitApplication(res.data.application_id);
            setIsSubmit(false);
        } catch (error) {
            submitApplication("failed");
            alert(error + ". Please contact your website administrator.");
            setIsSubmit(false);
        }
    }

    const textOnChange = (e) => {
        setFrmData({...frmData, [e.target.name] : e.target.value});
    }

    const picOnChange = (e) => {
        setPic(e.target.files);
    }

    const sigOnChange = (e) => {
        setSig(e.target.files);
    }

    const docsOnChange = (e) => {
        setDocs(e.target.files);
    }

    const fcOnChange = (e) => setFcHolder({...fcHolder, [e.target.name] : e.target.value});

    const setFcField = () => {
        //setFamComp(famComp + fcHolder.fc_name + ',' + fcHolder.fc_rel + ',' + fcHolder.fc_age + ',' + fcHolder.fc_status + ',' + fcHolder.fc_bday + ',' + fcHolder.fc_mi + '\n');
    
        setFcHolder({
            fc_name : '',   
            fc_age : '',
            fc_bday : '',
            fc_mi : '',
            fc_rel : '',
            fc_status : ''
        });

        if (famComRef.current.value.trim() === "") {
            famComRef.current.value += fcHolder.fc_name + ',' + fcHolder.fc_rel + ',' + fcHolder.fc_age + ',' + fcHolder.fc_status + ',' + fcHolder.fc_bday + ',' + fcHolder.fc_mi;
        } else {
            famComRef.current.value += '\n' + fcHolder.fc_name + ',' + fcHolder.fc_rel + ',' + fcHolder.fc_age + ',' + fcHolder.fc_status + ',' + fcHolder.fc_bday + ',' + fcHolder.fc_mi;
        }
        
        
        setFrmData({...frmData, fam_composition: famComRef.current.value});
    }

    // const testBtn = (e) => {
    //     let lines = frmData.fam_composition.split('\n');
    //     for (let i = 0; i < lines.length; i++) {
    //         console.log(lines[i]);
    //     }
    // }

    return (
        <div>
            <h2 className="text-uppercase">Application Form for Solo Parents</h2>
            <Form onSubmit={submitForm}>
                <Row>
                    <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="first_name" id="first_name" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control type="text" name="middle_name" id="middle_name" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="last_name" id="last_name" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                        <Form.Group className="mb-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="text" name="age" id="age" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group className="mb-3">
                            <Form.Label>Sex</Form.Label>
                            <Form.Select name="sex" id="sex" onChange={textOnChange}>
                                <option>Select</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date" name="dob" id="dob" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Place of Birth</Form.Label>
                            <Form.Control type="text" name="pob" id="pob" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="text" name="email_address" id="email_address" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" id="address" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Highest Educational Attainment</Form.Label>
                            <Form.Control type="text" name="hea" id="hea" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Occupation</Form.Label>
                            <Form.Control type="text" name="occupation" id="occupation" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Monthly Income</Form.Label>
                            <Form.Control type="text" name="monthly_income" id="monthly_income" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Total Monthly Family Income</Form.Label>
                            <Form.Control type="text" name="tmfi" id="tmfi" onChange={textOnChange} />
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
                            <Form.Label>Contact person in case of emergency</Form.Label>
                            <Form.Control type="text" name="contact_person" id="contact_person" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control type="text" name="contact_number_contact_person" id="contact_number_contact_person" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-1">
                            <Form.Label>I. Family Composition: (PANGALAN NG MGA ANAK AT IBA PANG KASAMA SA BAHAY)</Form.Label>
                            <div><small>Use form below to add each family members</small></div>
                            <Row className="mb-3">
                                <Col lg={2} className="mb-sm-1">
                                    <Form.Control type="text" value={fcHolder.fc_name} name="fc_name" id="fc_name" placeholder="Full Name" onChange={fcOnChange} />
                                </Col>
                                <Col lg={2} className="mb-sm-1">
                                    <Form.Control type="text" value={fcHolder.fc_rel} name="fc_rel" id="fc_rel" placeholder="Relationship" onChange={fcOnChange} />
                                </Col>
                                <Col lg={1} className="mb-sm-1">
                                    <Form.Control type="text" value={fcHolder.fc_age} name="fc_age" id="fc_age" placeholder="Age" onChange={fcOnChange} />
                                </Col>
                                <Col lg={2} className="mb-sm-1">
                                    <Form.Select name="fc_status" id="fc_status" value={fcHolder.fc_status} onChange={fcOnChange}>
                                        <option value="">Select</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Divorced">Divorced</option>
                                        <option value="Separated">Separated</option>
                                        <option value="Widowed">Widowed</option>
                                    </Form.Select>
                                </Col>
                                <Col lg={2} className="mb-sm-1">
                                    <Form.Control type="date" value={fcHolder.fc_bday} name="fc_bday" id="fc_bday" placeholder="Birthday" onChange={fcOnChange} />
                                </Col>
                                <Col lg={2} className="mb-sm-1">
                                    <Form.Control type="text" value={fcHolder.fc_mi} name="fc_mi" id="fc_mi" placeholder="Monthly Income" onChange={fcOnChange} />
                                </Col>
                                <Col>
                                    <Button onClick={setFcField}>
                                        + Add
                                    </Button>
                                </Col>
                            </Row>
                            <Form.Control placeholder="Example: Juan de la Cruz, Anak, 23, Single, 06/14/1996, Waiter/10000" as="textarea" name="fam_composition" id="fam_composition" ref={famComRef} onChange={textOnChange} rows={5}></Form.Control>
                        </Form.Group>
                        <Button style={{float:'right'}} size="sm" onClick={() => famComRef.current.value = ""}>Clear Family Composition</Button>
                        <p>Include family members and other members of the household.</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>II. Classification/Circumstances of Being a Solo Parent</Form.Label>
                            <Form.Text> Dahilan ng pagiging solo parent</Form.Text>
                            <Form.Control as="textarea" name="solo_parent_classification" id="solo_parent_classification" onChange={textOnChange} rows={2}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>III. Needs/Problems of Solo Parents:</Form.Label>
                            <Form.Text> Mga pangangailangan bilang solo parent</Form.Text>
                            <Form.Control as="textarea" name="needs_of_solo_parents" id="needs_of_solo_parents" onChange={textOnChange} rows={2}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>IV. Family Resources:</Form.Label>
                            <Form.Control as="textarea" name="family_resources" id="family_resources" onChange={textOnChange} rows={2}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Picture in white background (1x1) PNG ONLY</Form.Label>
                            <Form.Control type="file" name="picture1x1" id="picture1x1" accept="image/png" onChange={picOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Signature over printed name PNG ONLY</Form.Label>
                            <Form.Control type="file" name="signature" id="signature" accept="image/png" onChange={sigOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Documents</Form.Label>
                            <div className="mb-1"><small>Solo parent certificate mula sa barangay kung hiwalay, death certificate kung balo/biyida, and birth certificate ng mga anak. (<a href="https://i.ibb.co/wyhLcD5/drag-and-select.gif" target="_blank" rel="noreferrer">You can multiple select files.</a>) PDF Only</small></div>
                            <Form.Control type="file" name="docs" id="docs" accept="application/pdf" onChange={docsOnChange} multiple />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                       
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Check aria-label="agreement" label="I hereby certify that the information given above are true and correct. I further understand that any misinterpretationthat may have made will subject me to criminal and civil liabilities provided for by existing laws." onChange={() => setAgreeCheck(!agreeCheck)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                    {
                            isSubmit ? 
                            <Button variant="primary" disabled>
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> Submitting...
                            </Button>
                            :
                            <Button className="mb-3" variant="primary" type="submit" disabled={agreeCheck}>
                                Submit Application
                            </Button>
                        }
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default IdAppliSoloParent;