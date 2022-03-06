import React from 'react';

import {
    Container,
    Row,
    Col,
    Table
} from 'react-bootstrap'

const ApplicationFormSeniorCitizen = ({ appData, appFiles }) => {
    let famCom = appData.fam_composition.split('\n');
    let [famComArr, setFamComArr] = React.useState(false);

    const living_arr = [
        {'id' : 1, 'name': 'Living Alone'},
        {'id' : 2, 'name': 'Living in Relatives'},
        {'id' : 3, 'name': 'Own House'},
        {'id' : 4, 'name': 'Renting'},
    ];

    const c_status = [
        {'id' : 1, 'name': 'Single'},
        {'id' : 2, 'name': 'Married'},
        {'id' : 3, 'name': 'Widowed'},
        {'id' : 4, 'name': 'Separated'},
    ];

    const educ_attain = [
        { id: 1, name: 'Elementary' },
        { id: 2, name: 'High School' },
        { id: 3, name: 'College' },
        { id: 4, name: 'Post Graduate' },
        { id: 5, name: 'PhD' },
    ];

    const pensioner = [
        { id: 1, name: 'GSIS' },
        { id: 2, name: 'SSS' },
        { id: 3, name: 'Private' },
        { id: 4, name: 'No Pension' },
    ];

    React.useEffect(() => {
        const getFamCom = () => {
            let holder, allParts = '';
            for(let i = 0; i < famCom.length; i++) {
                holder = famCom[i].split(',');
                allParts += `<tr><td>${holder[0]}</td><td>${holder[1]}</td><td>${holder[2]}</td><td>${holder[3]}</td><td>${holder[4]}</td><td>${holder[5]}</td><td>${holder[6]}</td><td>${holder[7]}</td><td>${holder[8]}</td></tr>`
            }
            setFamComArr(allParts);
        }
        getFamCom();
    }, [famCom])

    return (
        <Container fluid style={{ border: "1px solid #000" }} className="p-4">
            <Row>
                <Col md={12}>
                    <p className="text-uppercase text-center">OSCA ID Application Form</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className="text-uppercase">A. Background Info:</p>
                </Col>
                <Col md={6}>
                    <strong>OSCA ID No.:</strong> {appData.osca_id}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={12}>
                    <strong>Name of Senior Citizen:</strong> {appData.last_name}, {appData.first_name} {appData.middle_name}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={12}>
                    <strong>Address:</strong> {appData.address}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={12}>
                    <strong>Living Arrangement:</strong> {living_arr[parseInt(appData.living_arr)].name}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={4}>
                    <strong>Sex:</strong> {appData.sex === "1" ? "Male" : "Female"}
                </Col>
                <Col md={4}>
                    <strong>Age:</strong> {appData.age}
                </Col>
                <Col md={4}>
                    <strong>Status:</strong> {c_status[parseInt(appData.status)].name}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={6}>
                    <strong>Date of Birth:</strong> {appData.dob}
                </Col>
                <Col md={6}>
                    <strong>Place of Birth:</strong> {appData.pob}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={12}>
                    <strong>Highest Educational Attainment:</strong> {educ_attain[parseInt(appData.educ_attain)].name}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={4}>
                    <strong>Profession:</strong> {appData.profession}
                </Col>
                <Col md={4}>
                    <strong>Course:</strong> {appData.course}
                </Col>
                <Col md={4}>
                    <strong>Skills:</strong> {appData.skills}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={6}>
                    <strong>Pensioner:</strong> {pensioner[parseInt(appData.pensioner)].name}
                </Col>
                <Col md={6}>
                    <strong>Work:</strong> {appData.work}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={4}>
                    <strong>Religion:</strong> {appData.religion}
                </Col>
                <Col md={4}>
                    <strong>Ethnicity:</strong> {appData.ethnicity}
                </Col>
                <Col md={4}>
                    <strong>Organization:</strong> {appData.organization}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={12}>
                    <strong>Health/Physical Condition:</strong> {appData.hpcon}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={4}>
                    <strong>Contact No. Mobile:</strong> {appData.mobileno}
                </Col>
                <Col md={4}>
                    <strong>Landline:</strong> {appData.landline}
                </Col>
                <Col md={4}>
                    <strong>Email:</strong> {appData.email}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={4}>
                    <strong>ID Shown:</strong> {appData.id_shown}
                </Col>
                <Col md={4}>
                    <strong>Issued By:</strong> {appData.landline}
                </Col>
                <Col md={4}>
                    <strong>Photo:</strong> {appData.photo === 1 ? "Yes" : "No"}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={6}>
                    <strong>Issued On:</strong> {appData.issued_on}
                </Col>
                <Col md={6}>
                    <strong>Place of Issue:</strong> {appData.place_of_issue}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={6}>
                    <strong>Contact Person:</strong> {appData.contact_person}
                </Col>
                <Col md={6}>
                    <strong>Relationship:</strong> {appData.relationship}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={6}>
                    <strong>Address:</strong> {appData.con_address}
                </Col>
                <Col md={6}>
                    <strong>Contact No.:</strong> {appData.con_con_no}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={12}>
                    <Table responsive size="sm" bordered style={{ textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th width="20%">Name</th>
                                <th width="5%">Age</th>
                                <th width="10%">Relationship</th>
                                <th width="5%">Status</th>
                                <th width="20%">Address</th>
                                <th width="10%">Contact No.</th>
                                <th width="10%">Contact No.</th>
                                <th width="10%">Work</th>
                                <th width="10%">Monthly Income</th>
                            </tr>
                        </thead>
                        <tbody dangerouslySetInnerHTML={{__html: famComArr}}></tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="mt-3 mb-3">
                <Col md={12}>
                    <div className="mb-1"><strong>Attached Documents:</strong></div>
                    {
                        !appFiles ?
                            "Loading..."
                        :
                        appFiles.map(d => 
                            <div key={d.id}><a href={d.file_url} target="_blank" rel="noreferrer">{d.file_name}</a></div>    
                        )
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default ApplicationFormSeniorCitizen;