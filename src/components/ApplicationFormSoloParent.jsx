import React, { useEffect } from "react";

import { Container, Row, Col, Table } from "react-bootstrap";

import { barangays } from "select-philippines-address";

const ApplicationFormSoloParent = ({ appData, appFiles }) => {
  let famCom = appData.fam_composition.split("\n");
  let [famComArr, setFamComArr] = React.useState(false);
  let [brgyList, setBrgyList] = React.useState(false);

  useEffect(() => {
    const getFamCom = () => {
      let holder,
        allParts = "";
      for (let i = 0; i < famCom.length; i++) {
        holder = famCom[i].split(",");
        allParts += `<tr><td>${holder[0]}</td><td>${holder[1]}</td><td>${holder[2]}</td><td>${holder[3]}</td><td>${holder[4]}</td><td>${holder[5]}</td></tr>`;
      }
      setFamComArr(allParts);
    };
    getFamCom();

    barangays("031422").then((barangays) => {
      setBrgyList(barangays);
    });

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Row className="mb-3">
        <Col md={12}>
          Application Type:{" "}
          <strong>
            {appData.appli_type === "new" ? (
              <span className="text-primary">New</span>
            ) : (
              <span className="text-danger">Loss</span>
            )}
          </strong>
        </Col>
      </Row>
      <Container fluid style={{ border: "1px solid #000" }} className="p-4">
        <Row>
          <Col md={12}>
            <p className="text-uppercase text-center">
              Application Form for Solo Parents
            </p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={8}>
            <strong>Name:</strong> {appData.last_name}, {appData.first_name}{" "}
            {appData.middle_name}
          </Col>
          <Col col={2}>
            <strong>Age:</strong> {appData.age}
          </Col>
          <Col col={2}>
            <strong>Sex:</strong> {appData.sex === "1" ? "Male" : "Female"}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={5}>
            <strong>Date of Birthday:</strong> {appData.dob}
          </Col>
          <Col md={7}>
            <strong>Date of Birthday:</strong> {appData.pob}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <strong>Address:</strong> {appData.houseno}, {appData.street},{" "}
            {brgyList !== false
              ? brgyList.filter(
                  (brgy) => brgy.brgy_code === appData.barangay
                )[0].brgy_name
              : ""}
            , San Rafael, Bulacan
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <strong>Highest Educational Attainment:</strong> {appData.hea}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <strong>Occupation:</strong> {appData.occupation}
          </Col>
          <Col md={6}>
            <strong>Monthly Income:</strong> {appData.monthly_income}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <strong>Total Monthly Family Income:</strong> {appData.tmfi}
          </Col>
          <Col md={6}>
            <strong>Contact Number:</strong> {appData.contact_number}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={7}>
            <strong>
              Contact Person{" "}
              <span className="text-muted">in case of emergency</span>:
            </strong>{" "}
            {appData.contact_person}
          </Col>
          <Col md={5}>
            <strong>Contact Number:</strong>{" "}
            {appData.contact_number_contact_person}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <div className="mb-1">
              <strong>I. Family Composition:</strong> (
              <span className="text-uppercase">
                PANGALAN NG MGA ANAK AT IBA PANG KASAMA SA BAHAY
              </span>
              )
            </div>
            <Table
              responsive
              size="sm"
              bordered
              style={{ textAlign: "center" }}
            >
              <thead>
                <tr>
                  <th width="20%">Name</th>
                  <th width="5%">Relationship</th>
                  <th width="5%">Age</th>
                  <th width="5%">Status</th>
                  <th width="10%">Birthday</th>
                  <th width="25%">Occupation/Monthly Income</th>
                </tr>
              </thead>
              <tbody dangerouslySetInnerHTML={{ __html: famComArr }}></tbody>
            </Table>
            Include family members and other members of the household.
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <div className="mb-1">
              <strong>
                II. Classification/Circumstances of Being a Solo Parent
              </strong>{" "}
              <small className="text-muted text-uppercase">
                (Dahilan ng pagiging solo parent)
              </small>
            </div>
            {appData.solo_parent_classification}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <div className="mb-1">
              <strong>III. Needs/Problems of Solo Parents:</strong>{" "}
              <small className="text-muted text-uppercase">
                (Mga pangangailangan bilang solo parent)
              </small>
            </div>
            {appData.needs_of_solo_parents}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <div className="mb-1">
              <strong>IV. Family Resources:</strong>
            </div>
            {appData.family_resources}
          </Col>
        </Row>
        <Row className="mt-3 mb-3">
          <Col md={12}>
            <div className="mb-1">
              <strong>Attached Documents:</strong>
            </div>
            {!appFiles
              ? "Loading..."
              : appFiles.map((d) => (
                  <div key={d.id}>
                    <a href={d.file_url} target="_blank" rel="noreferrer">
                      {d.file_name}
                    </a>
                  </div>
                ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ApplicationFormSoloParent;
