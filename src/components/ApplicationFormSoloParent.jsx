import React, { useEffect } from "react";

import { Container, Row, Col, Table, Button } from "react-bootstrap";

import { barangays } from "select-philippines-address";

import srbLogo from "../img/sanrafaellogo.png";

const ApplicationFormSoloParent = ({ appData, appFiles, subDate }) => {
  let famCom = appData.fam_composition.split("\n");
  let [famComArr, setFamComArr] = React.useState(false);
  let [brgyList, setBrgyList] = React.useState(false);

  const changeDateFormat = (dateToChange) => {
    let theDate = new Date(dateToChange);
    return theDate.toLocaleDateString("en-US");
  };

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
      <div className="paper-size">
        <Row className="pt-2 mt-2">
          <Col xxs={4} className="ps-3">
            <div className="sp-req p-1" style={{ border: "1px solid #000" }}>
              <p>Mga kailangan:</p>
              <ul>
                <li>
                  2 piraso 1x1 ID picture (latest picture in white background)
                </li>
                <li>Solo parent certificate mula sa barangay (kung hiwalay)</li>
                <li>Death certificate kung balo / biyuda</li>
                <li>Birth certificate ng mga anak</li>
              </ul>
            </div>
          </Col>
          <Col xxs={4}>
            <div className="form-title text-center">
              <div>
                <img src={srbLogo} alt="SRB Logo" className="form-logo" />
              </div>
              <p>Republic of the Philippines</p> <p>Province of Bulacan</p>{" "}
              <p>Municipality of San Rafael</p>
            </div>
          </Col>
          <Col xxs={4}>
            {!appFiles ? (
              "loading"
            ) : (
              <img
                src={`https://${appFiles[0].image_url}`}
                //src="https://www.salisburyut.com/wp-content/uploads/2020/09/avatar-1-768x768.jpeg"
                alt="1x1 pic"
                className="ct-img"
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col xxs={12}>
            <div className="form-name">
              <p>Municipal Social Welfare and Development Office</p>
              <p style={{ textTransform: "uppercase" }}>
                APPLICATION FORM FOR SOLO PARENTS
              </p>
            </div>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={8}>
                <Row>
                  <Col xs={2}>Name:</Col>
                  <Col xs={10} style={{ borderBottom: "1px solid #000" }}>
                    {appData.last_name}, {appData.first_name}{" "}
                    {appData.middle_name}
                  </Col>
                </Row>
              </Col>
              <Col xs={2}>
                <Row>
                  <Col xs={5}>Age:</Col>
                  <Col xs={7} style={{ borderBottom: "1px solid #000" }}>
                    {appData.age}
                  </Col>
                </Row>
              </Col>
              <Col xs={2}>
                <Row>
                  <Col xs={5}>Sex:</Col>
                  <Col xs={7} style={{ borderBottom: "1px solid #000" }}>
                    {appData.sex === "1" ? "Male" : "Female"}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={6}>
                <Row>
                  <Col xs={4}>Date of Birth:</Col>
                  <Col xs={8} style={{ borderBottom: "1px solid #000" }}>
                    {appData.dob}
                  </Col>
                </Row>
              </Col>
              <Col xs={6}>
                <Row>
                  <Col xs={4}>Place of Birth:</Col>
                  <Col xs={8} style={{ borderBottom: "1px solid #000" }}>
                    {appData.pob}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={12}>
                <Row>
                  <Col xs={2}>Address:</Col>
                  <Col xs={10} style={{ borderBottom: "1px solid #000" }}>
                    {appData.houseno}, {appData.street},{" "}
                    {brgyList !== false
                      ? brgyList.filter(
                          (brgy) => brgy.brgy_code === appData.barangay
                        )[0].brgy_name
                      : ""}
                    , San Rafael, Bulacan
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={12}>
                <Row>
                  <Col xs={4}>Highest Educational Attainment:</Col>
                  <Col xs={8} style={{ borderBottom: "1px solid #000" }}>
                    {appData.hea}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={6}>
                <Row>
                  <Col xs={4}>Occupation:</Col>
                  <Col xs={8} style={{ borderBottom: "1px solid #000" }}>
                    {appData.occupation}
                  </Col>
                </Row>
              </Col>
              <Col xs={6}>
                <Row>
                  <Col xs={5}>Monthly Income:</Col>
                  <Col xs={7} style={{ borderBottom: "1px solid #000" }}>
                    {appData.monthly_income}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={7}>
                <Row>
                  <Col xs={6}>Total Monthly Family Income:</Col>
                  <Col xs={6} style={{ borderBottom: "1px solid #000" }}>
                    {appData.tmfi}
                  </Col>
                </Row>
              </Col>
              <Col xs={5}>
                <Row>
                  <Col xs={5}>Contact Number:</Col>
                  <Col xs={7} style={{ borderBottom: "1px solid #000" }}>
                    {appData.contact_number}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={8}>
                <Row>
                  <Col xs={6}>
                    Contact Person <small>in case of emergency</small>:
                  </Col>
                  <Col xs={6} style={{ borderBottom: "1px solid #000" }}>
                    {appData.contact_person}
                  </Col>
                </Row>
              </Col>
              <Col xs={4}>
                <Row>
                  <Col xs={5}>Contact #:</Col>
                  <Col xs={7} style={{ borderBottom: "1px solid #000" }}>
                    {appData.contact_number_contact_person}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={1}>I.</Col>
              <Col xs={11}>
                Family Composition: (PANGALAN NG MGA ANAK AT IBA PA KASAMA SA
                BAHAY)
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="form-body">
          <Col xxs={12} className="mt-1">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={12}>
                <Table bordered size="sm">
                  <thead>
                    <tr>
                      <th width="40%">Name</th>
                      <th width="12%">Relationship</th>
                      <th width="12%">Age</th>
                      <th width="12%">Status</th>
                      <th width="12%">Birthday</th>
                      <th width="12%">Occupation / Monthly Income</th>
                    </tr>
                  </thead>
                  <tbody
                    dangerouslySetInnerHTML={{ __html: famComArr }}
                  ></tbody>
                </Table>
              </Col>
            </Row>
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={1}></Col>
              <Col xs={11}>
                Include family members and other members of the household
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={1}>II.</Col>
              <Col xs={11}>
                Classification/Circumstances of Being a Solo Parent:{" "}
                <small>(DAHILAN NG PAGIGING SOLO PARENT)</small>
              </Col>
            </Row>
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={1}></Col>
              <Col xs={11} style={{ borderBottom: "1px solid #000" }}>
                {appData.solo_parent_classification}
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={1}>III.</Col>
              <Col xs={11}>
                Needs/Problems of Solo Parents:{" "}
                <small>(MGA PANGANGAILANGAN BILANG SOLO PARENT)</small>
              </Col>
            </Row>
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={1}></Col>
              <Col xs={11} style={{ borderBottom: "1px solid #000" }}>
                {appData.needs_of_solo_parents}
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={1}>IV.</Col>
              <Col xs={11}>Family Resources:</Col>
            </Row>
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={1}></Col>
              <Col xs={11} style={{ borderBottom: "1px solid #000" }}>
                {appData.family_resources}
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-2">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={1}></Col>
              <Col xs={11}>
                I hereby certify that the information given above are true and
                correct. I further understand that any misinterpretation that
                may have made will subject me to criminal and civil liabilities
                provided for by existing laws.
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={6}>
                <Row>
                  <Col
                    xs={12}
                    className="text-center"
                    style={{ marginTop: "70px" }}
                  >
                    <div>{changeDateFormat(subDate)}</div>
                    <div style={{ marginTop: "-20px" }}>_________________</div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} className="text-center">
                    Date
                  </Col>
                </Row>
              </Col>
              <Col xs={6}>
                <Row>
                  <Col xs={12} className="text-center">
                    <div>
                      {!appFiles ? (
                        "loading"
                      ) : (
                        <img
                          src={`https://${appFiles[1].image_url}`}
                          alt="signature"
                          height="90px"
                          width="300px"
                        />
                      )}
                    </div>
                    <div style={{ marginTop: "-20px" }}>_________________</div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} className="text-center">
                    Signature / Thumbmark Over Printed Name
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Row className="mb-3">
        <Col md={6}>
          Application Type:{" "}
          <strong>
            {appData.appli_type === "new" ? (
              <span className="text-primary">New</span>
            ) : (
              <span className="text-danger">Loss</span>
            )}
          </strong>
        </Col>
        <Col md={6}>
          <Button className="float-end" onClick={() => window.print()}>
            Print
          </Button>
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
            <strong>Place of Birthday:</strong> {appData.pob}
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
