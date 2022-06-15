import React from "react";

import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

import { barangays } from "select-philippines-address";

import dohLogo from "../img/dohlogo.png";

import axios from "axios";

const ApplicationFormPwd = ({ appData, subDate, appFiles, appId }) => {
  let [brgyList, setBrgyList] = React.useState(false);
  let [frmData, setFrmData] = React.useState({
    id: appId,
    appType: 3,
    pdnum: appData.pdnum,
    proc_off_last_name: appData.proc_off_last_name,
    proc_off_first_name: appData.proc_off_first_name,
    proc_off_middle_name: appData.proc_off_middle_name,
    appr_off_last_name: appData.appr_off_last_name,
    appr_off_first_name: appData.appr_off_first_name,
    appr_off_middle_name: appData.appr_off_middle_name,
    encoder_last_name: appData.encoder_last_name,
    encoder_first_name: appData.encoder_first_name,
    encoder_middle_name: appData.encoder_middle_name,
    reporting_unit: appData.reporting_unit,
    control_no: appData.control_no,
  });

  const isInt = (value) => {
    var x = parseFloat(value);
    return !isNaN(value) && (x | 0) === x;
  };

  const changeDateFormat = (dateToChange) => {
    let theDate = new Date(dateToChange);

    let theMonth =
      theDate.getMonth() + 1 < 10
        ? "0" + (theDate.getMonth() + 1)
        : theDate.getMonth() + 1;

    let theDay = theDate.getDate();
    let theYear = theDate.getFullYear();
    return theMonth + "/" + theDay + "/" + theYear;
  };

  let occupation = [
    {
      id: 1,
      name: "Managers",
    },
    {
      id: 2,
      name: "Professionals",
    },
    {
      id: 3,
      name: "Technicians, and Associate Professionals",
    },
    {
      id: 4,
      name: "Clerical Support Workers",
    },
    {
      id: 5,
      name: "Service and Sales Workers",
    },
    {
      id: 6,
      name: "Skilled Agricultural, Forestry and Fishery Workers",
    },
    {
      id: 7,
      name: "Craft and Related Trade Workers",
    },
    {
      id: 8,
      name: "Plant and Machine Operators and Assemblers",
    },
    {
      id: 9,
      name: "Elementary Occupations",
    },
    {
      id: 10,
      name: "Armed Forces Occupations",
    },
  ];

  React.useEffect(() => {
    let isMounted = true;

    barangays("031422").then((brgys) => {
      if (isMounted) {
        setBrgyList(brgys);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const textOnChange = (e) =>
    setFrmData({ ...frmData, [e.target.name]: e.target.value });

  const formOnSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}application/additional`, frmData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <Card className="border rounded p-3 mb-5">
        <Row>
          <Col xs={12}>
            <Form onSubmit={formOnSubmit}>
              <Row>
                <Col xs={6}>
                  <span
                    className="text-uppercase"
                    style={{ fontWeight: "600" }}
                  >
                    Additional information
                  </span>
                </Col>
                <Col xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      PERSONS WITH DISABILITY NUMBER (RR-PPMM-BBB-NNNNNNNN)
                    </Form.Label>{" "}
                    <span style={{ fontWeight: "600", color: "red" }}>*</span>
                    <Form.Control
                      required
                      type="text"
                      name="pdnum"
                      id="pdnum"
                      defaultValue={frmData.pdnum}
                      onChange={textOnChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Label>PROCESSING OFFICER</Form.Label>{" "}
                  <span style={{ fontWeight: "600", color: "red" }}>*</span>
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="proc_off_last_name"
                      id="proc_off_last_name"
                      defaultValue={frmData.proc_off_last_name}
                      onChange={textOnChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="proc_off_first_name"
                      id="proc_off_first_name"
                      defaultValue={frmData.proc_off_first_name}
                      onChange={textOnChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Middle name</Form.Label>
                    <Form.Control
                      type="text"
                      name="proc_off_middle_name"
                      id="proc_off_middle_name"
                      defaultValue={frmData.proc_off_middle_name}
                      onChange={textOnChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <Form.Label>APPROVING OFFICER</Form.Label>{" "}
                  <span style={{ fontWeight: "600", color: "red" }}>*</span>
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="appr_off_last_name"
                      id="appr_off_last_name"
                      defaultValue={frmData.appr_off_last_name}
                      onChange={textOnChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="appr_off_first_name"
                      id="appr_off_first_name"
                      defaultValue={frmData.appr_off_first_name}
                      onChange={textOnChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Middle name</Form.Label>
                    <Form.Control
                      type="text"
                      name="appr_off_middle_name"
                      id="appr_off_middle_name"
                      defaultValue={frmData.appr_off_middle_name}
                      onChange={textOnChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <Form.Label>ENCODER</Form.Label>{" "}
                  <span style={{ fontWeight: "600", color: "red" }}>*</span>
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="encoder_last_name"
                      id="encoder_last_name"
                      defaultValue={frmData.encoder_last_name}
                      onChange={textOnChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="encoder_first_name"
                      id="encoder_first_name"
                      defaultValue={frmData.encoder_first_name}
                      onChange={textOnChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Middle name</Form.Label>
                    <Form.Control
                      type="text"
                      name="encoder_middle_name"
                      id="encoder_middle_name"
                      defaultValue={frmData.encoder_middle_name}
                      onChange={textOnChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <Form.Label>
                    NAME OF REPORTING UNIT (OFFICE / SECTION)
                  </Form.Label>{" "}
                  <span style={{ fontWeight: "600", color: "red" }}>*</span>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      required
                      type="text"
                      name="reporting_unit"
                      id="reporting_unit"
                      defaultValue={frmData.reporting_unit}
                      onChange={textOnChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <Form.Label>CONTROL NO.</Form.Label>{" "}
                  <span style={{ fontWeight: "600", color: "red" }}>*</span>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      required
                      type="text"
                      name="control_no"
                      id="control_no"
                      defaultValue={frmData.control_no}
                      onChange={textOnChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Button type="submit">Save</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
      <div className="paper-size form-calibri">
        <Row className="pt-2 mt-3 ps-2">
          <Col xxs={12}>
            <div className="text-center">
              <img
                src={dohLogo}
                alt="SRB Logo"
                className="form-logo1"
                align="left"
                style={{ marginLeft: "2.5rem" }}
                // style={{ position: "absolute", left: "50px" }}
              />
              <div>
                <span
                  style={{ fontWeight: 600, fontSize: "1.3rem" }}
                  className="text-uppercase"
                >
                  Department of Health
                </span>
                <br />
                <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>
                  Philippine Registry For Persons with Disabilities Version 4.0
                </span>
                <br />
                <span style={{ fontWeight: 600, fontSize: "1.6rem" }}>
                  Application Form
                </span>
              </div>
            </div>
          </Col>
        </Row>

        <div className="ms-2 ps-2 pe-1" style={{ fontSize: "12px" }}>
          <Row
            style={{
              borderLeft: "1px solid #000",
              borderTop: "1px solid #000",
              borderBottom: "1px solid #000",
              borderRight: "1px solid #000",
            }}
          >
            <Col xs={10}>
              <Row style={{ borderRight: "1px solid #000" }}>
                <Col xs={3} className="pb-4">
                  1.
                </Col>
                <Col xs={3} className="pb-4">
                  <Form.Check
                    readOnly
                    inline
                    type="radio"
                    checked={appData.appli_type === "new" ? true : false}
                  />
                  <strong>NEW APPLICANT</strong>
                </Col>
                <Col xs={3} className="pb-4">
                  <Form.Check
                    readOnly
                    inline
                    type="radio"
                    checked={appData.appli_type === "renew" ? true : false}
                  />
                  <strong>RENEWAL</strong>{" "}
                </Col>
                <Col xs={3} className="pb-4">
                  <Form.Check
                    readOnly
                    inline
                    type="radio"
                    checked={appData.appli_type === "loss" ? true : false}
                  />
                  <strong>LOSS</strong>{" "}
                  <span style={{ fontWeight: "600", color: "red" }}>*</span>
                </Col>
              </Row>
            </Col>
            <Col xs={2}>
              <em>Place 1"x1"</em>
              <br />
              <em>Photo Here</em>
            </Col>
          </Row>
          <Row
            style={{
              borderBottom: "1px solid #000",
              borderRight: "1px solid #000",
            }}
          >
            <Col xs={10} style={{ borderLeft: "1px solid #000" }}>
              <Row
                style={{
                  borderBottom: "1px solid #000",
                  borderRight: "1px solid #000",
                }}
              >
                <Col xs={8} className="pb-2">
                  2.{" "}
                  <strong>
                    PERSONS WITH DISABILITY NUMBER (RR-PPMM-BBB-NNNNNNN){" "}
                    <span style={{ fontWeight: "600", color: "red" }}>*</span>
                  </strong>
                  <br />
                  <div>
                    {appData.pdnum === "" ? (
                      <span style={{ color: "red" }}>NOT YET SET!</span>
                    ) : (
                      appData.pdnum
                    )}
                  </div>
                </Col>
                <Col
                  xs={4}
                  style={{ borderLeft: "1px solid #000" }}
                  className="pb-2"
                >
                  3. <strong>DATE APPLIED:</strong>{" "}
                  <span style={{ fontWeight: "600", color: "red" }}>*</span> (
                  <span style={{ textTransform: "lowercase" }}>mm/dd/yyyy</span>
                  ) <br />
                  {changeDateFormat(subDate)}
                </Col>
              </Row>
              <Row
                style={{
                  borderBottom: "1px solid #000",
                  borderRight: "1px solid #000",
                }}
              >
                <Col xs={12}>
                  4.{" "}
                  <strong>
                    PERSONAL INFORMATION{" "}
                    <span style={{ fontWeight: "600", color: "red" }}>*</span>
                  </strong>
                </Col>
              </Row>
              <Row style={{ borderRight: "1px solid #000" }}>
                <Col
                  xs={3}
                  style={{ borderRight: "1px solid #000" }}
                  className="text-center"
                >
                  <strong>
                    LAST NAME:
                    <span style={{ fontWeight: "600", color: "red" }}>
                      *
                    </span>{" "}
                  </strong>
                  <br />
                  {appData.last_name}
                </Col>
                <Col
                  xs={3}
                  style={{ borderRight: "1px solid #000" }}
                  className="pb-1 text-center"
                >
                  <strong>
                    FIRST NAME:
                    <span style={{ fontWeight: "600", color: "red" }}>
                      *
                    </span>{" "}
                  </strong>
                  <br />
                  {appData.first_name}
                </Col>
                <Col
                  xs={3}
                  style={{ borderRight: "1px solid #000" }}
                  className="pb-1 text-center"
                >
                  <strong>
                    MIDDLE NAME:
                    <span style={{ fontWeight: "600", color: "red" }}>
                      *
                    </span>{" "}
                  </strong>
                  <br />
                  {appData.middle_name}
                </Col>
                <Col xs={3} className="pb-1 text-center">
                  <strong>
                    SUFFIX:
                    <span style={{ fontWeight: "600", color: "red" }}>
                      *
                    </span>{" "}
                  </strong>
                  <br />
                  {appData.suffix}
                </Col>
              </Row>
            </Col>
            <Col xs={2}>
              {!appFiles ? (
                "loading"
              ) : (
                <img
                  src={`${appFiles[0].image_url}`}
                  //src="https://www.salisburyut.com/wp-content/uploads/2020/09/avatar-1-768x768.jpeg"
                  alt="1x1 pic"
                  style={{
                    height: "1in",
                    width: "1in",
                    float: "left",
                    marginTop: "2px",
                  }}
                />
              )}
            </Col>
          </Row>
          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={6} style={{ borderRight: "1px solid #000" }}>
              5. <strong>DATE OF BIRTH:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span> (
              <span style={{ textTransform: "lowercase" }}>mm/dd/yyyy</span>)
              <br />
              {changeDateFormat(appData.dob)}
            </Col>
            <Col xs={6}>
              6. <strong>SEX:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              <div className="ms-4">
                <Form.Check
                  readOnly
                  inline
                  style={{ marginBottom: "-10px" }}
                  label="MALE"
                  type="radio"
                  checked={appData.sex === "1" ? true : false}
                />
                <Form.Check
                  readOnly
                  className="ms-5"
                  style={{ marginBottom: "-10px" }}
                  inline
                  label="FEMALE"
                  type="radio"
                  checked={appData.sex === "2" ? true : false}
                />
              </div>
            </Col>
          </Row>
          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={12}>
              7. <strong>CIVIL STATUS:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              <Form.Check
                readOnly
                inline
                label="Single"
                type="radio"
                style={{ marginBottom: "-10px" }}
                checked={appData.cs === "1" ? true : false}
              />
              <Form.Check
                readOnly
                className="ms-5"
                inline
                label="Separated"
                type="radio"
                style={{ marginBottom: "-10px" }}
                checked={appData.cs === "4" ? true : false}
              />
              <Form.Check
                readOnly
                className="ms-5"
                inline
                label="Cohabitation (live-in)"
                type="radio"
                style={{ marginBottom: "-10px" }}
                checked={appData.cs === "5" ? true : false}
              />
              <Form.Check
                readOnly
                className="ms-5"
                inline
                label="Married"
                type="radio"
                style={{ marginBottom: "-10px" }}
                checked={appData.cs === "2" ? true : false}
              />
              <Form.Check
                readOnly
                className="ms-5"
                inline
                label="Widow/er"
                type="radio"
                style={{ marginBottom: "-10px" }}
                checked={appData.cs === "3" ? true : false}
              />
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={6} style={{ borderRight: "1px solid #000" }}>
              8. <strong>TYPE OF DISABILITY:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              <Row>
                <Col xs={6}>
                  <Form.Check
                    readOnly
                    inline
                    className="ps-3"
                    label="Deaf or Hard of Hearing"
                    type="checkbox"
                    checked={appData.tod1}
                    style={{ padding: 0, margin: 0 }}
                  />
                  <Form.Check
                    readOnly
                    inline
                    className="ps-3"
                    label="Intellectual Disability"
                    type="checkbox"
                    checked={appData.tod2}
                    style={{ padding: 0, margin: 0 }}
                  />
                  <Form.Check
                    readOnly
                    inline
                    className="ps-3"
                    label="Learning Disability"
                    type="checkbox"
                    checked={appData.tod3}
                    style={{ padding: 0, margin: 0 }}
                  />
                  <Form.Check
                    readOnly
                    inline
                    className="ps-3"
                    label="Mental Disability"
                    type="checkbox"
                    checked={appData.tod4}
                    style={{ padding: 0, margin: 0 }}
                  />
                  <Form.Check
                    readOnly
                    inline
                    className="ps-3"
                    label="Physical Disability(Orthopedic)"
                    type="checkbox"
                    checked={appData.tod5}
                    style={{ padding: 0, margin: 0 }}
                  />
                </Col>
                <Col xs={6} className="ps-4">
                  <Form.Check
                    readOnly
                    inline
                    label="Psychosocial Disability"
                    type="checkbox"
                    checked={appData.tod6}
                    style={{ padding: 0, margin: 0 }}
                  />
                  <Form.Check
                    readOnly
                    inline
                    label="Speech and Language Impairment"
                    type="checkbox"
                    checked={appData.tod7}
                    style={{ padding: 0, margin: 0 }}
                  />
                  <Form.Check
                    readOnly
                    inline
                    label="Visual Disability"
                    type="checkbox"
                    checked={appData.tod8}
                    style={{ padding: 0, margin: 0 }}
                  />
                  <Form.Check
                    readOnly
                    label="Cancer(RA11215)"
                    type="checkbox"
                    checked={appData.tod9}
                    style={{ padding: 0, margin: 0 }}
                  />
                  <Form.Check
                    readOnly
                    label="Rare Disease(RA10747)"
                    type="checkbox"
                    checked={appData.tod10}
                    style={{ padding: 0, margin: 0 }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={6}>
              9. <strong>CAUSE OF DISABILITY:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              <Row>
                <Col xs={6}>
                  <Form.Check
                    readOnly
                    className="ps-3"
                    label="Congenital / Inborn"
                    type="checkbox"
                    checked={appData.congenital}
                    style={{ padding: 0, margin: 0, fontWeight: "600" }}
                  />
                  <div className="ms-2">
                    <Form.Check
                      readOnly
                      className="ps-3"
                      label="ADHD"
                      type="checkbox"
                      checked={!appData.congenital ? false : appData.conge1}
                      style={{ padding: 0, margin: 0 }}
                    />
                    <Form.Check
                      readOnly
                      className="ps-3"
                      label="Cerebral Palsy"
                      type="checkbox"
                      checked={!appData.congenital ? false : appData.conge2}
                      style={{ padding: 0, margin: 0 }}
                    />
                    <Form.Check
                      readOnly
                      className="ps-3"
                      label="Down Syndrome"
                      type="checkbox"
                      checked={!appData.congenital ? false : appData.conge3}
                      style={{ padding: 0, margin: 0 }}
                    />
                    <Form.Check
                      readOnly
                      inline
                      className="ps-3"
                      label="Others, Specify:"
                      type="checkbox"
                      checked={
                        !appData.congenital
                          ? false
                          : appData.congeothers === "" || !appData.congeothers
                          ? false
                          : true
                      }
                      style={{ padding: 0, margin: 0 }}
                    />{" "}
                    {!appData.congenital ? "" : appData.congeothers}
                  </div>
                </Col>
                <Col xs={6} className="ps-2">
                  <Form.Check
                    readOnly
                    className="ps-3"
                    label="Acquired"
                    type="checkbox"
                    checked={appData.acquiredC}
                    style={{ padding: 0, margin: 0, fontWeight: "600" }}
                  />
                  <div className="ms-2">
                    <Form.Check
                      readOnly
                      className="ps-3"
                      label="Chronic Illness"
                      type="checkbox"
                      checked={!appData.acquiredC ? false : appData.acqC1}
                      style={{ padding: 0, margin: 0 }}
                    />
                    <Form.Check
                      readOnly
                      className="ps-3"
                      label="Cerebral Palsy"
                      type="checkbox"
                      checked={!appData.acquiredC ? false : appData.acqC2}
                      style={{ padding: 0, margin: 0 }}
                    />
                    <Form.Check
                      readOnly
                      className="ps-3"
                      label="Injury"
                      type="checkbox"
                      checked={!appData.acquiredC ? false : appData.acqC3}
                      style={{ padding: 0, margin: 0 }}
                    />
                    <Form.Check
                      readOnly
                      inline
                      className="ps-3"
                      label="Others, Specify:"
                      type="checkbox"
                      checked={
                        !appData.acquiredC
                          ? false
                          : appData.acqCothers === "" || !appData.acqCothers
                          ? false
                          : true
                      }
                      style={{ padding: 0, margin: 0 }}
                    />{" "}
                    {!appData.acquiredC ? "" : appData.acqCothers}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={12}>
              10. <strong>RESIDENCE ADDRESS:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              <strong>House No. and Street:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              {appData.houseno}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              <strong>Barangay:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              {brgyList !== false
                ? brgyList.filter(
                    (brgy) => brgy.brgy_code === appData.barangay
                  )[0].brgy_name
                : ""}
            </Col>
            <Col xs={2} style={{ borderRight: "1px solid #000" }}>
              <strong>Municipality:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              San Rafael
            </Col>
            <Col xs={2} style={{ borderRight: "1px solid #000" }}>
              <strong>Province:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              Bulacan
            </Col>
            <Col xs={2}>
              <strong>Region:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              Region III
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={12}>
              11. <strong>CONTACT DETAILS:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={4} style={{ borderRight: "1px solid #000" }}>
              <strong>Landline No.:</strong> <br />
              {appData.landline_no}
            </Col>
            <Col xs={4} style={{ borderRight: "1px solid #000" }}>
              <strong>Mobile No.:</strong> <br />
              {appData.mobile_no}
            </Col>
            <Col xs={4}>
              <strong>E-mail Address:</strong> <br />
              {appData.email_address}
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={7} style={{ borderRight: "1px solid #000" }}>
              12. <strong>EDUCTIONAL ATTAINMENT:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <Row style={{ borderBottom: "1px solid #000" }}>
                <Col xs={12}>
                  <Row className="ms-1">
                    <Col xs={6}>
                      <Form.Check
                        readOnly
                        className="ps-3"
                        label="None"
                        type="radio"
                        checked={appData.educ_attain === "1" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                      <Form.Check
                        readOnly
                        className="ps-3"
                        label="Kindergarten"
                        type="radio"
                        checked={appData.educ_attain === "2" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                      <Form.Check
                        readOnly
                        className="ps-3"
                        label="Elementary"
                        type="radio"
                        checked={appData.educ_attain === "3" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                      <Form.Check
                        readOnly
                        className="ps-3"
                        label="Junior High School"
                        type="radio"
                        checked={appData.educ_attain === "4" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                    </Col>
                    <Col xs={6}>
                      <Form.Check
                        readOnly
                        className="ps-3"
                        label="Senior High School"
                        type="radio"
                        checked={appData.educ_attain === "5" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                      <Form.Check
                        readOnly
                        className="ps-3"
                        label="College"
                        type="radio"
                        checked={appData.educ_attain === "6" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                      <Form.Check
                        readOnly
                        className="ps-3"
                        label="Vocational"
                        type="radio"
                        checked={appData.educ_attain === "7" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                      <Form.Check
                        readOnly
                        className="ps-3"
                        label="Post Graduate"
                        type="radio"
                        checked={appData.educ_attain === "8" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Col xs={6}>
                      <Row
                        style={{
                          borderBottom: "1px solid #000",
                          borderRight: "1px solid #000",
                        }}
                      >
                        <Col xs={12}>
                          13. <strong>STATUS OF EMPLOYMENT:</strong>{" "}
                          <span style={{ fontWeight: "600", color: "red" }}>
                            *
                          </span>
                          <br />
                          <Form.Check
                            readOnly
                            className="ps-4"
                            label="Employed"
                            type="radio"
                            checked={appData.es === "1" ? true : false}
                            style={{ padding: 0, margin: 0 }}
                          />
                          <Form.Check
                            readOnly
                            className="ps-4"
                            label="Unemployed"
                            type="radio"
                            checked={appData.es === "2" ? true : false}
                            style={{ padding: 0, margin: 0 }}
                          />
                          <Form.Check
                            readOnly
                            className="ps-4"
                            label="Self-employed"
                            type="radio"
                            checked={appData.es === "3" ? true : false}
                            style={{ padding: 0, margin: 0 }}
                          />
                        </Col>
                      </Row>
                      <Row
                        style={{
                          borderRight: "1px solid #000",
                        }}
                        className="pb-3"
                      >
                        <Col xs={12}>
                          13 a. <strong>CATEGORY OF EMPLOYMENT:</strong>{" "}
                          <span style={{ fontWeight: "600", color: "red" }}>
                            *
                          </span>
                          <br />
                          <Form.Check
                            readOnly
                            className="ps-4"
                            label="Government"
                            type="radio"
                            checked={appData.t_of_emp === "2" ? true : false}
                            style={{ padding: 0, margin: 0 }}
                          />
                          <Form.Check
                            readOnly
                            className="ps-4"
                            label="Private"
                            type="radio"
                            checked={appData.t_of_emp === "1" ? true : false}
                            style={{ padding: 0, margin: 0 }}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={6}>
                      13 b. <strong>TYPES OF EMPLOYMENT:</strong>{" "}
                      <span style={{ fontWeight: "600", color: "red" }}>*</span>
                      <br />
                      <Form.Check
                        readOnly
                        className="ps-4"
                        label="Permanent / Regular"
                        type="radio"
                        checked={appData.t_of_emper === "1" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                      <Form.Check
                        readOnly
                        className="ps-4"
                        label="Seasonal"
                        type="radio"
                        checked={appData.t_of_emper === "6" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                      <Form.Check
                        readOnly
                        className="ps-4"
                        label="Casual"
                        type="radio"
                        checked={appData.t_of_emper === "4" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                      <Form.Check
                        readOnly
                        className="ps-4"
                        label="Emergency"
                        type="radio"
                        checked={appData.t_of_emper === "7" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs={5}>
              14. <strong>OCCUPATION:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              {occupation.map((d) => (
                <Form.Check
                  readOnly
                  key={d.id}
                  className="ps-4"
                  label={d.name}
                  type="radio"
                  checked={d.id === parseInt(appData.occu) ? true : false}
                  style={{ padding: 0, margin: 0 }}
                />
              ))}
              <Form.Check
                readOnly
                inline
                className="ps-4"
                label="Others, specify:"
                type="radio"
                checked={isInt(appData.occu) ? false : true}
                style={{ padding: 0, margin: 0 }}
              />{" "}
              {isInt(appData.occu) ? "_______" : appData.occu}
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={12}>
              15. <strong>ORGANIZATION INFORMATION:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              <strong>Organization Affiliated:</strong> <br />
              {appData.orgaff}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              <strong>Contact Person:</strong> <br />
              {appData.conper}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              <strong>Office Address:</strong> <br />
              {appData.offadd}
            </Col>
            <Col xs={3}>
              <strong>Tel Nos.:</strong> <br />
              {appData.telno}
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={12}>
              16. <strong>ID REFERENCE NO.:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col style={{ borderRight: "1px solid #000" }}>
              <strong>SSS NO.:</strong> <br />
              {appData.sss}
            </Col>
            <Col style={{ borderRight: "1px solid #000" }}>
              <strong>GSIS NO.:</strong> <br />
              {appData.gsis}
            </Col>
            <Col style={{ borderRight: "1px solid #000" }}>
              <strong>PAG-IBIG NO.:</strong> <br />
              {appData.pagibig}
            </Col>
            <Col style={{ borderRight: "1px solid #000" }}>
              <strong>PSN NO.:</strong> <br />
              {appData.psnno}
            </Col>
            <Col>
              <strong>PhilHealth NO.:</strong> <br />
              {appData.philhealth}
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              17. <strong>FAMILY BACKGROUND:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
            </Col>
            <Col
              xs={3}
              className="text-center"
              style={{ borderRight: "1px solid #000" }}
            >
              <strong>LAST NAME</strong>
            </Col>
            <Col
              xs={3}
              className="text-center"
              style={{ borderRight: "1px solid #000" }}
            >
              <strong>FIRST NAME</strong>
            </Col>
            <Col className="text-center" xs={3}>
              <strong>MIDDLE NAME</strong>
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col
              className="text-end"
              xs={3}
              style={{ borderRight: "1px solid #000" }}
            >
              FATHER'S NAME:
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.father_last_name}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.father_first_name}
            </Col>
            <Col xs={3}>{appData.father_middle_name}</Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col
              className="text-end"
              xs={3}
              style={{ borderRight: "1px solid #000" }}
            >
              MOTHER'S NAME:
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.mother_last_name}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.mother_first_name}
            </Col>
            <Col xs={3}>{appData.mother_middle_name}</Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col
              className="text-end"
              xs={3}
              style={{ borderRight: "1px solid #000" }}
            >
              GUARDIAN'S NAME:
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.guardian_last_name}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.guardian_first_name}
            </Col>
            <Col xs={3}>{appData.guardian_middle_name}</Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              18. <strong>ACCOMPLISHED BY:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <div className="ms-2">
                <Form.Check
                  readOnly
                  className="ps-4"
                  label="APPLICANT"
                  type="radio"
                  checked={appData.accomBy === "1" ? true : false}
                  style={{ padding: 0, marginBottom: "-8px" }}
                />
                <Form.Check
                  readOnly
                  className="ps-4"
                  label="GUARDIAN"
                  type="radio"
                  checked={appData.accomBy === "2" ? true : false}
                  style={{ padding: 0, marginBottom: "-8px" }}
                />
                <Form.Check
                  readOnly
                  className="ps-4"
                  label="REPRESENTATIVE"
                  type="radio"
                  checked={appData.accomBy === "3" ? true : false}
                  style={{ padding: 0, marginBottom: "0" }}
                />
              </div>
            </Col>
            <Col xs={9}>
              <Row style={{ borderBottom: "1px solid #000" }}>
                <Col
                  className="text-center"
                  style={{ borderRight: "1px solid #000" }}
                >
                  <strong>LAST NAME</strong>
                </Col>
                <Col
                  className="text-center"
                  style={{ borderRight: "1px solid #000" }}
                >
                  <strong>FIRST NAME</strong>
                </Col>
                <Col className="text-center">
                  <strong>MIDDLE NAME</strong>
                </Col>
              </Row>
              <Row style={{ borderBottom: "1px solid #000" }}>
                <Col style={{ borderRight: "1px solid #000" }}>
                  {appData.accomBy === "1" ? appData.accom_last_name : "-"}
                </Col>
                <Col style={{ borderRight: "1px solid #000" }}>
                  {appData.accomBy === "1" ? appData.accom_first_name : "-"}
                </Col>
                <Col>
                  {appData.accomBy === "1" ? appData.accom_middle_name : "-"}
                </Col>
              </Row>
              <Row style={{ borderBottom: "1px solid #000" }}>
                <Col style={{ borderRight: "1px solid #000" }}>
                  {appData.accomBy === "2" ? appData.accom_last_name : "-"}
                </Col>
                <Col style={{ borderRight: "1px solid #000" }}>
                  {appData.accomBy === "2" ? appData.accom_first_name : "-"}
                </Col>
                <Col>
                  {appData.accomBy === "2" ? appData.accom_middle_name : "-"}
                </Col>
              </Row>
              <Row>
                <Col style={{ borderRight: "1px solid #000" }}>
                  {appData.accomBy === "3" ? appData.accom_last_name : "-"}
                </Col>
                <Col style={{ borderRight: "1px solid #000" }}>
                  {appData.accomBy === "3" ? appData.accom_first_name : "-"}
                </Col>
                <Col>
                  {appData.accomBy === "3" ? appData.accom_middle_name : "-"}
                </Col>
              </Row>
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              19. <strong>NAME OF CERTIFYING PHYSICIAN:</strong>
              <div className="ms-4">LICENSE NO.:</div>
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.cert_ph_last_name}
              <br />
              <br />
              {appData.lic_no}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.cert_ph_first_name}
            </Col>
            <Col xs={3}>{appData.cert_ph_middle_name}</Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              20. <strong>PROCESSING OFFICER:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.proc_off_last_name === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.proc_off_last_name
              )}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.proc_off_first_name === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.proc_off_first_name
              )}
            </Col>
            <Col xs={3}>
              {appData.proc_off_middle_name === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.proc_off_middle_name
              )}
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              21. <strong>APPROVING OFFICER:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.appr_off_last_name === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.appr_off_last_name
              )}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.appr_off_first_name === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.appr_off_first_name
              )}
            </Col>
            <Col xs={3}>
              {appData.appr_off_middle_name === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.appr_off_middle_name
              )}
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              22. <strong>ENCODER:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.encoder_last_name === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.encoder_last_name
              )}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.encoder_first_name === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.encoder_first_name
              )}
            </Col>
            <Col xs={3}>
              {appData.encoder_middle_name === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.encoder_middle_name
              )}
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={12}>
              23. <strong>NAME OF REPORTING UNIT(OFFICE/SECTION):</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>{" "}
              {appData.reporting_unit === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.reporting_unit
              )}
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={12}>
              24. <strong>CONTROL NO.:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>{" "}
              {appData.control_no === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.control_no
              )}
            </Col>
          </Row>
        </div>
      </div>
      <Button onClick={() => window.print()}>Print</Button>
      <div className="paper-size1 form-calibri">
        <Row className="pt-2 mt-3 ps-2">
          <Col xxs={12}>
            <div className="text-center">
              <img
                src={dohLogo}
                alt="SRB Logo"
                className="form-logo1"
                align="left"
                style={{ marginLeft: "2.5rem" }}
                // style={{ position: "absolute", left: "50px" }}
              />
              <div>
                <span
                  style={{ fontWeight: 600, fontSize: "1.3rem" }}
                  className="text-uppercase"
                >
                  Department of Health
                </span>
                <br />
                <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>
                  Philippine Registry For Persons with Disabilities Version 4.0
                </span>
                <br />
                <span style={{ fontWeight: 600, fontSize: "1.6rem" }}>
                  Application Form
                </span>
              </div>
            </div>
          </Col>
        </Row>

        <div className="ms-2 ps-2 pe-1" style={{ fontSize: "12px" }}>
          <Row
            style={{
              borderLeft: "1px solid #000",
              borderTop: "1px solid #000",
              borderBottom: "1px solid #000",
              borderRight: "1px solid #000",
            }}
          >
            <Col xs={10}>
              <Row style={{ borderRight: "1px solid #000" }}>
                <Col xs={3} className="pb-4">
                  1.
                </Col>
                <Col xs={3} className="pb-4">
                  <Form.Check
                    readOnly
                    inline
                    type="radio"
                    checked={appData.appli_type === "new" ? true : false}
                  />
                  <strong>NEW APPLICANT</strong>
                </Col>
                <Col xs={3} className="pb-4">
                  <Form.Check
                    readOnly
                    inline
                    type="radio"
                    checked={appData.appli_type === "renew" ? true : false}
                  />
                  <strong>RENEWAL</strong>{" "}
                </Col>
                <Col xs={3} className="pb-4">
                  <Form.Check
                    readOnly
                    inline
                    type="radio"
                    checked={appData.appli_type === "loss" ? true : false}
                  />
                  <strong>LOSS</strong>{" "}
                  <span style={{ fontWeight: "600", color: "red" }}>*</span>
                </Col>
              </Row>
            </Col>
            <Col xs={2}>
              <em>Place 1"x1"</em>
              <br />
              <em>Photo Here</em>
            </Col>
          </Row>
          <Row
            style={{
              borderBottom: "1px solid #000",
              borderRight: "1px solid #000",
            }}
          >
            <Col xs={10} style={{ borderLeft: "1px solid #000" }}>
              <Row
                style={{
                  borderBottom: "1px solid #000",
                  borderRight: "1px solid #000",
                }}
              >
                <Col xs={8} className="pb-2">
                  2.{" "}
                  <strong>
                    PERSONS WITH DISABILITY NUMBER (RR-PPMM-BBB-NNNNNNN){" "}
                    <span style={{ fontWeight: "600", color: "red" }}>*</span>
                  </strong>
                  <br />
                  <div>
                    {appData.pdnum === "" ? (
                      <span style={{ color: "red" }}>NOT YET SET!</span>
                    ) : (
                      appData.pdnum
                    )}
                  </div>
                </Col>
                <Col
                  xs={4}
                  style={{ borderLeft: "1px solid #000" }}
                  className="pb-2"
                >
                  3. <strong>DATE APPLIED:</strong>{" "}
                  <span style={{ fontWeight: "600", color: "red" }}>*</span> (
                  <span style={{ textTransform: "lowercase" }}>mm/dd/yyyy</span>
                  ) <br />
                  {changeDateFormat(subDate)}
                </Col>
              </Row>
              <Row
                style={{
                  borderBottom: "1px solid #000",
                  borderRight: "1px solid #000",
                }}
              >
                <Col xs={12}>
                  4.{" "}
                  <strong>
                    PERSONAL INFORMATION{" "}
                    <span style={{ fontWeight: "600", color: "red" }}>*</span>
                  </strong>
                </Col>
              </Row>
              <Row style={{ borderRight: "1px solid #000" }}>
                <Col
                  xs={3}
                  style={{ borderRight: "1px solid #000" }}
                  className="text-center"
                >
                  <strong>
                    LAST NAME:
                    <span style={{ fontWeight: "600", color: "red" }}>
                      *
                    </span>{" "}
                  </strong>
                  <br />
                  {appData.last_name}
                </Col>
                <Col
                  xs={3}
                  style={{ borderRight: "1px solid #000" }}
                  className="pb-1 text-center"
                >
                  <strong>
                    FIRST NAME:
                    <span style={{ fontWeight: "600", color: "red" }}>
                      *
                    </span>{" "}
                  </strong>
                  <br />
                  {appData.first_name}
                </Col>
                <Col
                  xs={3}
                  style={{ borderRight: "1px solid #000" }}
                  className="pb-1 text-center"
                >
                  <strong>
                    MIDDLE NAME:
                    <span style={{ fontWeight: "600", color: "red" }}>
                      *
                    </span>{" "}
                  </strong>
                  <br />
                  {appData.middle_name}
                </Col>
                <Col xs={3} className="pb-1 text-center">
                  <strong>
                    SUFFIX:
                    <span style={{ fontWeight: "600", color: "red" }}>
                      *
                    </span>{" "}
                  </strong>
                  <br />
                  {appData.suffix}
                </Col>
              </Row>
            </Col>
            <Col xs={2}>
              {!appFiles ? (
                "loading"
              ) : (
                <img
                  src={`${appFiles[0].image_url}`}
                  //src="https://www.salisburyut.com/wp-content/uploads/2020/09/avatar-1-768x768.jpeg"
                  alt="1x1 pic"
                  style={{
                    height: "1in",
                    width: "1in",
                    float: "left",
                    marginTop: "2px",
                  }}
                />
              )}
            </Col>
          </Row>
          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={6} style={{ borderRight: "1px solid #000" }}>
              5. <strong>DATE OF BIRTH:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span> (
              <span style={{ textTransform: "lowercase" }}>mm/dd/yyyy</span>)
              <br />
              {changeDateFormat(appData.dob)}
            </Col>
            <Col xs={6}>
              6. <strong>SEX:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              <div className="ms-4">
                <Form.Check
                  readOnly
                  inline
                  style={{ marginBottom: "-10px" }}
                  label="MALE"
                  type="radio"
                  checked={appData.sex === "1" ? true : false}
                />
                <Form.Check
                  readOnly
                  className="ms-5"
                  style={{ marginBottom: "-10px" }}
                  inline
                  label="FEMALE"
                  type="radio"
                  checked={appData.sex === "2" ? true : false}
                />
              </div>
            </Col>
          </Row>
          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={12}>
              7. <strong>CIVIL STATUS:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              <Form.Check
                readOnly
                inline
                label="Single"
                type="radio"
                style={{ marginBottom: "-10px" }}
                checked={appData.cs === "1" ? true : false}
              />
              <Form.Check
                readOnly
                className="ms-5"
                inline
                label="Separated"
                type="radio"
                style={{ marginBottom: "-10px" }}
                checked={appData.cs === "4" ? true : false}
              />
              <Form.Check
                readOnly
                className="ms-5"
                inline
                label="Cohabitation (live-in)"
                type="radio"
                style={{ marginBottom: "-10px" }}
                checked={appData.cs === "5" ? true : false}
              />
              <Form.Check
                readOnly
                className="ms-5"
                inline
                label="Married"
                type="radio"
                style={{ marginBottom: "-10px" }}
                checked={appData.cs === "2" ? true : false}
              />
              <Form.Check
                readOnly
                className="ms-5"
                inline
                label="Widow/er"
                type="radio"
                style={{ marginBottom: "-10px" }}
                checked={appData.cs === "3" ? true : false}
              />
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={6} style={{ borderRight: "1px solid #000" }}>
              8. <strong>TYPE OF DISABILITY:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              <Row>
                <Col xs={6}>
                  <Form.Check
                    readOnly
                    inline
                    className="ps-3"
                    label="Deaf or Hard of Hearing"
                    type="checkbox"
                    checked={appData.tod1}
                    style={{ padding: 0, margin: 0 }}
                  />
                  <Form.Check
                    readOnly
                    inline
                    className="ps-3"
                    label="Intellectual Disability"
                    type="checkbox"
                    checked={appData.tod2}
                    style={{ padding: 0, margin: 0 }}
                  />
                  <Form.Check
                    readOnly
                    inline
                    className="ps-3"
                    label="Learning Disability"
                    type="checkbox"
                    checked={appData.tod3}
                    style={{ padding: 0, margin: 0 }}
                  />
                  <Form.Check
                    readOnly
                    inline
                    className="ps-3"
                    label="Mental Disability"
                    type="checkbox"
                    checked={appData.tod4}
                    style={{ padding: 0, margin: 0 }}
                  />
                  <Form.Check
                    readOnly
                    inline
                    className="ps-3"
                    label="Physical Disability(Orthopedic)"
                    type="checkbox"
                    checked={appData.tod5}
                    style={{ padding: 0, margin: 0 }}
                  />
                </Col>
                <Col xs={6} className="ps-4">
                  <Form.Check
                    readOnly
                    inline
                    label="Psychosocial Disability"
                    type="checkbox"
                    checked={appData.tod6}
                    style={{ padding: 0, margin: 0 }}
                  />
                  <Form.Check
                    readOnly
                    inline
                    label="Speech and Language Impairment"
                    type="checkbox"
                    checked={appData.tod7}
                    style={{ padding: 0, margin: 0 }}
                  />
                  <Form.Check
                    readOnly
                    inline
                    label="Visual Disability"
                    type="checkbox"
                    checked={appData.tod8}
                    style={{ padding: 0, margin: 0 }}
                  />
                  <Form.Check
                    readOnly
                    label="Cancer(RA11215)"
                    type="checkbox"
                    checked={appData.tod9}
                    style={{ padding: 0, margin: 0 }}
                  />
                  <Form.Check
                    readOnly
                    label="Rare Disease(RA10747)"
                    type="checkbox"
                    checked={appData.tod10}
                    style={{ padding: 0, margin: 0 }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={6}>
              9. <strong>CAUSE OF DISABILITY:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              <Row>
                <Col xs={6}>
                  <Form.Check
                    readOnly
                    className="ps-3"
                    label="Congenital / Inborn"
                    type="checkbox"
                    checked={appData.congenital}
                    style={{ padding: 0, margin: 0, fontWeight: "600" }}
                  />
                  <div className="ms-2">
                    <Form.Check
                      readOnly
                      className="ps-3"
                      label="ADHD"
                      type="checkbox"
                      checked={!appData.congenital ? false : appData.conge1}
                      style={{ padding: 0, margin: 0 }}
                    />
                    <Form.Check
                      readOnly
                      className="ps-3"
                      label="Cerebral Palsy"
                      type="checkbox"
                      checked={!appData.congenital ? false : appData.conge2}
                      style={{ padding: 0, margin: 0 }}
                    />
                    <Form.Check
                      readOnly
                      className="ps-3"
                      label="Down Syndrome"
                      type="checkbox"
                      checked={!appData.congenital ? false : appData.conge3}
                      style={{ padding: 0, margin: 0 }}
                    />
                    <Form.Check
                      readOnly
                      inline
                      className="ps-3"
                      label="Others, Specify:"
                      type="checkbox"
                      checked={
                        !appData.congenital
                          ? false
                          : appData.congeothers === "" || !appData.congeothers
                          ? false
                          : true
                      }
                      style={{ padding: 0, margin: 0 }}
                    />{" "}
                    {!appData.congenital ? "" : appData.congeothers}
                  </div>
                </Col>
                <Col xs={6} className="ps-2">
                  <Form.Check
                    readOnly
                    className="ps-3"
                    label="Acquired"
                    type="checkbox"
                    checked={appData.acquiredC}
                    style={{ padding: 0, margin: 0, fontWeight: "600" }}
                  />
                  <div className="ms-2">
                    <Form.Check
                      readOnly
                      className="ps-3"
                      label="Chronic Illness"
                      type="checkbox"
                      checked={!appData.acquiredC ? false : appData.acqC1}
                      style={{ padding: 0, margin: 0 }}
                    />
                    <Form.Check
                      readOnly
                      className="ps-3"
                      label="Cerebral Palsy"
                      type="checkbox"
                      checked={!appData.acquiredC ? false : appData.acqC2}
                      style={{ padding: 0, margin: 0 }}
                    />
                    <Form.Check
                      readOnly
                      className="ps-3"
                      label="Injury"
                      type="checkbox"
                      checked={!appData.acquiredC ? false : appData.acqC3}
                      style={{ padding: 0, margin: 0 }}
                    />
                    <Form.Check
                      readOnly
                      inline
                      className="ps-3"
                      label="Others, Specify:"
                      type="checkbox"
                      checked={
                        !appData.acquiredC
                          ? false
                          : appData.acqCothers === "" || !appData.acqCothers
                          ? false
                          : true
                      }
                      style={{ padding: 0, margin: 0 }}
                    />{" "}
                    {!appData.acquiredC ? "" : appData.acqCothers}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={12}>
              10. <strong>RESIDENCE ADDRESS:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              <strong>House No. and Street:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              {appData.houseno}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              <strong>Barangay:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              {brgyList !== false
                ? brgyList.filter(
                    (brgy) => brgy.brgy_code === appData.barangay
                  )[0].brgy_name
                : ""}
            </Col>
            <Col xs={2} style={{ borderRight: "1px solid #000" }}>
              <strong>Municipality:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              San Rafael
            </Col>
            <Col xs={2} style={{ borderRight: "1px solid #000" }}>
              <strong>Province:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              Bulacan
            </Col>
            <Col xs={2}>
              <strong>Region:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              Region III
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={12}>
              11. <strong>CONTACT DETAILS:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={4} style={{ borderRight: "1px solid #000" }}>
              <strong>Landline No.:</strong> <br />
              {appData.landline_no}
            </Col>
            <Col xs={4} style={{ borderRight: "1px solid #000" }}>
              <strong>Mobile No.:</strong> <br />
              {appData.mobile_no}
            </Col>
            <Col xs={4}>
              <strong>E-mail Address:</strong> <br />
              {appData.email_address}
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={7} style={{ borderRight: "1px solid #000" }}>
              12. <strong>EDUCTIONAL ATTAINMENT:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <Row style={{ borderBottom: "1px solid #000" }}>
                <Col xs={12}>
                  <Row className="ms-1">
                    <Col xs={6}>
                      <Form.Check
                        readOnly
                        className="ps-3"
                        label="None"
                        type="radio"
                        checked={appData.educ_attain === "1" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                      <Form.Check
                        readOnly
                        className="ps-3"
                        label="Kindergarten"
                        type="radio"
                        checked={appData.educ_attain === "2" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                      <Form.Check
                        readOnly
                        className="ps-3"
                        label="Elementary"
                        type="radio"
                        checked={appData.educ_attain === "3" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                      <Form.Check
                        readOnly
                        className="ps-3"
                        label="Junior High School"
                        type="radio"
                        checked={appData.educ_attain === "4" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                    </Col>
                    <Col xs={6}>
                      <Form.Check
                        readOnly
                        className="ps-3"
                        label="Senior High School"
                        type="radio"
                        checked={appData.educ_attain === "5" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                      <Form.Check
                        readOnly
                        className="ps-3"
                        label="College"
                        type="radio"
                        checked={appData.educ_attain === "6" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                      <Form.Check
                        readOnly
                        className="ps-3"
                        label="Vocational"
                        type="radio"
                        checked={appData.educ_attain === "7" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                      <Form.Check
                        readOnly
                        className="ps-3"
                        label="Post Graduate"
                        type="radio"
                        checked={appData.educ_attain === "8" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Col xs={6}>
                      <Row
                        style={{
                          borderBottom: "1px solid #000",
                          borderRight: "1px solid #000",
                        }}
                      >
                        <Col xs={12}>
                          13. <strong>STATUS OF EMPLOYMENT:</strong>{" "}
                          <span style={{ fontWeight: "600", color: "red" }}>
                            *
                          </span>
                          <br />
                          <Form.Check
                            readOnly
                            className="ps-4"
                            label="Employed"
                            type="radio"
                            checked={appData.es === "1" ? true : false}
                            style={{ padding: 0, margin: 0 }}
                          />
                          <Form.Check
                            readOnly
                            className="ps-4"
                            label="Unemployed"
                            type="radio"
                            checked={appData.es === "2" ? true : false}
                            style={{ padding: 0, margin: 0 }}
                          />
                          <Form.Check
                            readOnly
                            className="ps-4"
                            label="Self-employed"
                            type="radio"
                            checked={appData.es === "3" ? true : false}
                            style={{ padding: 0, margin: 0 }}
                          />
                        </Col>
                      </Row>
                      <Row
                        style={{
                          borderRight: "1px solid #000",
                        }}
                        className="pb-3"
                      >
                        <Col xs={12}>
                          13 a. <strong>CATEGORY OF EMPLOYMENT:</strong>{" "}
                          <span style={{ fontWeight: "600", color: "red" }}>
                            *
                          </span>
                          <br />
                          <Form.Check
                            readOnly
                            className="ps-4"
                            label="Government"
                            type="radio"
                            checked={appData.t_of_emp === "2" ? true : false}
                            style={{ padding: 0, margin: 0 }}
                          />
                          <Form.Check
                            readOnly
                            className="ps-4"
                            label="Private"
                            type="radio"
                            checked={appData.t_of_emp === "1" ? true : false}
                            style={{ padding: 0, margin: 0 }}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={6}>
                      13 b. <strong>TYPES OF EMPLOYMENT:</strong>{" "}
                      <span style={{ fontWeight: "600", color: "red" }}>*</span>
                      <br />
                      <Form.Check
                        readOnly
                        className="ps-4"
                        label="Permanent / Regular"
                        type="radio"
                        checked={appData.t_of_emper === "1" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                      <Form.Check
                        readOnly
                        className="ps-4"
                        label="Seasonal"
                        type="radio"
                        checked={appData.t_of_emper === "6" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                      <Form.Check
                        readOnly
                        className="ps-4"
                        label="Casual"
                        type="radio"
                        checked={appData.t_of_emper === "4" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                      <Form.Check
                        readOnly
                        className="ps-4"
                        label="Emergency"
                        type="radio"
                        checked={appData.t_of_emper === "7" ? true : false}
                        style={{ padding: 0, margin: 0 }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs={5}>
              14. <strong>OCCUPATION:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <br />
              {occupation.map((d) => (
                <Form.Check
                  key={d.id}
                  readOnly
                  className="ps-4"
                  label={d.name}
                  type="radio"
                  checked={d.id === parseInt(appData.occu) ? true : false}
                  style={{ padding: 0, margin: 0 }}
                />
              ))}
              <Form.Check
                readOnly
                inline
                className="ps-4"
                label="Others, specify:"
                type="radio"
                checked={isInt(appData.occu) ? false : true}
                style={{ padding: 0, margin: 0 }}
              />{" "}
              {isInt(appData.occu) ? "_______" : appData.occu}
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={12}>
              15. <strong>ORGANIZATION INFORMATION:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              <strong>Organization Affiliated:</strong> <br />
              {appData.orgaff}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              <strong>Contact Person:</strong> <br />
              {appData.conper}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              <strong>Office Address:</strong> <br />
              {appData.offadd}
            </Col>
            <Col xs={3}>
              <strong>Tel Nos.:</strong> <br />
              {appData.telno}
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={12}>
              16. <strong>ID REFERENCE NO.:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col style={{ borderRight: "1px solid #000" }}>
              <strong>SSS NO.:</strong> <br />
              {appData.sss}
            </Col>
            <Col style={{ borderRight: "1px solid #000" }}>
              <strong>GSIS NO.:</strong> <br />
              {appData.gsis}
            </Col>
            <Col style={{ borderRight: "1px solid #000" }}>
              <strong>PAG-IBIG NO.:</strong> <br />
              {appData.pagibig}
            </Col>
            <Col style={{ borderRight: "1px solid #000" }}>
              <strong>PSN NO.:</strong> <br />
              {appData.psnno}
            </Col>
            <Col>
              <strong>PhilHealth NO.:</strong> <br />
              {appData.philhealth}
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              17. <strong>FAMILY BACKGROUND:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
            </Col>
            <Col
              xs={3}
              className="text-center"
              style={{ borderRight: "1px solid #000" }}
            >
              <strong>LAST NAME</strong>
            </Col>
            <Col
              xs={3}
              className="text-center"
              style={{ borderRight: "1px solid #000" }}
            >
              <strong>FIRST NAME</strong>
            </Col>
            <Col className="text-center" xs={3}>
              <strong>MIDDLE NAME</strong>
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col
              className="text-end"
              xs={3}
              style={{ borderRight: "1px solid #000" }}
            >
              FATHER'S NAME:
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.father_last_name}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.father_first_name}
            </Col>
            <Col xs={3}>{appData.father_middle_name}</Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col
              className="text-end"
              xs={3}
              style={{ borderRight: "1px solid #000" }}
            >
              MOTHER'S NAME:
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.mother_last_name}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.mother_first_name}
            </Col>
            <Col xs={3}>{appData.mother_middle_name}</Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col
              className="text-end"
              xs={3}
              style={{ borderRight: "1px solid #000" }}
            >
              GUARDIAN'S NAME:
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.guardian_last_name}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.guardian_first_name}
            </Col>
            <Col xs={3}>{appData.guardian_middle_name}</Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              18. <strong>ACCOMPLISHED BY:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
              <div className="ms-2">
                <Form.Check
                  readOnly
                  className="ps-4"
                  label="APPLICANT"
                  type="radio"
                  checked={appData.accomBy === "1" ? true : false}
                  style={{ padding: 0, marginBottom: "-8px" }}
                />
                <Form.Check
                  readOnly
                  className="ps-4"
                  label="GUARDIAN"
                  type="radio"
                  checked={appData.accomBy === "2" ? true : false}
                  style={{ padding: 0, marginBottom: "-8px" }}
                />
                <Form.Check
                  readOnly
                  className="ps-4"
                  label="REPRESENTATIVE"
                  type="radio"
                  checked={appData.accomBy === "3" ? true : false}
                  style={{ padding: 0, marginBottom: "0" }}
                />
              </div>
            </Col>
            <Col xs={9}>
              <Row style={{ borderBottom: "1px solid #000" }}>
                <Col
                  className="text-center"
                  style={{ borderRight: "1px solid #000" }}
                >
                  <strong>LAST NAME</strong>
                </Col>
                <Col
                  className="text-center"
                  style={{ borderRight: "1px solid #000" }}
                >
                  <strong>FIRST NAME</strong>
                </Col>
                <Col className="text-center">
                  <strong>MIDDLE NAME</strong>
                </Col>
              </Row>
              <Row style={{ borderBottom: "1px solid #000" }}>
                <Col style={{ borderRight: "1px solid #000" }}>
                  {appData.accomBy === "1" ? appData.accom_last_name : "-"}
                </Col>
                <Col style={{ borderRight: "1px solid #000" }}>
                  {appData.accomBy === "1" ? appData.accom_first_name : "-"}
                </Col>
                <Col>
                  {appData.accomBy === "1" ? appData.accom_middle_name : "-"}
                </Col>
              </Row>
              <Row style={{ borderBottom: "1px solid #000" }}>
                <Col style={{ borderRight: "1px solid #000" }}>
                  {appData.accomBy === "2" ? appData.accom_last_name : "-"}
                </Col>
                <Col style={{ borderRight: "1px solid #000" }}>
                  {appData.accomBy === "2" ? appData.accom_first_name : "-"}
                </Col>
                <Col>
                  {appData.accomBy === "2" ? appData.accom_middle_name : "-"}
                </Col>
              </Row>
              <Row>
                <Col style={{ borderRight: "1px solid #000" }}>
                  {appData.accomBy === "3" ? appData.accom_last_name : "-"}
                </Col>
                <Col style={{ borderRight: "1px solid #000" }}>
                  {appData.accomBy === "3" ? appData.accom_first_name : "-"}
                </Col>
                <Col>
                  {appData.accomBy === "3" ? appData.accom_middle_name : "-"}
                </Col>
              </Row>
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              19. <strong>NAME OF CERTIFYING PHYSICIAN:</strong>
              <div className="ms-4">LICENSE NO.:</div>
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.cert_ph_last_name}
              <br />
              <br />
              {appData.lic_no}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.cert_ph_first_name}
            </Col>
            <Col xs={3}>{appData.cert_ph_middle_name}</Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              20. <strong>PROCESSING OFFICER:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.proc_off_last_name === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.proc_off_last_name
              )}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.proc_off_first_name === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.proc_off_first_name
              )}
            </Col>
            <Col xs={3}>
              {appData.proc_off_middle_name === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.proc_off_middle_name
              )}
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              21. <strong>APPROVING OFFICER:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.appr_off_last_name === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.appr_off_last_name
              )}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.appr_off_first_name === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.appr_off_first_name
              )}
            </Col>
            <Col xs={3}>
              {appData.appr_off_middle_name === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.appr_off_middle_name
              )}
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              22. <strong>ENCODER:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.encoder_last_name === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.encoder_last_name
              )}
            </Col>
            <Col xs={3} style={{ borderRight: "1px solid #000" }}>
              {appData.encoder_first_name === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.encoder_first_name
              )}
            </Col>
            <Col xs={3}>
              {appData.encoder_middle_name === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.encoder_middle_name
              )}
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={12}>
              23. <strong>NAME OF REPORTING UNIT(OFFICE/SECTION):</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>{" "}
              {appData.reporting_unit === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.reporting_unit
              )}
            </Col>
          </Row>

          <Row
            style={{
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <Col xs={12}>
              24. <strong>CONTROL NO.:</strong>{" "}
              <span style={{ fontWeight: "600", color: "red" }}>*</span>{" "}
              {appData.control_no === "" ? (
                <span style={{ color: "red" }}>NOT YET SET!</span>
              ) : (
                appData.control_no
              )}
            </Col>
          </Row>
        </div>
      </div>
      {/* asdasd */}
      <Container fluid>
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

export default ApplicationFormPwd;
