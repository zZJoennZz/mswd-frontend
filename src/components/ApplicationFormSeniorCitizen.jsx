import React from 'react';

import {
    Container,
    Row,
    Col,
    Table,
    Form
} from 'react-bootstrap'

const ApplicationFormSeniorCitizen = ({ appData, subDate }) => {
    //let famCom = appData.fam_composition.split('\n');
    //let [famComArr, setFamComArr] = React.useState(false);

    const changeDateFormat = (dateToChange) => {
        let theDate = new Date(dateToChange);
        return theDate.toLocaleDateString("en-US");
    }

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
        },{
            "id": 4,
            "name" : "N/A"
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

    // useEffect(() => {
    //     // const getFamCom = () => {
    //     //     let holder, allParts = '';
    //     //     for(let i = 0; i < famCom.length; i++) {
    //     //         holder = famCom[i].split(',');
    //     //         allParts += `<tr><td>${holder[0]}</td><td>${holder[1]}</td><td>${holder[2]}</td><td>${holder[3]}</td><td>${holder[4]}</td><td>${holder[5]}</td></tr>`
    //     //     }
    //     //     setFamComArr(allParts);
    //     // }
    //     // getFamCom();
    // }, [famCom])

    return (
        <Container fluid style={{ border: "1px solid #000" }} className="p-4"> {console.log(appData)}
            <Row>
                <Col md={12}>
                    <p className="text-uppercase text-center">Philippine Registry Form for Persons With Disability Ver. 2.0</p>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={6}>
                    <strong>1. PWD Number:</strong> {appData.pwd_number}
                </Col>
                <Col md={6}>
                    <strong>2. Date:</strong> {changeDateFormat(subDate)}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={4}>
                    <strong>3. Last Name:</strong> {appData.last_name},  
                </Col>
                <Col md={4}>
                    <strong>First Name:</strong> {appData.first_name}
                </Col>
                <Col md={4}>
                    <strong>Middle Name:</strong> {appData.middle_name}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={12}>
                    <strong>4. Type of Disability:</strong> {disabilities[appData.tod].name}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={12}>
                    <strong>5. Causes of Disability:</strong> {causes[appData.cod ? appData.cod : 4-1].name}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={12}>
                    <strong>6. Address:</strong>
                </Col>
                <Col md={12}>
                    {appData.houseno} {appData.brgy} {appData.muni} {appData.prov} {regions[parseInt(appData.reg)-1].name} 
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={12}>
                    <strong>7. Contact Details:</strong>
                </Col>
                <Col md={4}>
                    <strong>7a. Tel. Nos.:</strong> {appData.tel_no}
                </Col>
                <Col md={4}>
                    <strong>7b. Mobile Nos.:</strong> {appData.mobile_no}
                </Col>
                <Col md={4}>
                    <strong>7c. Email Address:</strong> {appData.email_address}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={4}>
                    <strong>8. Date of Birth:</strong> {appData.dob}
                </Col>
                <Col md={4}>
                    <strong>9. Sex:</strong> {appData.sex === "1" ? "Male" : "Female"}
                </Col>
                <Col md={4}>
                    <strong>10. Civil Status:</strong> {appData.cs === '1' ? "Single" : appData.cs === '2' ? "Married" : appData.cs === '3' ? "Widow/er" : appData.cs === '4' ? "Separated" : appData.cs === '5' ? "Co-habitation(Live-in)" : ""}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={12}>
                    <strong>11. Educational Attainment:</strong> {educ_attain[appData.educ_attain].name}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={12}>
                    <strong>12. Employment Status:</strong> {appData.es === "1" ? "Employed" : "Unemployed"}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={6}>
                    <strong>13. Type of Employment:</strong> {appData.t_of_emp === "1" ? "Private" : "Government"}
                </Col>
                <Col md={6}>
                    <strong>14. Type of Employer</strong> {appData.t_of_emper === "1" ? "Permanent" : appData.t_of_emper === "2" ? "Regular" : appData.t_of_emper === "3" ? "Contractual" : appData.t_of_emper === "4" ? "Casual" : appData.t_of_emper === "5" ? "Self-employed" : appData.t_of_emper === "6" ? "Seasonal" : appData.t_of_emper === "7" ? "Emergency" : ""}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={6}>
                    <strong>15. Occupation:</strong>
                    {
                        occupation.map(m => 
                            
                            parseInt(appData.occu) === m.id ? 
                                <Form.Check type="radio" checked="checked" key={"occu" + m.id} id={"occu" + m.id} name="occu" label={m.name} value={m.id} readOnly />
                            : 
                                <Form.Check type="radio" key={"occu" + m.id} id={"occu" + m.id} name="occu" label={m.name} value={m.id} readOnly />
                            
                        )
                    }
                </Col>
                <Col md={6}>
                    <Row>
                        <Col md={12}>
                            <strong>16. ID Reference No.</strong>
                        </Col>
                        <Col md={12}>
                            <strong>SSS No.:</strong> {appData.sss}
                        </Col>
                        <Col md={12}>
                            <strong>GSIS No.:</strong> {appData.gsis}
                        </Col>
                        <Col md={12}>
                            <strong>Pag-ibig No.:</strong> {appData.pagibig}
                        </Col>
                        <Col md={12} className="mb-3">
                            <strong>PhilHealth No.:</strong> {appData.philhealth}
                            {
                                parseInt(appData.phtype) === 0 ?
                                    <>
                                        <Form.Check type="radio" checked="checked" id="ph-type-1" name="phtype" label="PhilHealth Member" value={0} readOnly />
                                        <Form.Check type="radio" id="ph-type-2" name="phtype" label="PhilHealth Member Dependent" value={1} readOnly />
                                    </>
                                :
                                    <>
                                        <Form.Check type="radio" id="ph-type-1" name="phtype" label="PhilHealth Member" value={0} readOnly />
                                        <Form.Check type="radio" checked="checked" id="ph-type-2" name="phtype" label="PhilHealth Member Dependent" value={1} readOnly />
                                    </>
                            }
                        </Col>
                        <Col md={12} className="mb-3">
                            <strong>17. Blood Type:</strong> {parseInt(appData.bt) === 1 ? "A+" : ""}{parseInt(appData.bt) === 2 ? "A-" : ""}{parseInt(appData.bt) === 3 ? "B+" : ""}{parseInt(appData.bt) === 4 ? "B-" : ""}{parseInt(appData.bt) === 5 ? "AB+" : ""}{parseInt(appData.bt) === 6 ? "AB-" : ""}{parseInt(appData.bt) === 7 ? "O+" : ""}{parseInt(appData.bt) === 8 ? "O-" : ""}
                        </Col>
                        <Col md={12}>
                            <strong>18. Organization Information:</strong>
                        </Col>
                        <Col md={12}>
                            <strong>Organization Affiliated:</strong> {appData.orgaff}
                        </Col>
                        <Col md={12}>
                            <strong>Contact Person:</strong> {appData.conper}
                        </Col>
                        <Col md={12}>
                            <strong>Office Address:</strong> {appData.offadd}
                        </Col>
                        <Col md={12}>
                            <strong>Tel. Nos.:</strong> {appData.telno}
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={12}>
                    <Table responsive bordered>
                        <thead>
                            <tr>
                                <th width="30%"><strong>19. Family Background</strong></th>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Middle Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Father's Name:</th>
                                <td>{appData.father_last_name}</td>
                                <td>{appData.father_first_name}</td>
                                <td>{appData.father_middle_name}</td>
                            </tr>
                            <tr>
                                <th>Mothers's Name:</th>
                                <td>{appData.mother_last_name}</td>
                                <td>{appData.mother_first_name}</td>
                                <td>{appData.mother_middle_name}</td>
                            </tr>
                            <tr>
                                <th>Guardian's Name:</th>
                                <td>{appData.guardian_last_name}</td>
                                <td>{appData.guardian_first_name}</td>
                                <td>{appData.guardian_middle_name}</td>
                            </tr>
                            <tr>
                                <th>20. Accomplished By:</th>
                                <td>{appData.accom_last_name}</td>
                                <td>{appData.accom_first_name}</td>
                                <td>{appData.accom_middle_name}</td>
                            </tr>
                            <tr>
                                <th>20a. Name of Reporting Unit:</th>
                                <td>{appData.nrepu_last_name}</td>
                                <td>{appData.nrepu_first_name}</td>
                                <td>{appData.nrepu_middle_name}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={12}>
                    <strong>Registration Number:</strong> {appData.reg_num}
                </Col>
            </Row>
        </Container>
    )
}

export default ApplicationFormSeniorCitizen;