import React, { useState } from 'react';
import {
    Form,
    Button,
    Row,
    Col
} from 'react-bootstrap';

import apifrm from '../api/apifrm';

const IdAppliSoloParent = ({ submitApplication }) => {
    let [frmData, setFrmData] = useState({'appliType': 1});
    let [pic, setPic] = useState(false);
    let [sig, setSig] = useState(false);
    let [agreeCheck, setAgreeCheck] = useState(true);

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            let formData = new FormData();
            formData.append('application_data', JSON.stringify(frmData));
            formData.append('application_pic', pic[0]);
            formData.append('application_sig', sig[0]);

            let res = await apifrm.post("application/post", formData);
            submitApplication(res.data.application_id);
        } catch (error) {
            submitApplication("failed");
            alert(error + ". Please contact your website administrator.");
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
                    <Col md={8}>
                        <Form.Group className="mb-3">
                            <Form.Label>Place of Birth</Form.Label>
                            <Form.Control type="text" name="pob" id="pob" onChange={textOnChange} />
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
                        <Form.Group className="mb-3">
                            <Form.Label>I. Family Composition: (PANGALAN NG MGA ANAK AT IBA PANG KASAMA SA BAHAY)</Form.Label>
                            <p>Format each line: Name, Relationship, Age, Status, Birthday, Occupation/Monthly Income (Don't use comma)</p>
                            <Form.Control placeholder="Example: Juan de la Cruz, Anak, 23, Single, 06/14/1996, Waiter/10000" as="textarea" name="fam_composition" id="fam_composition" onChange={textOnChange} rows={5}></Form.Control>
                        </Form.Group>
                        <p>Include family members and other members of the household.</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>II. Classification/Circumstances of Being a Solo Parent</Form.Label>
                            <Form.Text> Dahilan ng pagiging solo parent</Form.Text>
                            <Form.Control as="textarea" name="solo_parent_classification" id="solo_parent_classification" onChange={textOnChange} rows={5}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>III. Needs/Problems of Solo Parents:</Form.Label>
                            <Form.Text> Mga pangangailangan bilang solo parent</Form.Text>
                            <Form.Control as="textarea" name="needs_of_solo_parents" id="needs_of_solo_parents" onChange={textOnChange} rows={5}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>IV. Family Resources:</Form.Label>
                            <Form.Control as="textarea" name="family_resources" id="family_resources" onChange={textOnChange} rows={5}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Picture in white background (1x1)</Form.Label>
                            <Form.Control type="file" name="picture1x1" id="picture1x1" accept="image/png, image/jpeg" onChange={picOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Signature over printed name</Form.Label>
                            <Form.Control type="file" name="signature" id="signature" accept="image/png, image/jpeg" onChange={sigOnChange} />
                        </Form.Group>
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
                        <Button className="mb-3" variant="primary" type="submit" disabled={agreeCheck}>
                            Submit Application
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default IdAppliSoloParent;