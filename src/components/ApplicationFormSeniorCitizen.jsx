import React from "react";

import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";

import { barangays } from "../api/phAddress";

import srbLogo from "../img/sanrafaellogo.png";

import "./adminsoloparentprint.css";

import axios from "axios";

const ApplicationFormSeniorCitizen = ({ appData, appFiles, appId }) => {
  let famCom = appData.fam_composition.split("\n");
  let [brgyList, setBrgyList] = React.useState(false);
  let [famComArr, setFamComArr] = React.useState(false);
  let [oscaIdNum, setOscaIdNum] = React.useState("");

  const living_arr = [
    { id: 1, name: "Living Alone" },
    { id: 2, name: "Living in Relatives" },
    { id: 3, name: "Own House" },
    { id: 4, name: "Renting" },
  ];

  const c_status = [
    { id: 1, name: "Single" },
    { id: 2, name: "Married" },
    { id: 3, name: "Widowed" },
    { id: 4, name: "Separated" },
  ];

  const educ_attain = [
    { id: 1, name: "Elementary" },
    { id: 2, name: "High School" },
    { id: 3, name: "College" },
    { id: 4, name: "Post Graduate" },
    { id: 5, name: "PhD" },
  ];

  const pensioner = [
    { id: 1, name: "GSIS" },
    { id: 2, name: "SSS" },
    { id: 3, name: "Private" },
    { id: 4, name: "No Pension" },
  ];

  const submitNumber = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API}application/additional`,
        {
          id: appId,
          appType: 3,
          oscaId: oscaIdNum,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
            "Allow-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => window.location.reload());
  };

  React.useEffect(() => {
    let isMounted = true;
    const getFamCom = () => {
      let holder,
        allParts = "";
      for (const element of famCom) {
        holder = element.split(",");
        allParts += `<tr><td>${holder[0]}</td><td>${holder[1]}</td><td>${holder[2]}</td><td>${holder[3]}</td><td>${holder[4]}</td><td>${holder[5]}</td><td>${holder[6]}</td><td>${holder[7]}</td><td>${holder[8]}</td></tr>`;
      }
      if (isMounted) {
        setFamComArr(allParts);
      }
    };

    getFamCom();

    barangays("031422").then((brgy) => {
      if (isMounted) {
        setBrgyList(brgy);
      }
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="paper-size">
        <Row className="pt-2 mt-2">
          <Col xxs={4} className="ps-3">
            <div className="sp-req p-1" style={{ border: "1px solid #000" }}>
              <p>Requirements:</p>
              <ul>
                <li>
                  Photocopy - Valid ID with birthday and address in San Rafael
                  (Voters, SSS/UMID, LTO, Passport)
                </li>
                <li>2pcs latest 1x1 colored ID picture in white background</li>
                <li>Affidavit of loss (if lost ID)</li>
                <li>
                  If no valid id available
                  <ul>
                    <li>birth certificate</li>
                    <li>certificate of residency</li>
                  </ul>
                </li>
              </ul>
            </div>
          </Col>
          <Col xxs={4} className="pt-5">
            <div className="form-title text-center">
              <div>
                <img src={srbLogo} alt="SRB Logo" className="form-logo" />
              </div>
              <p className="text-uppercase">
                <strong>Republic of the Philippines</strong>
              </p>{" "}
              <p>Province of Bulacan</p> <p>Municipality of San Rafael</p>
            </div>
          </Col>
          <Col xxs={4}>
            <div className="ct-img1">
              <strong className="text-uppercase text-above-photo">
                &nbsp;&nbsp;&nbsp;Form 5.1
              </strong>
              {!appFiles ? (
                "loading"
              ) : (
                <img
                  src={`${appFiles[0].image_url}`}
                  //src="https://www.salisburyut.com/wp-content/uploads/2020/09/avatar-1-768x768.jpeg"
                  alt="1x1 pic"
                  style={{ height: "1in", width: "1in" }}
                />
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xxs={12}>
            <div className="form-name">
              <p>Municipal Social Welfare and Development Office</p>
              <p style={{ textTransform: "uppercase", fontWeight: "600" }}>
                OSCA ID Application Form
              </p>
            </div>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={6}>
                <strong className="text-uppercase">A. Background Info:</strong>
              </Col>
              <Col xs={6} className="text-end">
                <strong className="text-uppercase">
                  OSCA ID No.{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {appData.oscaId}
                  </span>
                </strong>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={12}>
                <Row>
                  <Col xs={3}>Name of Senior Citizen:</Col>
                  <Col xs={9} style={{ borderBottom: "1px solid #000" }}>
                    <Row>
                      <Col className="text-center">
                        {appData.last_name}, {appData.first_name},{" "}
                        {appData.middle_name}
                      </Col>
                      {/* <Col xs={4}>{appData.last_name},</Col>
                      <Col xs={4}>{appData.first_name},</Col>
                      <Col xs={4}>{appData.middle_name}</Col> */}
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Row style={{ margin: "0 0.5rem" }}>
                <Col xs={12}>
                  <Row>
                    <Col xs={3}></Col>
                    <Col xs={9}>
                      <Row>
                        <Col className="text-center">
                          (Apelyido,&emsp;&emsp;Pangalan,&emsp;&emsp;Gitnang
                          Pangalan)
                        </Col>
                        {/* <Col xs={4}>(Apelyido,</Col>
                        <Col xs={4}>Pangalan,</Col>
                        <Col xs={4}>Gitnang Pangalan)</Col> */}
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
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
                    <Row>
                      <Col className="text-center">
                        {appData.houseno}, {appData.street},{" "}
                        {brgyList !== false
                          ? brgyList.filter(
                              (brgy) => brgy.brgy_code === appData.barangay
                            )[0].brgy_name
                          : ""}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Row style={{ margin: "0 0.5rem" }}>
                <Col xs={12}>
                  <Row>
                    <Col xs={2}></Col>
                    <Col xs={10}>
                      <Row>
                        <Col className="text-center">
                          (House No.,&emsp;&emsp;Street or
                          Sitio,&emsp;&emsp;Barangay)
                        </Col>
                        {/* <Col xs={4}>(House No.,</Col>
                        <Col xs={4}>Street or Sitio,</Col>
                        <Col xs={4}>Barangay)</Col> */}
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={10}>
                <Row>
                  <Col xs={3}>Living Arrangements:</Col>
                  <Col xs={9}>
                    Living Alone{" "}
                    <Form.Check
                      checked={
                        parseInt(appData.living_arr) === 1 ? true : false
                      }
                      type="checkbox"
                      style={{ display: "inline" }}
                    />{" "}
                    Living in Relatives{" "}
                    <Form.Check
                      checked={
                        parseInt(appData.living_arr) === 2 ? true : false
                      }
                      type="checkbox"
                      style={{ display: "inline" }}
                    />{" "}
                    Own House{" "}
                    <Form.Check
                      checked={
                        parseInt(appData.living_arr) === 3 ? true : false
                      }
                      type="checkbox"
                      style={{ display: "inline" }}
                    />{" "}
                    Renting{" "}
                    <Form.Check
                      checked={
                        parseInt(appData.living_arr) === 4 ? true : false
                      }
                      type="checkbox"
                      style={{ display: "inline" }}
                    />{" "}
                  </Col>
                </Row>
              </Col>
              <Col xs={2}>
                <Row>
                  <Col xs={4}>Years:</Col>
                  <Col xs={8} style={{ borderBottom: "1px solid #000" }}>
                    {appData.years}
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
                  <Col xs={3}>
                    Male:{" "}
                    <Form.Check
                      checked={parseInt(appData.sex) === 1 ? true : false}
                      type="checkbox"
                      style={{ display: "inline" }}
                    />{" "}
                    Female:{" "}
                    <Form.Check
                      checked={parseInt(appData.sex) === 2 ? true : false}
                      type="checkbox"
                      style={{ display: "inline" }}
                    />
                  </Col>
                  <Col xs={1}>Age:</Col>
                  <Col xs={1} style={{ borderBottom: "1px solid #000" }}>
                    {appData.age}
                  </Col>
                  <Col xs={1}>Status:</Col>
                  <Col xs={6}>
                    Single{" "}
                    <Form.Check
                      checked={parseInt(appData.sex) === 1 ? true : false}
                      type="checkbox"
                      style={{ display: "inline" }}
                    />{" "}
                    Married{" "}
                    <Form.Check
                      checked={parseInt(appData.sex) === 2 ? true : false}
                      type="checkbox"
                      style={{ display: "inline" }}
                    />{" "}
                    Widowed{" "}
                    <Form.Check
                      checked={parseInt(appData.sex) === 3 ? true : false}
                      type="checkbox"
                      style={{ display: "inline" }}
                    />{" "}
                    Separated{" "}
                    <Form.Check
                      checked={parseInt(appData.sex) === 4 ? true : false}
                      type="checkbox"
                      style={{ display: "inline" }}
                    />
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
                  <Col xs={4}>Highest Educational Attainment:</Col>
                  <Col xs={8}>
                    Elem.{" "}
                    <Form.Check
                      checked={
                        parseInt(appData.educ_attain) === 1 ? true : false
                      }
                      type="checkbox"
                      style={{ display: "inline" }}
                    />
                    &emsp; HS{" "}
                    <Form.Check
                      checked={
                        parseInt(appData.educ_attain) === 2 ? true : false
                      }
                      type="checkbox"
                      style={{ display: "inline" }}
                    />
                    &emsp; College{" "}
                    <Form.Check
                      checked={
                        parseInt(appData.educ_attain) === 3 ? true : false
                      }
                      type="checkbox"
                      style={{ display: "inline" }}
                    />
                    &emsp; Post Grad{" "}
                    <Form.Check
                      checked={
                        parseInt(appData.educ_attain) === 4 ? true : false
                      }
                      type="checkbox"
                      style={{ display: "inline" }}
                    />
                    &emsp; PHD{" "}
                    <Form.Check
                      checked={
                        parseInt(appData.educ_attain) === 5 ? true : false
                      }
                      type="checkbox"
                      style={{ display: "inline" }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={4}>
                <Row>
                  <Col xs={4}>Profession:</Col>
                  <Col xs={8} style={{ borderBottom: "1px solid #000" }}>
                    {appData.profession}
                  </Col>
                </Row>
              </Col>
              <Col xs={4}>
                <Row>
                  <Col xs={4}>Course:</Col>
                  <Col xs={8} style={{ borderBottom: "1px solid #000" }}>
                    {appData.course}
                  </Col>
                </Row>
              </Col>
              <Col xs={4}>
                <Row>
                  <Col xs={5}>Skills:</Col>
                  <Col xs={7} style={{ borderBottom: "1px solid #000" }}>
                    {appData.skills}
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
                  <Col xs={3}>Pensioner:</Col>
                  <Col xs={9}>
                    GSIS{" "}
                    <Form.Check
                      checked={
                        parseInt(appData.educ_attain) === 1 ? true : false
                      }
                      type="checkbox"
                      style={{ display: "inline" }}
                    />
                    &emsp; SSS{" "}
                    <Form.Check
                      checked={
                        parseInt(appData.educ_attain) === 2 ? true : false
                      }
                      type="checkbox"
                      style={{ display: "inline" }}
                    />
                    &emsp; Private{" "}
                    <Form.Check
                      checked={
                        parseInt(appData.educ_attain) === 3 ? true : false
                      }
                      type="checkbox"
                      style={{ display: "inline" }}
                    />
                    &emsp; No Pension{" "}
                    <Form.Check
                      checked={
                        parseInt(appData.educ_attain) === 4 ? true : false
                      }
                      type="checkbox"
                      style={{ display: "inline" }}
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={5}>
                <Row>
                  <Col xs={3}>Work:</Col>
                  <Col xs={9} style={{ borderBottom: "1px solid #000" }}>
                    {appData.work}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={4}>
                <Row>
                  <Col xs={4}>Religion:</Col>
                  <Col xs={8} style={{ borderBottom: "1px solid #000" }}>
                    {appData.religion}
                  </Col>
                </Row>
              </Col>
              <Col xs={4}>
                <Row>
                  <Col xs={4}>Ethnicity:</Col>
                  <Col xs={8} style={{ borderBottom: "1px solid #000" }}>
                    {appData.ethnicity}
                  </Col>
                </Row>
              </Col>
              <Col xs={4}>
                <Row>
                  <Col xs={5}>Organization:</Col>
                  <Col xs={7} style={{ borderBottom: "1px solid #000" }}>
                    {appData.organization}
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
                  <Col xs={3}>Health/Physical Condition:</Col>
                  <Col xs={9} style={{ borderBottom: "1px solid #000" }}>
                    {appData.hpcon}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={5}>
                <Row>
                  <Col xs={6}>Contact No. Mobile:</Col>
                  <Col xs={6} style={{ borderBottom: "1px solid #000" }}>
                    {appData.mobileno}
                  </Col>
                </Row>
              </Col>
              <Col xs={3}>
                <Row>
                  <Col xs={4}>Landline:</Col>
                  <Col xs={8} style={{ borderBottom: "1px solid #000" }}>
                    {appData.landline}
                  </Col>
                </Row>
              </Col>
              <Col xs={4}>
                <Row>
                  <Col xs={3}>Email:</Col>
                  <Col xs={9} style={{ borderBottom: "1px solid #000" }}>
                    {appData.email_address}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={4}>
                <Row>
                  <Col xs={5}>ID Shown:</Col>
                  <Col xs={7} style={{ borderBottom: "1px solid #000" }}>
                    {appData.id_shown}
                  </Col>
                </Row>
              </Col>
              <Col xs={5}>
                <Row>
                  <Col xs={4}>Issued By:</Col>
                  <Col xs={8} style={{ borderBottom: "1px solid #000" }}>
                    {appData.issued_by}
                  </Col>
                </Row>
              </Col>
              <Col xs={3}>
                <Row>
                  <Col xs={3}>Photo:</Col>
                  <Col xs={9}>
                    Yes{" "}
                    <Form.Check
                      checked={parseInt(appData.photo) === 1 ? true : false}
                      type="checkbox"
                      style={{ display: "inline" }}
                    />
                    &emsp; No{" "}
                    <Form.Check
                      checked={parseInt(appData.photo) === 2 ? true : false}
                      type="checkbox"
                      style={{ display: "inline" }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={5}>
                <Row>
                  <Col xs={4}>Issued on:</Col>
                  <Col xs={8} style={{ borderBottom: "1px solid #000" }}>
                    {appData.hpcon}
                  </Col>
                </Row>
              </Col>
              <Col xs={7}>
                <Row>
                  <Col xs={4}>Place of Issue:</Col>
                  <Col xs={8} style={{ borderBottom: "1px solid #000" }}>
                    {appData.hpcon}
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
                  <Col xs={4}>Contact Person:</Col>
                  <Col xs={8} style={{ borderBottom: "1px solid #000" }}>
                    {appData.contact_person}
                  </Col>
                </Row>
              </Col>
              <Col xs={6}>
                <Row>
                  <Col xs={4}>Relationship:</Col>
                  <Col xs={8} style={{ borderBottom: "1px solid #000" }}>
                    {appData.relationship}
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
                  <Col xs={2}>Address:</Col>
                  <Col xs={10} style={{ borderBottom: "1px solid #000" }}>
                    {appData.con_address}
                  </Col>
                </Row>
              </Col>
              <Col xs={4}>
                <Row>
                  <Col xs={5}>Contact no.:</Col>
                  <Col xs={7} style={{ borderBottom: "1px solid #000" }}>
                    {appData.con_con_no}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem", fontWeight: "600" }}>
              <Col xs={1}>B.</Col>
              <Col xs={11}>
                FAMILY COMPOSITION / HOUSEHOLD MEMBERS (Use additional paper if
                necessary)
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="form-body">
          <Col xxs={12} className="mt-1">
            <Row style={{ marginLeft: "0.2rem" }}>
              <Col xs={12}>
                <Table bordered size="sm">
                  <thead>
                    <tr>
                      <th width="30%">NAME</th>
                      <th width="5%">AGE</th>
                      <th width="10%">REL TO SC</th>
                      <th width="7%">CIVIL STAT</th>
                      <th width="15%">ADDRESS</th>
                      <th width="15%">CONTACT NO.</th>
                      <th width="7%">EDDUC ATT.</th>
                      <th width="7%">WORK</th>
                      <th width="4%">MONTHLY INCOME</th>
                    </tr>
                  </thead>
                  <tbody
                    dangerouslySetInnerHTML={{ __html: famComArr }}
                  ></tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="form-body">
          <Col xxs={12} className="mt-3">
            <Row style={{ margin: "0 0.5rem" }}>
              <Col xs={12}>
                <Row>
                  <Col
                    xs={12}
                    className="text-start"
                    style={{ fontWeight: "600" }}
                  >
                    SIGNATURE: (USE PENTEL PEN)
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} className="text-start">
                    <div>
                      {!appFiles ? (
                        "loading"
                      ) : (
                        <img
                          src={`${appFiles[1].image_url}`}
                          alt="signature"
                          height="90px"
                          width="300px"
                        />
                      )}
                    </div>
                    <div style={{ marginTop: "-20px" }}>_________________</div>
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
              OSCA ID Application Form
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-uppercase">A. Background Info:</p>
          </Col>
          <Col md={6}>
            <Form onSubmit={submitNumber}>
              <Form.Group className="mb-3">
                <Form.Label>OSCA ID No.</Form.Label>
                <Form.Control
                  required
                  defaultValue={appData.oscaId}
                  type="text"
                  name="oscaId"
                  id="oscaId"
                  onChange={(e) => setOscaIdNum(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <strong>Name of Senior Citizen:</strong> {appData.last_name},{" "}
            {appData.first_name} {appData.middle_name}
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
            <strong>Living Arrangement:</strong>{" "}
            {living_arr[parseInt(appData.living_arr)].name}
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
            <strong>Highest Educational Attainment:</strong>{" "}
            {educ_attain[parseInt(appData.educ_attain)].name}
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
            <strong>Pensioner:</strong>{" "}
            {pensioner[parseInt(appData.pensioner)].name}
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
            <strong>Email:</strong> {appData.email_address}
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
            <Table
              responsive
              size="sm"
              bordered
              style={{ textAlign: "center" }}
            >
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
              <tbody dangerouslySetInnerHTML={{ __html: famComArr }}></tbody>
            </Table>
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

export default ApplicationFormSeniorCitizen;
