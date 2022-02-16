import React, { useState } from 'react';
import {
    Form,
    Button,
    Row,
    Col
} from 'react-bootstrap';

import apifrm from '../api/apifrm';

const IdAppliPwd = ({ submitApplication }) => {
    let [frmData, setFrmData] = useState({'appliType': 2});
    let [pic, setPic] = useState(false);
    let [sig, setSig] = useState(false);
    let [isMulti, setIsMulti] = useState(true);
    let [agreeCheck, setAgreeCheck] = useState(true);

    let disabilities = [
        {'id' : 1, 'name': 'Mental/Intellectual'},
        {'id' : 2, 'name': 'Hearing Disability'},
        {'id' : 3, 'name': 'Psychosocial Disability'},
        {'id' : 4, 'name': 'Visual Disability'},
        {'id' : 5, 'name': 'Speech Disability'},
        {'id' : 6, 'name': 'Learning Disability'},
        {'id' : 7, 'name': 'Orthopedic (Musculoskeletal) Disability'}
    ];

    let causes = [
        {
            "id": 1,
            "name" : 'Congenital/inborn',
        },{
            "id": 2,
            "name" : 'Illness',
        },{
            "id": 3,
            "name" : 'Congenitel/inborn',
        }
    ];

    let educ_attain = [
        {
            "id": 1,
            "name" : 'Elementary Undergraduate',
        },{
            "id": 2,
            "name" : 'Elementary Graduate',
        },{
            "id": 3,
            "name" : 'High School Undergraduate',
        },{
            "id": 4,
            "name" : 'High School Graduate',
        },{
            "id": 5,
            "name" : 'College Undergraduate',
        },{
            "id": 6,
            "name" : 'College Graduate',
        },{
            "id": 7,
            "name" : 'Post Graduate',
        },{
            "id": 8,
            "name" : 'Vocational',
        },{
            "id": 9,
            "name" : 'None',
        }
    ];

    let occupation = [
        {
            "id": 1,
            "name" : 'Officials of Government and Special Interest Organizations, Corporate Executives, Managers, Managing Proprietors and Supervisors',
        },{
            "id": 2,
            "name" : 'Professionals',
        },{
            "id": 3,
            "name" : 'Technicians, and Associate Professionals',
        },{
            "id": 4,
            "name" : 'Clerks',
        },{
            "id": 5,
            "name" : 'Service Workers, and Shop, and Market Sales',
        },{
            "id": 6,
            "name" : 'Workers',
        },{
            "id": 7,
            "name" : 'Farmers, Forestry Workers, and Fisherman',
        },{
            "id": 8,
            "name" : 'Trades, and Related Workers',
        },{
            "id": 9,
            "name" : 'Plant, and Machine Operators, and Assemblers',
        },{
            "id": 10,
            "name" : 'Laborers',
        },{
            "id": 11,
            "name" : 'Unskilled Workers',
        },{
            "id": 12,
            "name" : 'Not Applicable',
        }
    ];

    let regions = [
        {
          "id": 1,
          "name": " NCR  (National Capital Region)"
        },
        {
          "id": 2,
          "name": " CAR  (Cordillera Administrative Region)"
        },
        {
          "id": 3,
          "name": " Region I  (Ilocos Region)"
        },
        {
          "id": 4,
          "name": " Region II  (Cagayan Valley)"
        },
        {
          "id": 5,
          "name": " Region III  (Central Luzon)"
        },
        {
          "id": 6,
          "name": " Region IV-A  (CALABARZON)"
        },
        {
          "id": 7,
          "name": " Region IV-B  (MIMAROPA)"
        },
        {
          "id": 8,
          "name": " Region V  (Bicol Region)"
        },
        {
          "id": 9,
          "name": " Region VI  (Western Visayas)"
        },
        {
          "id": 10,
          "name": " Region VII  (Central Visayas)"
        },
        {
          "id": 11,
          "name": " Region VIII  (Eastern Visayas)"
        },
        {
          "id": 12,
          "name": " Region XVIII  (Negros Island Region)"
        },
        {
          "id": 12,
          "name": " Region IX  (Zamboanga Peninsula)"
        },
        {
          "id": 13,
          "name": " Region X  (Northern Mindanao)"
        },
        {
          "id": 14,
          "name": " Region XI  (Davao Region)"
        },
        {
          "id": 15,
          "name": " Region XII  (SOCCSKSARGEN)"
        },
        {
          "id": 16,
          "name": " Region XIII  (Caraga)"
        },
        {
          "id": 17,
          "name": " ARMM  (Autonomous Region in Muslim Mindanao)"
        }
    ];

    const submitForm = async (e) => {
        e.preventDefault();
        
        //console.log(frmData);
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

    const dateToday = () => {
        let currTime = new Date();
        var currDate = currTime.getMonth() + 1 + "/" + currTime.getDate() + "/" + currTime.getFullYear(); 
        return currDate;
    }

    // const testBtn = (e) => {
    //     let lines = frmData.fam_composition.split('\n');
    //     for (let i = 0; i < lines.length; i++) {
    //         console.log(lines[i]);
    //     }
    // }

    return (
        <div>
            <h2 className="text-uppercase">Application Form for Persons with Disability</h2>
            <Form onSubmit={submitForm}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>1. PWD Number</Form.Label>
                            <Form.Control type="text" name="pwd_number" id="pwd_number" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>2. Date</Form.Label>
                            <p>{dateToday()}</p>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>3. First Name</Form.Label>
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
                            <Form.Label>4. Type of Disability</Form.Label>
                            <div>
                                {
                                    disabilities.map(m => 
                                        <Form.Check inline type="radio" key={"tod" + m.id} id={"tod" + m.id} name="tod" label={m.name} value={m.id} onChange={textOnChange} />)
                                }
                                
                                <Form.Text><p className="mt-4">If Multiple Disabilities, please specify instead:</p></Form.Text>
                                <Form.Control type="text" name="tod" id="tod" onChange={textOnChange} />
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>5. Causes of Disability</Form.Label>
                            <div>
                                {
                                    causes.map(d => 
                                        <Form.Check inline type="checkbox" value={d.id} key={d.id} id={"cod" + d.id} name="cod" label={d.name} />    
                                    )
                                }
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>6. Address</Form.Label>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Control type="text" placeholder="House No. and Street" name="houseno" id="houseno" onChange={textOnChange} />
                                </Col>
                                <Col md={6}>
                                    <Form.Control type="text" placeholder="Barangay" name="brgy" id="brgy" onChange={textOnChange} />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Form.Control type="text" placeholder="Municipality" name="muni" id="muni" onChange={textOnChange} />
                                </Col>
                                <Col md={4}>
                                    <Form.Control type="text" placeholder="Province" name="prov" id="prov" onChange={textOnChange} />
                                </Col>
                                <Col md={4}>
                                    <Form.Select type="text" placeholder="Region" name="reg" id="reg" onChange={textOnChange}>
                                        <option>Select</option>
                                        {
                                            regions.map(d => 
                                                <option key={d.id} value={d.id}>{d.name}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>7. Contact Details</Form.Label>
                            <Row>
                                <Col md={3}>
                                    <Form.Control type="text" placeholder="Tel No." name="tel_no" id="tel_no" onChange={textOnChange} />
                                </Col>
                                <Col md={3}>
                                    <Form.Control type="text" placeholder="Mobile No." name="mobile_no" id="mobile_no" onChange={textOnChange} />
                                </Col>
                                <Col md={6}>
                                    <Form.Control type="email" placeholder="Email Address" name="email_address" id="email_address" onChange={textOnChange} />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>8. Date of Birth</Form.Label>
                            <Form.Control type="date" name="dob" id="dob" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>9. Sex</Form.Label>
                            <Form.Select name="sex" id="sex" onChange={textOnChange}>
                                <option>Select</option>
                                <option value={1}>Male</option>
                                <option value={2}>Female</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>10. Civil Status</Form.Label>
                            <Form.Select name="cs" id="cs" onChange={textOnChange}>
                                <option>Select</option>
                                <option value={1}>Single</option>
                                <option value={2}>Married</option>
                                <option value={3}>Widow/er</option>
                                <option value={4}>Separated</option>
                                <option value={5}>Co-habitation(Live-in)</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>11. Educational Attainment</Form.Label>
                            <div>
                                {
                                    educ_attain.map(d => 
                                        <Form.Check inline value={d.id} type="radio" key={d.id} id={"educ_attain" + d.id} name="educ_attain" label={d.name} onChange={textOnChange} />    
                                    )
                                }
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>12. Employment Status</Form.Label> <Form.Text>Please select if employed</Form.Text>
                            <Form.Select name="es" id="es" onChange={textOnChange}>
                                <option>Select</option>
                                <option value={1}>Employed</option>
                                <option value={2}>Unemployed</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>13. Type of Employment</Form.Label> <Form.Text>Please select if employed</Form.Text>
                            <Form.Select name="t_of_emp" id="t_of_emp" onChange={textOnChange}>
                                <option>Select</option>
                                <option value={1}>Private</option>
                                <option value={2}>Government</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>14. Type of Employer</Form.Label> <Form.Text>Please select if employed</Form.Text>
                            <Form.Select name="t_of_emper" id="t_of_emper" onChange={textOnChange}>
                                <option>Select</option>
                                <option value={1}>Permanent</option>
                                <option value={2}>Regular</option>
                                <option value={3}>Contractual</option>
                                <option value={4}>Casual</option>
                                <option value={5}>Self-Employed</option>
                                <option value={6}>Seasonal</option>
                                <option value={7}>Emergency</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>15. Occupation</Form.Label> <Form.Text>Select one</Form.Text>
                            {
                                occupation.map(m => 
                                    <Form.Check type="radio" key={"occu" + m.id} id={"occu" + m.id} name="occu" label={m.name} value={m.id} onChange={textOnChange} />
                                )
                            }
                            <Form.Text><p>Others, please specify:</p></Form.Text>
                            <Form.Control type="text" name="occu" id="occu" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>16. ID Reference No.</Form.Label>
                                <Form.Control className="mb-1" type="text" name="sss" id="sss" placeholder="SSS No." onChange={textOnChange} />
                                <Form.Control className="mb-1" type="text" name="gsis" id="gsis" placeholder="GSIS No." onChange={textOnChange} />
                                <Form.Control className="mb-1" type="text" name="pagibig" id="pagibig" placeholder="Pag-ibig No." onChange={textOnChange} />
                                <Form.Control className="mb-1" type="text" name="philhealth" id="philhealth" placeholder="PhilHealth No." onChange={textOnChange} />
                                <Form.Check type="radio" id="ph-type-1" name="phtype" label="PhilHealth Member" value={0} onChange={textOnChange} />
                                <Form.Check type="radio" id="ph-type-2" name="phtype" label="PhilHealth Member Dependent" value={1} onChange={textOnChange} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>17. Blood Type</Form.Label>
                                <Form.Select name="bt" id="bt" onChange={textOnChange}>
                                    <option>Select</option>
                                    <option value={1}>A+</option>
                                    <option value={2}>A-</option>
                                    <option value={3}>B+</option>
                                    <option value={4}>B-</option>
                                    <option value={5}>AB+</option>
                                    <option value={6}>AB-</option>
                                    <option value={7}>O+</option>
                                    <option value={8}>O-</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>18. Organization Information</Form.Label>
                                <Form.Control className="mb-1" type="text" name="orgaff" id="orgaff" placeholder="Organization Affiliated" onChange={textOnChange} />
                                <Form.Control className="mb-1" type="text" name="conper" id="conper" placeholder="Contact Person" onChange={textOnChange} />
                                <Form.Control className="mb-1" type="text" name="offadd" id="offadd" placeholder="Office Address" onChange={textOnChange} />
                                <Form.Control type="text" name="telno" id="telno" placeholder="Tel No." onChange={textOnChange} />
                            </Form.Group>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Form.Group className="mb-3">
                        <Col md={12}>
                            <Form.Label>19. Family Background</Form.Label>
                        </Col>
                        <Col md={12}>
                            <Form.Label>Father's Name</Form.Label>
                        </Col>
                        <Row>
                            <Col md={4}><Form.Control type="text" name="father_last_name" id="father_last_name" placeholder="Last Name" onChange={textOnChange} /></Col>
                            <Col md={4}><Form.Control type="text" name="father_first_name" id="father_first_name" placeholder="First Name" onChange={textOnChange} /></Col>
                            <Col md={4}><Form.Control type="text" name="father_middle_name" id="father_middle_name" placeholder="Middle Name" onChange={textOnChange} /></Col>
                        </Row>
                        <Col md={12}>
                            <Form.Label>Mother's Name</Form.Label>
                        </Col>
                        <Row>
                            <Col md={4}><Form.Control type="text" name="mother_last_name" id="mother_last_name" placeholder="Last Name" onChange={textOnChange} /></Col>
                            <Col md={4}><Form.Control type="text" name="mother_first_name" id="mother_first_name" placeholder="First Name" onChange={textOnChange} /></Col>
                            <Col md={4}><Form.Control type="text" name="mother_middle_name" id="mother_middle_name" placeholder="Middle Name (Optional)" onChange={textOnChange} /></Col>
                        </Row>
                        <Col md={12}>
                            <Form.Label>Guardian's Name</Form.Label>
                        </Col>
                        <Row className="mb-3">
                            <Col md={4}><Form.Control type="text" name="guardian_last_name" id="guardian_last_name" placeholder="Last Name" onChange={textOnChange} /></Col>
                            <Col md={4}><Form.Control type="text" name="guardian_first_name" id="guardian_first_name" placeholder="First Name" onChange={textOnChange} /></Col>
                            <Col md={4}><Form.Control type="text" name="guardian_middle_name" id="guardian_middle_name" placeholder="Middle Name" onChange={textOnChange} /></Col>
                        </Row>
                        <Col md={12}>
                            <Form.Label>20. Accomplished By</Form.Label>
                        </Col>
                        <Row className="mb-3">
                            <Col md={4}><Form.Control type="text" name="accom_last_name" id="accom_last_name" placeholder="Last Name" onChange={textOnChange} /></Col>
                            <Col md={4}><Form.Control type="text" name="accom_first_name" id="accom_first_name" placeholder="First Name" onChange={textOnChange} /></Col>
                            <Col md={4}><Form.Control type="text" name="accom_middle_name" id="accom_middle_name" placeholder="Middle Name" onChange={textOnChange} /></Col>
                        </Row>
                        <Col md={12}>
                            <Form.Label>20a. Name of Reporting Unit</Form.Label>
                        </Col>
                        <Row>
                            <Col md={4}><Form.Control type="text" name="nrepu_last_name" id="nrepu_last_name" placeholder="Last Name" onChange={textOnChange} /></Col>
                            <Col md={4}><Form.Control type="text" name="nrepu_first_name" id="nrepu_first_name" placeholder="First Name" onChange={textOnChange} /></Col>
                            <Col md={4}><Form.Control type="text" name="nrepu_middle_name" id="nrepu_middle_name" placeholder="Middle Name" onChange={textOnChange} /></Col>
                        </Row>
                    </Form.Group>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>21. Registration Number</Form.Label>
                            <Form.Control type="text" name="reg_num" id="reg_num" onChange={textOnChange} />
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

export default IdAppliPwd;