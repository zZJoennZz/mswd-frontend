import React, { useState } from 'react';
import {
    Form,
    Button,
    Row,
    Col
} from 'react-bootstrap';

import apifrm from '../api/apifrm';

const IdAppliSeniorCitizen = ({ submitApplication }) => {
    let [frmData, setFrmData] = useState({'appliType': 3});
    let [pic, setPic] = useState(false);
    let [sig, setSig] = useState(false);
    let [agreeCheck, setAgreeCheck] = useState(true);

    const educ_attain = [
        { id: 1, name: 'Elementary' },
        { id: 2, name: 'High School' },
        { id: 3, name: 'College' },
        { id: 4, name: 'Post Graduate' },
        { id: 5, name: 'PhD' },
    ]

    const submitForm = async (e) => {
        e.preventDefault();
        //
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
            <h2 className="text-uppercase">OSCA ID Application Form</h2>
            <Form onSubmit={submitForm}>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>OSCA ID NO.</Form.Label>
                            <Form.Control type="text" name="osca_id" id="osca_id" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Label>Name of Senior Citizen</Form.Label>
                    </Col>
                </Row>
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
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" id="address" placeholder="(House No./Street or Sitio/Barangay)" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Living Arrangements</Form.Label>
                            <Form.Select name="living_arr" id="living_arr" onChange={textOnChange}>
                                <option>Select</option>
                                <option value={1}>Living Alone</option>
                                <option value={2}>Living in Relatives</option>
                                <option value={3}>Own House</option>
                                <option value={4}>Renting</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Years</Form.Label>
                            <Form.Control type="text" name="years" id="years" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Sex</Form.Label>
                            <Form.Select name="sex" id="sex" onChange={textOnChange}>
                                <option>Select</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="text" name="age" id="age" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select name="status" id="status" onChange={textOnChange}>
                                <option>Select</option>
                                <option value={1}>Single</option>
                                <option value={2}>Married</option>
                                <option value={3}>Windowed</option>
                                <option value={4}>Separated</option>
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
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Highest Educational Attainment</Form.Label>
                            {/* <Form.Control type="text" name="hea" id="hea" onChange={textOnChange} /> */}
                            <Form.Select name="educ_attain" id="educ_attain" onChange={textOnChange}>
                                <option>Select</option>
                                {
                                    educ_attain.map(d => 
                                        <option key={d.id} value={d.id}>{d.name}</option>    
                                    )
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Profession</Form.Label>
                            <Form.Control type="text" name="profession" id="profession" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Course</Form.Label>
                            <Form.Control type="text" name="course" id="course" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Skills</Form.Label>
                            <Form.Control type="text" name="skills" id="skills" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Pensioner</Form.Label>
                            <Form.Select type="text" name="pensioner" id="pensioner" onChange={textOnChange}>
                                <option>Select</option>
                                <option value={1}>GSIS</option>
                                <option value={2}>SSS</option>
                                <option value={3}>Private</option>
                                <option value={4}>No Pension</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Work</Form.Label>
                            <Form.Control type="text" name="work" id="work" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Religion</Form.Label>
                            <Form.Control type="text" name="religion" id="religion" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ethnicity</Form.Label>
                            <Form.Control type="text" name="ethnicity" id="ethnicity" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Organization</Form.Label>
                            <Form.Control type="text" name="organization" id="organization" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Health/Physical Condition</Form.Label>
                            <Form.Control type="text" name="hpcon" id="hpcon" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact No. Mobile</Form.Label>
                            <Form.Control type="text" name="mobileno" id="mobileno" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Landline</Form.Label>
                            <Form.Control type="text" name="landline" id="landline" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="text" name="email" id="email" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>ID Shown</Form.Label>
                            <Form.Control type="text" name="id_shown" id="id_shown" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Issued By</Form.Label>
                            <Form.Control type="text" name="issued_by" id="issued_by" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Photo</Form.Label>
                            <Form.Select type="text" name="photo" id="photo" onChange={textOnChange}>
                                <option>Select</option>
                                <option value={1}>Yes</option>
                                <option value={2}>No</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                        <Form.Group className="mb-3">
                            <Form.Label>Issued On</Form.Label>
                            <Form.Control type="text" name="issued_on" id="issued_on" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={7}>
                        <Form.Group className="mb-3">
                            <Form.Label>Place of Issue</Form.Label>
                            <Form.Control type="text" name="place_of_issue" id="place_of_issue" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact Person</Form.Label>
                            <Form.Control type="text" name="contact_person" id="contact_person" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Relationship</Form.Label>
                            <Form.Control type="text" name="relationship" id="relationship" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="con_address" id="con_address" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact No.</Form.Label>
                            <Form.Control type="text" name="con_con_no" id="con_con_no" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Family Composition/Household Members</Form.Label>
                            <p><Form.Text>Format each line: Name, Age, Relationship to Señor Citizen, Civil Status, Address, Contact No., Educational Attainment, Work, Monthly Income (Don't use comma)</Form.Text></p>
                            <Form.Control placeholder="Example: Juan de la Cruz, 24, Grand son, Single, Example St. San Rafael Bulacan, 09111111111, Bachelor's Degree, Clerk, 12000" as="textarea" name="fam_composition" id="fam_composition" onChange={textOnChange} rows={5}></Form.Control>
                        </Form.Group>
                        <p>Include family members and other members of the household.</p>
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

export default IdAppliSeniorCitizen;