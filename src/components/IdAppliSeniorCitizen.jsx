import React, { useState, useRef } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Spinner,
  Accordion,
  Card,
  Modal,
} from "react-bootstrap";

import { barangays } from "select-philippines-address";

import apifrm from "../api/apifrm";

const IdAppliSeniorCitizen = ({ submitApplication }) => {
  let [frmData, setFrmData] = useState({ appliType: 3, oscaId: 0 });
  let [pic, setPic] = useState(false);
  let [sig, setSig] = useState(false);
  let [docs, setDocs] = useState(false);
  let [affidavit, setAffidavit] = useState(false);

  let [agreeCheck, setAgreeCheck] = useState(true);
  let [isSubmit, setIsSubmit] = useState(false);
  let [brgyList, setBrgyList] = useState(false);

  let [fcHolder, setFcHolder] = useState({
    fc_name: "",
    fc_age: "",
    fc_address: "",
    fc_mi: "",
    fc_rel: "",
    fc_status: "",
    fc_educ_attain: "",
    fc_con_num: "",
    fc_work: "",
  });
  //let [famComp, setFamComp] = useState("");
  const famComRef = useRef("");

  let [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const fcOnChange = (e) =>
    setFcHolder({ ...fcHolder, [e.target.name]: e.target.value });

  const setFcField = () => {
    //setFamComp(famComp + fcHolder.fc_name + ',' + fcHolder.fc_rel + ',' + fcHolder.fc_age + ',' + fcHolder.fc_status + ',' + fcHolder.fc_bday + ',' + fcHolder.fc_mi + '\n');

    setFcHolder({
      fc_name: "",
      fc_age: "",
      fc_address: "",
      fc_mi: "",
      fc_rel: "",
      fc_status: "",
      fc_educ_attain: "",
      fc_con_num: "",
      fc_work: "",
    });

    if (famComRef.current.value.trim() === "") {
      famComRef.current.value +=
        fcHolder.fc_name +
        "," +
        fcHolder.fc_age +
        "," +
        fcHolder.fc_rel +
        "," +
        fcHolder.fc_status +
        "," +
        fcHolder.fc_address +
        "," +
        fcHolder.fc_con_num +
        "," +
        fcHolder.fc_educ_attain +
        "," +
        fcHolder.fc_work +
        "," +
        fcHolder.fc_mi;
    } else {
      famComRef.current.value +=
        "\n" +
        fcHolder.fc_name +
        "," +
        fcHolder.fc_age +
        "," +
        fcHolder.fc_rel +
        "," +
        fcHolder.fc_status +
        "," +
        fcHolder.fc_address +
        "," +
        fcHolder.fc_con_num +
        "," +
        fcHolder.fc_educ_attain +
        "," +
        fcHolder.fc_work +
        "," +
        fcHolder.fc_mi;
    }

    setFrmData({ ...frmData, fam_composition: famComRef.current.value });
  };

  const educ_attain = [
    { id: 1, name: "Elementary" },
    { id: 2, name: "High School" },
    { id: 3, name: "College" },
    { id: 4, name: "Post Graduate" },
    { id: 5, name: "PhD" },
  ];

  const getAge = (dob) => {
    const getDob = new Date(dob);
    const monthDiff = Date.now() - getDob.getTime();
    const ageDt = new Date(monthDiff);
    const getYear = ageDt.getUTCFullYear();

    return Math.abs(getYear - 1970);
  };

  const forDobAndAge = (e) => {
    setFrmData({
      ...frmData,
      [e.target.name]: e.target.value,
      age: getAge(e.target.value),
    });
  };

  const submitForm = async (e) => {
    setIsSubmit(true);
    e.preventDefault();
    if (frmData.age) {
      if (frmData.age < 60) {
        window.alert("Only 60 years old and above allowed!");
      }
    }
    //
    try {
      let formData = new FormData();
      formData.append("application_data", JSON.stringify(frmData));
      formData.append("application_pic", pic[0]);
      formData.append("application_sig", sig[0]);
      formData.append("docs[0]", docs[0]);
      if (affidavit !== false) {
        formData.append("docs[1]", affidavit[0]);
      }

      await apifrm
        .post("application/post", formData)
        .then((res) => {
          submitApplication(res.data.application_id, "");
          setIsSubmit(false);
        })
        .catch((err) => {
          submitApplication("failed", err.response.data.message);
          setIsSubmit(false);
        });
      setIsSubmit(false);
    } catch (error) {
      submitApplication("failed", error);
      setIsSubmit(false);
    }
  };

  const docsOnChange = (e) => {
    setDocs(e.target.files);
  };

  const textOnChange = (e) => {
    setFrmData({ ...frmData, [e.target.name]: e.target.value });
  };

  const picOnChange = (e) => {
    setPic(e.target.files);
  };

  const sigOnChange = (e) => {
    setSig(e.target.files);
  };

  React.useEffect(() => {
    let isMounted = true;

    barangays("031422").then((barangays) => {
      if (isMounted) {
        setBrgyList(barangays);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h2 className="text-uppercase mb-3">
        Application for Identification Card of Senior Citizen
      </h2>

      <Card className="mb-5">
        <Card.Header>
          <strong>
            Please read all of the requirements prior to your application{" "}
            <em>(Basahing mabuti bago mag fill-up ng application form)</em>
          </strong>
        </Card.Header>
        <Card.Body className="mb-3 p-3">
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Who is considered under the law as a “Senior Citizen”?{" "}
                <em>
                  (Sino ang itinuturing sa ilalim ng batas bilang “Senior
                  Citizen”?)
                </em>
              </Accordion.Header>
              <Accordion.Body>
                Senior Citizen shall mean any resident citizen of the
                Philippines and at least 60 years of age and above{" "}
                <em>
                  (Ang Senior Citizen ay nangangahulugang sinumang residenteng
                  mamamayan ng Pilipinas at hindi bababa sa 60 taong gulang
                  pataas)
                </em>
                <ol>
                  <li>
                    The grant of 20% discount from all the establishments
                    relative to the utilization of services in hotels,
                    restaurants and recreation centers and purchase of medicines
                    in all establishments for the exclusive use or enjoyment of
                    Senior Citizens, including funeral and burials services for
                    the death of Senior Citizens.{" "}
                    <em>
                      (- Ang pagbibigay ng 20% na diskwento mula sa lahat ng mga
                      establisyimento na may kaugnayan sa paggamit ng mga
                      serbisyo sa mga hotel, restaurant at recreation center at
                      pagbili ng mga gamot sa lahat ng mga establisyimento para
                      sa eksklusibong paggamit o kasiyahan ng mga Senior
                      Citizen, kabilang ang mga serbisyo sa libing at libing
                      para sa pagkamatay ng Matatanda.)
                    </em>
                  </li>
                </ol>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                How can I use the MSWD E-Services in securing Senior Citizen
                I.D.?{" "}
                <em>
                  (Paano ko gagamitin ang DSWD E-Services sa pagkuha ng Senior
                  Citizen ID?)
                </em>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <strong>Step 1: </strong>Review the documents required before
                  proceeding.{" "}
                  <em>
                    (Suriing mabuti ang mga dokumentong kinakailangan bago
                    magpatuloy.)
                  </em>
                </p>
                <p>
                  <strong>Step 2: </strong>Fill up all required fields in the
                  Senior Citizen I.D. application form.{" "}
                  <em>
                    (Sagutan ang lahat ng kailangan sa Senior Citizen I.D.
                    application form.)
                  </em>
                </p>
                <p>
                  <strong>Step 3: </strong>Upload scanned copies of required
                  documents.{" "}
                  <em>
                    (Mag-upload ng mga na-scan na kopya ng mga kinakailangang
                    dokumento.)
                  </em>
                </p>
                <p>
                  <strong>Step 4: </strong>Check submitted application.{" "}
                  <em>(Suriin ang pinunang aplikasyon.)</em>
                </p>
                <p>
                  <strong>Step 5: </strong>Applicant will receive notification
                  of the successful application of Senior Citizen I.D. via
                  email.{" "}
                  <em>
                    (Makakatanggap ng email ang aplikante na matagumpay na
                    aplikayson para sa Senior Citizen I.D.)
                  </em>
                </p>
                <p>
                  <strong>Step 6: </strong>MSWD Staff will assess the submitted
                  online application.{" "}
                  <em>(Susuriin ng MSWD Staff ang naisumiteng aplikasyon.)</em>
                </p>
                <p>
                  <strong>Step 7: </strong>Applicant will be able to track their
                  transaction by clicking the “Track my application” tab in
                  their dashboard.{" "}
                  <em>
                    (Magagawang subaybayan ng aplikante ang kanilang transaksyon
                    sa pamamagitan ng pag-click sa tab na "Track my application"
                    sa kanilang dashboard.)
                  </em>
                </p>
                <p>
                  <strong>Step 8: </strong>Applicant will receive notification
                  if his/her Senior Citizen I.D. are ready to release.{" "}
                  <em>
                    (Makakatanggap ang aplikante ng abiso kung ang kanyang
                    Senior Citizen I.D. ay handa at maari ng kuhain.)
                  </em>
                </p>
                <p>
                  <strong>Step 9: </strong>Applicant will proceed to MSWD office
                  in San Rafael Bulacan to claim his/her Senior Citizen I.D.
                  after they receive notification.{" "}
                  <em>
                    (Magpunta sa MSWD Office of San Rafael Bulacan para kunin
                    ang Senior Citizen I.D. pagkatapos matanggap ang abiso.)
                  </em>
                </p>
                <p
                  className="text-center"
                  style={{ textTransform: "uppercase" }}
                >
                  *** End of transaction ***
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                What is the Schedule of Availability of Service?{" "}
                <em>(Ano ang iskedyul ng serbisyo?) </em>
              </Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>
                    The online application for Senior Citizen I.D. is only
                    available for residents of San Rafael Bulacan{" "}
                    <em>
                      (Ang online na aplikasyon para sa Senior Citizen I.D. ay
                      magagamit lamang para sa mga residente ng San Rafael
                      Bulacan.)
                    </em>
                  </li>
                  <li>
                    Your application will only be processed during office hours,
                    Monday to Friday, 8:00am – 5:00pm without noon break.{" "}
                    <em>
                      (Ang inyong aplikasyon ay ipoproseso lamang mula Lunes
                      hanggang Biyernes, 8:00 ng umaga – 5:00 ng hapon.)
                    </em>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                How much is the processing fee in securing Senior Citizen I.D.?{" "}
                <em>
                  (Magkano ang bayad sa pagpoproseso ng Senior Citizen I.D.?)
                </em>
              </Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>NONE REQUIRED FEES</li>
                </ul>
                <p>
                  The MSWD shall not collect any processing fee for securing
                  Senior Citizen I.D.{" "}
                  <em>
                    (Ang MSWD ay hindi mangongolekta ng anumang bayad sa
                    pagproseso para sa pagkuha ng Senior Citizen I.D.)
                  </em>
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                What do I need before I apply?{" "}
                <em>(Ano ang mga kailangan ko bago ako mag-apply?)</em>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  The requirements needed to obtain Senior Citizen I.D.{" "}
                  <em>
                    (Ang mga kinakailangan upang makakuha ng Senior Citizen
                    I.D.)
                  </em>
                </p>
                <ul>
                  <li>
                    Photocopy - Valid ID with birthday and address in San Rafael
                    (Voters, SSS/UMID, LTO, Passport){" "}
                    <em>
                      (Photocopy - Valid ID na may kaarawan at address sa San
                      Rafael (Mga Botante, SSS/UMID, LTO, Pasaporte)
                    </em>
                  </li>
                  <li>
                    2pcs latest 1x1 colored ID picture in white background{" "}
                    <em>
                      (2pcs pinakabagong 1x1 colored ID picture na nakaputing
                      background)
                    </em>
                  </li>
                  <li>
                    Affidavit of loss (if lost ID){" "}
                    <em>(Affidavit of loss (kung nawala ang ID))</em>
                  </li>
                  <li>
                    If no valid id available{" "}
                    <em>(Kung walang available na valid ID)</em>
                    <ul>
                      <li>
                        birth certificate <em>(sertipiko ng kapanganakan)</em>
                      </li>
                      <li>
                        certificate of residency{" "}
                        <em>(sertipiko ng paninirahan)</em>
                      </li>
                    </ul>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>

      <Form onSubmit={submitForm}>
        <Row>
          <Col className="mb-3" md={12}>
            <Form.Label>Type:</Form.Label>{" "}
            <Form.Check
              inline
              label="New"
              name="group1"
              type="radio"
              id="inline-radio-1"
              onClick={() => setFrmData({ ...frmData, appli_type: "new" })}
            />
            <Form.Check
              inline
              label="Loss"
              name="group1"
              type="radio"
              id="inline-radio-2"
              onClick={() => setFrmData({ ...frmData, appli_type: "loss" })}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Label>
              Name of Senior Citizen (Pangalan ng Senior Citizen)
            </Form.Label>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Last Name (Apelyido)</Form.Label>
              <Form.Control
                required
                type="text"
                name="last_name"
                id="last_name"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>First Name (Pangalan)</Form.Label>
              <Form.Control
                required
                type="text"
                name="first_name"
                id="first_name"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Middle Name (Gitnang Pangalan)</Form.Label>
              <Form.Control
                required
                type="text"
                name="middle_name"
                id="middle_name"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Row className="mb-3">
                <Col md={3}>
                  <Form.Label>House No.</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="houseno"
                    id="houseno"
                    placeholder="House No."
                    onChange={textOnChange}
                  />
                </Col>
                <Col md={3}>
                  <Form.Label>Street or Sitio</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="street"
                    id="street"
                    placeholder="Street or Sitio"
                    onChange={textOnChange}
                  />
                </Col>
                <Col md={3}>
                  <Form.Label>Barangay</Form.Label>
                  <Form.Select
                    required
                    id="barangay"
                    name="barangay"
                    onChange={textOnChange}
                  >
                    <option>Select</option>
                    {brgyList !== false
                      ? brgyList.map((d) => (
                          <option key={d.brgy_code} value={d.brgy_code}>
                            {d.brgy_name}
                          </option>
                        ))
                      : ""}
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Label>City and Province</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value="San Rafael, Bulacan"
                    readOnly
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Living Arrangements</Form.Label>
              <Form.Select
                required
                name="living_arr"
                id="living_arr"
                onChange={textOnChange}
              >
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
              <Form.Label>Years (Taon)</Form.Label>
              <Form.Control
                required
                type="text"
                name="years"
                id="years"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Sex (Kasarian)</Form.Label>
              <Form.Select required name="sex" id="sex" onChange={textOnChange}>
                <option>Select</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Age (Edad)</Form.Label>
              <Form.Control
                required
                readOnly
                type="number"
                name="age"
                id="age"
                min="60"
                value={getAge(frmData.dob)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Status (Katayuan)</Form.Label>
              <Form.Select
                required
                name="status"
                id="status"
                onChange={textOnChange}
              >
                <option>Select</option>
                <option value={1}>Single</option>
                <option value={2}>Married</option>
                <option value={3}>Widowed</option>
                <option value={4}>Separated</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth (Kaarawan)</Form.Label>
              <Form.Control
                required
                type="date"
                name="dob"
                id="dob"
                onChange={forDobAndAge}
              />
            </Form.Group>
          </Col>
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label>Place of Birth (Lugar ng pinagpaanakan)</Form.Label>
              <Form.Control
                required
                type="text"
                name="pob"
                id="pob"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Highest Educational Attainment (Pinakamataas na tinapos sa
                edukasyon)
              </Form.Label>
              {/* <Form.Control required type="text" name="hea" id="hea" onChange={textOnChange} /> */}
              <Form.Select
                required
                name="educ_attain"
                id="educ_attain"
                onChange={textOnChange}
              >
                <option>Select</option>
                {educ_attain.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Profession (Propesyon)</Form.Label>
              <Form.Control
                required
                type="text"
                name="profession"
                id="profession"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Course (Kurso)</Form.Label>
              <Form.Control
                required
                type="text"
                name="course"
                id="course"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Skills (Mga kasanayan)</Form.Label>
              <Form.Control
                required
                type="text"
                name="skills"
                id="skills"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Pensioner (Pensiyon)</Form.Label>
              <Form.Select
                required
                type="text"
                name="pensioner"
                id="pensioner"
                onChange={textOnChange}
              >
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
              <Form.Label>Occupation (Trabaho)</Form.Label>
              <Form.Control
                required
                type="text"
                name="work"
                id="work"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Religion (Relihiyon)</Form.Label>
              <Form.Control
                required
                type="text"
                name="religion"
                id="religion"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Ethnicity (Etniko)</Form.Label>
              <Form.Control
                required
                type="text"
                name="ethnicity"
                id="ethnicity"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Organization (Organisasiyon)</Form.Label>
              <Form.Control
                required
                type="text"
                name="organization"
                id="organization"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>
                Health/Physical Condition (Pisikal na kalagayan)
              </Form.Label>
              <Form.Control
                required
                type="text"
                name="hpcon"
                id="hpcon"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Contact No. Mobile (Numerong tatawagan)</Form.Label>
              <Form.Control
                required
                type="text"
                name="mobileno"
                id="mobileno"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Landline</Form.Label>
              <Form.Control
                required
                type="text"
                name="landline"
                id="landline"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type="text"
                name="email_address"
                id="email_address"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>ID Shown (Uri ng ID)</Form.Label>
              <Form.Control
                required
                type="text"
                name="id_shown"
                id="id_shown"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Issued By (Ibinigay ni/ng)</Form.Label>
              <Form.Control
                required
                type="text"
                name="issued_by"
                id="issued_by"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Photo (Litrato)</Form.Label>
              <Form.Select
                required
                type="text"
                name="photo"
                id="photo"
                onChange={textOnChange}
              >
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
              <Form.Label>Issued On (Ibinigay sa)</Form.Label>
              <Form.Control
                required
                type="text"
                name="issued_on"
                id="issued_on"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
          <Col md={7}>
            <Form.Group className="mb-3">
              <Form.Label>Place of Issue (Lugar ng pinagbigyan)</Form.Label>
              <Form.Control
                required
                type="text"
                name="place_of_issue"
                id="place_of_issue"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Contact Person (Taong ugnayan)</Form.Label>
              <Form.Control
                required
                type="text"
                name="contact_person"
                id="contact_person"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Relationship (Relasypn sa taong ugnayan)</Form.Label>
              <Form.Control
                required
                type="text"
                name="relationship"
                id="relationship"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                name="con_address"
                id="con_address"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Contact No. (Numerong tatawagan)</Form.Label>
              <Form.Control
                required
                type="text"
                name="con_con_no"
                id="con_con_no"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-1">
              <Form.Label>Family Composition/Household Members</Form.Label>
              <div>
                <small>
                  Use form below to add each family members.{" "}
                  <strong>Please don't use commas!</strong>
                </small>
              </div>
              <Row className="mb-3">
                <Col lg={3} className="mb-sm-1">
                  <Form.Control
                    type="text"
                    value={fcHolder.fc_name}
                    name="fc_name"
                    id="fc_name"
                    placeholder="Full Name"
                    onChange={fcOnChange}
                  />
                </Col>
                <Col lg={1} className="mb-sm-1">
                  <Form.Control
                    type="text"
                    value={fcHolder.fc_age}
                    name="fc_age"
                    id="fc_age"
                    placeholder="Age"
                    onChange={fcOnChange}
                  />
                </Col>
                <Col lg={2} className="mb-sm-1">
                  <Form.Control
                    type="text"
                    value={fcHolder.fc_rel}
                    name="fc_rel"
                    id="fc_rel"
                    placeholder="Relationship"
                    onChange={fcOnChange}
                  />
                </Col>
                <Col lg={2} className="mb-sm-1">
                  <Form.Select
                    name="fc_status"
                    id="fc_status"
                    value={fcHolder.fc_status}
                    onChange={fcOnChange}
                  >
                    <option value="">Select</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Separated">Separated</option>
                    <option value="Widowed">Widowed</option>
                  </Form.Select>
                </Col>
                <Col lg={4} className="mb-sm-1">
                  <Form.Control
                    type="text"
                    value={fcHolder.fc_address}
                    name="fc_address"
                    id="fc_address"
                    placeholder="Address"
                    onChange={fcOnChange}
                  />
                </Col>
                <Col lg={3} className="mb-sm-1">
                  <Form.Control
                    type="text"
                    value={fcHolder.fc_con_num}
                    name="fc_con_num"
                    id="fc_con_num"
                    placeholder="Contact Number"
                    onChange={fcOnChange}
                  />
                </Col>
                <Col lg={3} className="mb-sm-1">
                  <Form.Control
                    type="text"
                    value={fcHolder.fc_educ_attain}
                    name="fc_educ_attain"
                    id="fc_educ_attain"
                    placeholder="Educational Attainment"
                    onChange={fcOnChange}
                  />
                </Col>
                <Col lg={3} className="mb-sm-1">
                  <Form.Control
                    type="text"
                    value={fcHolder.fc_work}
                    name="fc_work"
                    id="fc_work"
                    placeholder="Work"
                    onChange={fcOnChange}
                  />
                </Col>
                <Col lg={2} className="mb-sm-1">
                  <Form.Control
                    type="text"
                    value={fcHolder.fc_mi}
                    name="fc_mi"
                    id="fc_mi"
                    placeholder="Monthly Income"
                    onChange={fcOnChange}
                  />
                </Col>
                <Col lg={1}>
                  <Button onClick={setFcField}>+ Add</Button>
                </Col>
              </Row>
              <Form.Control
                required
                placeholder="Example: Juan de la Cruz, 24, Grand son, Single, Example St. San Rafael Bulacan, 09111111111, Bachelor's Degree, Clerk, 12000"
                as="textarea"
                name="fam_composition"
                id="fam_composition"
                onChange={textOnChange}
                ref={famComRef}
                rows={3}
              ></Form.Control>
            </Form.Group>
            <Button
              style={{ float: "right" }}
              size="sm"
              onClick={() => (famComRef.current.value = "")}
            >
              Clear Family Composition
            </Button>
            <p>Include family members and other members of the household.</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Picture in white background (1x1) PNG ONLY
              </Form.Label>
              <Form.Control
                required
                type="file"
                name="picture1x1"
                id="picture1x1"
                accept="image/png"
                onChange={picOnChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Signature (Use Pentel Pen) (Lagda (Gumamit ng Pentel Pen)) PNG
                ONLY
              </Form.Label>
              <Form.Control
                required
                type="file"
                name="signature"
                id="signature"
                accept="image/png"
                onChange={sigOnChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>
              Valid ID with birthday and address in San Rafael (Voter's,
              SSS/UMID, LTO, Passport), or if no valid ID available: Birth
              certificate or certificate of residency. PDF Only
            </Form.Label>

            <Form.Control
              required
              type="file"
              name="docs"
              id="docs"
              accept="application/pdf"
              onChange={docsOnChange}
            />
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label
                style={{
                  display:
                    frmData.appli_type !== "loss" ||
                    frmData.appli_type === undefined ||
                    frmData.appli_type === ""
                      ? "none"
                      : "",
                }}
              >
                Affidavit of loss (if lost ID) (Affidavit of loss (Kung nawala
                and ID))
              </Form.Label>
              <Form.Control
                type="file"
                name="aff"
                id="aff"
                accept="application/pdf"
                style={{
                  display: frmData.appli_type !== "loss" ? "none" : "",
                }}
                onChange={(e) => setAffidavit(e.target.files)}
                multiple
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Row>
                <Col md={1} className="text-end">
                  <Form.Check
                    aria-label="agreement"
                    onChange={() => setAgreeCheck(!agreeCheck)}
                  />
                </Col>
                <Col md={11}>
                  <Form.Label>
                    I hereby certify that the information given above are true
                    and correct. I further understand that any misinterpretation
                    that may have made will subject me to criminal and civil
                    liabilities provided for by existing laws; (Pinatototohanan
                    ko na ang impormasyong ibinigay sa itaas ay totoo at tama.
                    Nauunawaan ko pa na anumang maling kahulugan na maaaring
                    nagpasailalim sa akin sa mga kriminal at pananagutan sa
                    sibil na inilaan para sa umiiral na mga batas;)
                  </Form.Label>
                  <Form.Label
                    onClick={handleOpen}
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    I accept the Terms and Conditions
                  </Form.Label>
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {isSubmit ? (
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Submitting...
              </Button>
            ) : (
              <Button
                className="mb-3"
                variant="primary"
                type="submit"
                disabled={agreeCheck}
              >
                Submit Application
              </Button>
            )}
          </Col>
        </Row>
      </Form>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>Terms and Conditions</Modal.Header>
        <Modal.Body>
          <h4>eServices Privacy Notice and User Agreement</h4>
          <p>
            This privacy notice discloses the privacy practices for MSWDO San
            Rafael, Bulacan Website. This privacy notice applies solely to
            information collected by this website.
          </p>
          <h4>Registration</h4>
          <p>
            In order to use this website, a user must first complete the
            registration form. During registration a user is required to give
            certain information (such as name and email address). This
            information is used to contact you about the service status and
            account matters on our site in which you have expressed interest. By
            signing up you agree to:
          </p>
          <ol>
            <li>
              Provide true and complete information as prompted by the
              eServices' forms;
            </li>
            <li>
              Not to disclose or sharing your password to any third parties;
            </li>
            <li>
              You are responsible for maintaining the confidentiality of the
              password and account, and are fully responsible for all activities
              that occur under your password or account;
            </li>
          </ol>
          <h4>Coverage of Service</h4>
          <p>
            The MSWDO San Rafael, Bulacan eServices covers the online and mobile
            applications, processing and approvals of the following frontline
            services: Travel Clearance for Minors Travelling Abroad (MTA) and
            Registration, Licensing and Accreditation (RLA) of Social Welfare
            and Development Agencies and Service Providers.
          </p>
          <h4>Information Collection, Use, and Sharing</h4>
          <p>
            We are the sole owners of the information collected on this site. We
            only have access to/collect information that you voluntarily give us
            via the modules of this website or other direct contact from you. We
            will not sell or rent this information to anyone. All of the
            provisions in the Data Privacy Act will be observed specifically on
            the management of personal identifiable information.
          </p>
          <p>
            We will use your information to respond to you, regarding the
            services that you require. We will not share your information with
            any third party outside of our organization, other than as necessary
            to fulfill your requested services. The DSWD however reserves the
            right to request the applicants to submit the hardcopy of
            documentary requirements in order to verify the authenticity of the
            information;
          </p>
          <p>
            Unless you ask us not to, we may contact you via email or SMS in the
            future to tell you about the status of your transaction/service
            request or changes to this privacy policy.
          </p>
          <h4>Security</h4>
          <p>
            We take precautions to protect your information. When you submit
            sensitive information via the website, your information is protected
            both online and offline. Wherever we collect sensitive information
            (such as passport and Birth Certificates), that information is
            encrypted and transmitted to us in a secure way. You can verify this
            by looking for a lock icon in the address bar and looking for
            "https" at the beginning of the address of the Web page.
          </p>
          <p>
            While we use encryption to protect sensitive information transmitted
            online, we also protect your information offline. Only employees who
            need the information to perform a specific job (for example,
            certificate printing or customer service) are granted access to
            personally identifiable information. The computers/servers in which
            we store personally identifiable information are kept in a secure
            environment.
          </p>
          <p>
            <strong>
              If you feel that we are not abiding by this privacy policy, you
              should contact us immediately via mobile phone at (+63)
              922-564-5695 or via mswdosanrafaelbulacan@gmail.com.
            </strong>
          </p>
          <p>
            <strong>
              <em>
                DSWD Reserves the right to remove accounts that are deemed
                intrusive to the e-Services application
              </em>
            </strong>
          </p>
          <h4>
            "I HEREBY AGREE TO BE GOVERNED BY THE TERMS AND CONDITIONS OF THE
            DSWD ESERVICES PRIVACY NOTICE AND USER AGREEMENT. I HEREBY ALSO
            ACKNOWLEDGE TO HAVE READ AND FULLY UNDERSTOOD THE SAID TERMS AND
            CONDITIONS."
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IdAppliSeniorCitizen;
