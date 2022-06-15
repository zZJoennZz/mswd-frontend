import React, { useState } from "react";
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

import apifrm from "../api/apifrm";

import { barangays } from "select-philippines-address";

import "./adminsoloparentprint.css";

const IdAppliPwd = ({ submitApplication }) => {
  let [frmData, setFrmData] = useState({
    appliType: 2,
    cod: "",
    suffix: "",
    congenital: false,
    acquiredC: false,
    conge1: false,
    conge2: false,
    conge3: false,
    tod1: false,
    tod2: false,
    tod3: false,
    tod4: false,
    tod5: false,
    tod6: false,
    tod7: false,
    tod8: false,
    tod9: false,
    tod10: false,
    acqC1: false,
    acqC2: false,
    acqC3: false,
    pdnum: "",
    proc_off_last_name: "",
    proc_off_first_name: "",
    proc_off_middle_name: "",
    appr_off_last_name: "",
    appr_off_first_name: "",
    appr_off_middle_name: "",
    encoder_last_name: "",
    encoder_first_name: "",
    encoder_middle_name: "",
    reporting_unit: "",
    control_no: "",
  });
  let [pic, setPic] = useState(false);
  let [sig, setSig] = useState(false);
  let [docs, setDocs] = useState(false);
  let [agreeCheck, setAgreeCheck] = useState(true);
  let [isSubmit, setIsSubmit] = useState(false);
  let [brgyList, setBrgyList] = useState(false);

  let [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  let disabilities = [
    { id: 1, name: "Deaf or Hard of Hearing (Bingi o Hirap sa Pandinig)" },
    {
      id: 2,
      name: "Intellectual Disability (Kapansanan sa intelektwal at pag-unlad)",
    },
    { id: 3, name: "Learning Disability (Kapansanan sa Pagkatuto)" },
    { id: 4, name: "Mental Disability (Mental na kapansanan)" },
    {
      id: 5,
      name: "Physical Disability (Orthopedic) (Pisikal na Kapansanan (Orthopedic))",
    },
    { id: 6, name: "Psychosocial Disability (Sikolohikal na Kapansanan)" },
    {
      id: 7,
      name: "Speech and Language Impairment (Kawalan ng kakayahang magsalita at makarinig)",
    },
    { id: 8, name: "Visual Disability (Biswal na Kapansanan)" },
    { id: 9, name: "Cancer(RA11215) (Kanser)" },
    { id: 10, name: "Rare Disease(RA10747) (Bihirang Sakit)" },
  ];

  let congenital = [
    {
      id: 1,
      name: "ADHD",
    },
    {
      id: 2,
      name: "Cerebral Palsy",
    },
    {
      id: 3,
      name: "Down Syndrome",
    },
  ];

  let acquiredC = [
    {
      id: 1,
      name: "Chronic Illness",
    },
    {
      id: 2,
      name: "Cebebral Palsy",
    },
    {
      id: 3,
      name: "Injury",
    },
  ];

  let educ_attain = [
    {
      id: 1,
      name: "None (Wala)",
    },
    {
      id: 2,
      name: "Kindergarten",
    },
    {
      id: 3,
      name: "Elementary (Elementarya)",
    },
    {
      id: 4,
      name: "Junior High School",
    },
    {
      id: 5,
      name: "Senior High School",
    },
    {
      id: 6,
      name: "College (Kolehiyo)",
    },
    {
      id: 7,
      name: "Vocational (Bokasyonal)",
    },
    {
      id: 8,
      name: "Post Graduate",
    },
  ];

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

  const submitForm = async (e) => {
    setIsSubmit(true);
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("application_data", JSON.stringify(frmData));
      formData.append("application_pic", pic[0]);
      formData.append("application_sig", sig[0]);
      for (let i = 0; i < docs.length; i++) {
        formData.append(`docs[${i}]`, docs[i]);
      }

      await apifrm
        .post("application/post", formData)
        .then((res) => {
          submitApplication(res.data.application_id);
          setIsSubmit(false);
        })
        .catch((err) => {
          submitApplication("failed");
          alert(err.response.data.message);
          setIsSubmit(false);
        });
    } catch (error) {
      submitApplication("failed");
      alert(
        "Something went wrong and your application isn't submitted. You might still have an existing application, if not, contact us."
      );
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

  const dateToday = () => {
    let currTime = new Date();
    return (
      currTime.getMonth() +
      1 +
      "/" +
      currTime.getDate() +
      "/" +
      currTime.getFullYear()
    );
  };

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

  return (
    <div>
      <h2 className="text-uppercase mb-3">
        Application for Identification Card of Persons with Disability
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
                Who is considered under the law as a “PWD or Person with
                Disabilities"?{" "}
                <em>
                  (Sino ang itinuturing sa ilalim ng batas bilang "PWD or Person
                  with Disabilities"?)
                </em>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Persons with Disabilities are those suffering from restriction
                  of different abilities, as a result of a mental, physical or
                  sensory impairment, to perform an activity in the manner or
                  within the range considered normal for a human being{" "}
                  <em>
                    (Ang mga taong may Kapansanan ay ang mga dumaranas ng
                    paghihigpit sa iba't ibang kakayahan, bilang resulta ng
                    kapansanan sa pag-iisip, pisikal o pandama, upang magsagawa
                    ng aktibidad sa paraang o sa loob ng saklaw na itinuturing
                    na normal para sa isang tao.)
                  </em>
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                How can I use the MSWD E-Services in securing PWD I.D. or Person
                with Disabilities I.D.?{" "}
                <em>
                  (Paano ko gagamitin ang DSWD E-Services sa pagkuha ng PWD I.D.
                  o Person with Disabilities I.D.?)
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
                  Person with Disabilities I.D. application form.{" "}
                  <em>
                    (Sagutan ang lahat ng kailangan sa Person with Disabilities
                    I.D. application form.)
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
                  of the successful application Person with Disabilities I.D.
                  via email.{" "}
                  <em>
                    (Makakatanggap ng email ang aplikante na matagumpay na
                    aplikayson para sa Person with Disabilities I.D.)
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
                  if his/her Person with Disabilities I.D. are ready to release.{" "}
                  <em>
                    (Makakatanggap ang aplikante ng abiso kung ang kanyang
                    Person with Disabilities I.D. ay handa at maari ng kuhain.)
                  </em>
                </p>

                <p>
                  <strong>Step 9: </strong>Applicant will proceed to MSWD office
                  in San Rafael Bulacan to claim his/ Person with Disabilities
                  I.D. after they receive notification.{" "}
                  <em>
                    (Magpunta sa MSWD Office of San Rafael Bulacan para kunin
                    ang Person with Disabilities I.D. pagkatapos matanggap ang
                    abiso.)
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
                    The online application for Person with Disabilities I.D. is
                    only available for residents of San Rafael Bulacan{" "}
                    <em>
                      (Ang online na aplikasyon para sa Person with Disabilities
                      I.D. ay magagamit lamang para sa mga residente ng San
                      Rafael Bulacan.)
                    </em>
                  </li>
                  <li>
                    Your application will only be processed during office hours,
                    Monday to Friday, 8:00am - 5:00pm without noon break.{" "}
                    <em>
                      (Ang inyong aplikasyon ay ipoproseso lamang mula Lunes
                      hanggang Biyernes, 8:00 ng umaga - 5:00 ng hapon.)
                    </em>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                How much is the processing fee in securing Solo Parent I.D.?{" "}
                <em>
                  (Magkano ang bayad sa pagpoproseso ng Solo Parent I.D.?)
                </em>
              </Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>NONE REQUIRED FEES</li>
                </ul>
                <p>
                  The MSWD shall not collect any processing fee for securing
                  Person with Disabilities I.D.{" "}
                  <em>
                    (Ang MSWD ay hindi mangongolekta ng anumang bayad sa
                    pagproseso para sa pagkuha ng Person with Disabilities I.D.)
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
                  The requirements needed to obtain Person with Disabilities
                  I.D.{" "}
                  <em>
                    (Ang mga kinakailangan upang makakuha ng Person with
                    Disabilities I.D.)
                  </em>
                </p>
                <ul>
                  <li>
                    MEDICAL CERTIFICATE INDICATING DISABILITY{" "}
                    <em>
                      (MEDICAL CERTIFICATE NA NAGPAPAHAYAG NG DISABILIDAD)
                    </em>
                  </li>
                  <li>2PCS 1X1 ID PICTURE</li>
                  <li>
                    BLOOD TYPE <em>(Uri ng iyong dugo)</em>
                  </li>
                  <li>
                    Affidavit of loss (if lost ID) (Affidavit of loss (kung
                    nawala ang ID))
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
              label="New (Bago)"
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
            <Form.Check
              inline
              label="Renew"
              name="group1"
              type="radio"
              id="inline-radio-2"
              onClick={() => setFrmData({ ...frmData, appli_type: "renew" })}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <p>{dateToday()}</p>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
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
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Middle Name (Gitnang pangalan)</Form.Label>
              <Form.Control
                required
                type="text"
                name="middle_name"
                id="middle_name"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
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
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Suffix (Hulapi)</Form.Label>
              <Form.Control
                type="text"
                name="suffix"
                id="suffix"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth (Petsa ng Kapanganakan)</Form.Label>
              <Form.Control
                required
                type="date"
                name="dob"
                id="dob"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Sex (Kasarian)</Form.Label>
              <Form.Select name="sex" id="sex" required onChange={textOnChange}>
                <option>Select</option>
                <option value={1}>Male (Lalaki)</option>
                <option value={2}>Female (Babae)</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Civil Status (Katayuang sibil)</Form.Label>
              <Form.Select name="cs" id="cs" required onChange={textOnChange}>
                <option value={0}>Select</option>
                <option value={1}>Single</option>
                <option value={2}>Married</option>
                <option value={3}>Widow/er</option>
                <option value={4}>Separated</option>
                <option value={5}>Cohabitation(Live-in)</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Type of Disability (Uri ng kapansanan)</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="checkbox"
                  key={"tod" + disabilities[0].id}
                  id={"tod" + disabilities[0].id}
                  name={"tod" + disabilities[0].id}
                  label={disabilities[0].name}
                  onChange={() =>
                    setFrmData({ ...frmData, tod1: !frmData.tod1 })
                  }
                />
                <Form.Check
                  inline
                  type="checkbox"
                  key={"tod" + disabilities[1].id}
                  id={"tod" + disabilities[1].id}
                  name={"tod" + disabilities[1].id}
                  label={disabilities[1].name}
                  onChange={() =>
                    setFrmData({ ...frmData, tod2: !frmData.tod2 })
                  }
                />
                <Form.Check
                  inline
                  type="checkbox"
                  key={"tod" + disabilities[2].id}
                  id={"tod" + disabilities[2].id}
                  name={"tod" + disabilities[2].id}
                  label={disabilities[2].name}
                  onChange={() =>
                    setFrmData({ ...frmData, tod3: !frmData.tod3 })
                  }
                />
                <Form.Check
                  inline
                  type="checkbox"
                  key={"tod" + disabilities[3].id}
                  id={"tod" + disabilities[3].id}
                  name={"tod" + disabilities[3].id}
                  label={disabilities[3].name}
                  onChange={() =>
                    setFrmData({ ...frmData, tod4: !frmData.tod4 })
                  }
                />
                <Form.Check
                  inline
                  type="checkbox"
                  key={"tod" + disabilities[4].id}
                  id={"tod" + disabilities[4].id}
                  name={"tod" + disabilities[4].id}
                  label={disabilities[4].name}
                  onChange={() =>
                    setFrmData({ ...frmData, tod5: !frmData.tod5 })
                  }
                />
                <Form.Check
                  inline
                  type="checkbox"
                  key={"tod" + disabilities[5].id}
                  id={"tod" + disabilities[5].id}
                  name={"tod" + disabilities[5].id}
                  label={disabilities[5].name}
                  onChange={() =>
                    setFrmData({ ...frmData, tod6: !frmData.tod6 })
                  }
                />
                <Form.Check
                  inline
                  type="checkbox"
                  key={"tod" + disabilities[6].id}
                  id={"tod" + disabilities[6].id}
                  name={"tod" + disabilities[6].id}
                  label={disabilities[6].name}
                  onChange={() =>
                    setFrmData({ ...frmData, tod7: !frmData.tod7 })
                  }
                />
                <Form.Check
                  inline
                  type="checkbox"
                  key={"tod" + disabilities[7].id}
                  id={"tod" + disabilities[7].id}
                  name={"tod" + disabilities[7].id}
                  label={disabilities[7].name}
                  onChange={() =>
                    setFrmData({ ...frmData, tod8: !frmData.tod8 })
                  }
                />
                <Form.Check
                  inline
                  type="checkbox"
                  key={"tod" + disabilities[8].id}
                  id={"tod" + disabilities[8].id}
                  name={"tod" + disabilities[8].id}
                  label={disabilities[8].name}
                  onChange={() =>
                    setFrmData({ ...frmData, tod9: !frmData.tod9 })
                  }
                />
                <Form.Check
                  inline
                  type="checkbox"
                  key={"tod" + disabilities[9].id}
                  id={"tod" + disabilities[9].id}
                  name={"tod" + disabilities[9].id}
                  label={disabilities[9].name}
                  onChange={() =>
                    setFrmData({ ...frmData, tod10: !frmData.tod10 })
                  }
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>
                Causes of Disability (Dahilan ng kapansanan)
              </Form.Label>
              <Row>
                <Col md={6}>
                  <Form.Check
                    checked={frmData.congenital}
                    type="checkbox"
                    id="congenital"
                    name="congenital"
                    label="Congenital / Inborn (Taglay mula sa kapanganakan)"
                    onChange={() =>
                      setFrmData({
                        ...frmData,
                        congenital: !frmData.congenital,
                      })
                    }
                  />
                  <div className="ms-3">
                    <Form.Check
                      disabled={!frmData.congenital}
                      type="checkbox"
                      id={"conge" + congenital[0].id}
                      name={"conge" + congenital[0].id}
                      label={congenital[0].name}
                      value={frmData.conge1}
                      onChange={() =>
                        setFrmData({
                          ...frmData,
                          conge1: !frmData.conge1,
                        })
                      }
                    />
                    <Form.Check
                      disabled={!frmData.congenital}
                      type="checkbox"
                      id={"conge" + congenital[1].id}
                      name={"conge" + congenital[1].id}
                      label={congenital[1].name}
                      value={frmData.conge2}
                      onChange={() =>
                        setFrmData({
                          ...frmData,
                          conge2: !frmData.conge2,
                        })
                      }
                    />
                    <Form.Check
                      disabled={!frmData.congenital}
                      type="checkbox"
                      id={"conge" + congenital[2].id}
                      name={"conge" + congenital[2].id}
                      label={congenital[2].name}
                      value={frmData.conge3}
                      onChange={() =>
                        setFrmData({
                          ...frmData,
                          conge3: !frmData.conge3,
                        })
                      }
                    />
                    <Form.Label>Others, Specify: (Iba pa, tukuyin)</Form.Label>
                    <Form.Control
                      disabled={!frmData.congenital}
                      type="text"
                      name="congeothers"
                      id="congeothers"
                      onChange={textOnChange}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <Form.Check
                    checked={frmData.acquiredC}
                    type="checkbox"
                    id="acquiredC"
                    name="acquiredC"
                    label="Acquired (Namana)"
                    onChange={() =>
                      setFrmData({
                        ...frmData,
                        acquiredC: !frmData.acquiredC,
                      })
                    }
                  />
                  <div className="ms-3">
                    <Form.Check
                      disabled={!frmData.acquiredC}
                      type="checkbox"
                      id={"acqC" + acquiredC[0].id}
                      name={"acqC" + acquiredC[0].id}
                      label={acquiredC[0].name}
                      value={frmData.acqC1}
                      onChange={() =>
                        setFrmData({
                          ...frmData,
                          acqC1: !frmData.acqC1,
                        })
                      }
                    />
                    <Form.Check
                      disabled={!frmData.acquiredC}
                      type="checkbox"
                      id={"acqC" + acquiredC[1].id}
                      name={"acqC" + acquiredC[1].id}
                      label={acquiredC[1].name}
                      value={frmData.acqC2}
                      onChange={() =>
                        setFrmData({
                          ...frmData,
                          acqC2: !frmData.acqC2,
                        })
                      }
                    />
                    <Form.Check
                      disabled={!frmData.acquiredC}
                      type="checkbox"
                      id={"acqC" + acquiredC[2].id}
                      name={"acqC" + acquiredC[2].id}
                      label={acquiredC[2].name}
                      value={frmData.acqC3}
                      onChange={() =>
                        setFrmData({
                          ...frmData,
                          acqC3: !frmData.acqC3,
                        })
                      }
                    />
                    <Form.Label>Others, Specify: (Iba pa, tukuyin)</Form.Label>
                    <Form.Control
                      disabled={!frmData.acquiredC}
                      type="text"
                      name="acqCothers"
                      id="acqCothers"
                      onChange={textOnChange}
                    />
                  </div>
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Address (Tirahan)</Form.Label>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Label>
                    House No. and Street (Numero ng bahay at kalye)
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="houseno"
                    id="houseno"
                    placeholder="House No."
                    onChange={textOnChange}
                  />
                </Col>
                <Col md={4}>
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
                <Col md={4}>
                  <Form.Label>
                    Municipal, Province, and Region (Munisipalidad, Lalawigan,
                    at Rehiyon)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value="San Rafael, Bulacan, Region III"
                    readOnly
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>
                Contact Details (Detalye ng pakikipag-ugnayan)
              </Form.Label>
              <Row>
                <Col md={3}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Landline No. (Numero sa landline)"
                    name="landline_no"
                    id="landline_no"
                    onChange={textOnChange}
                  />
                </Col>
                <Col md={3}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Mobile No."
                    name="mobile_no"
                    id="mobile_no"
                    onChange={textOnChange}
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Email Address"
                    name="email_address"
                    id="email_address"
                    onChange={textOnChange}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>
                Educational Attainment (Antas ng Pinagaralan)
              </Form.Label>
              <div>
                {educ_attain.map((d) => (
                  <Form.Check
                    inline
                    value={d.id}
                    type="radio"
                    key={d.id}
                    id={"educ_attain" + d.id}
                    name="educ_attain"
                    label={d.name}
                    onChange={textOnChange}
                  />
                ))}
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Employment Status (Katayuan sa trabaho)</Form.Label>
              <Form.Text>Please select if employed</Form.Text>
              <Form.Select name="es" id="es" required onChange={textOnChange}>
                <option value={0}>Select</option>
                <option value={1}>Employed (May trabaho)</option>
                <option value={2}>Unemployed (Walang trabaho)</option>
                <option value={3}>Self-employed</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Category of Employment</Form.Label>
              <Form.Text>Please select if employed</Form.Text>
              {frmData.es === "1" ? (
                <Form.Select
                  required
                  name="t_of_emp"
                  id="t_of_emp"
                  onChange={textOnChange}
                >
                  <option value={0}>Select</option>
                  <option value={1}>Private (Pribado)</option>
                  <option value={2}>Government (Pamahalaan)</option>
                </Form.Select>
              ) : (
                ""
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>
                Types of employment (Uri ng pinagta-trabahuan)
              </Form.Label>
              <Form.Text>Please select if employed</Form.Text>
              {frmData.es === "1" ? (
                <Form.Select
                  required
                  name="t_of_emper"
                  id="t_of_emper"
                  onChange={textOnChange}
                >
                  <option value={0}>Select</option>
                  <option value={1}>
                    Permanent/Regular (Permanente/Regular)
                  </option>
                  <option value={6}>Seasonal (Pana-panahon)</option>
                  <option value={4}>Casual (Kaswal)</option>
                  <option value={7}>Emergency</option>
                </Form.Select>
              ) : (
                ""
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Occupation</Form.Label>{" "}
              <Form.Text>Select one</Form.Text>
              {occupation.map((m) => (
                <Form.Check
                  type="radio"
                  key={"occu" + m.id}
                  id={"occu" + m.id}
                  name="occu"
                  label={m.name}
                  value={m.id}
                  onChange={textOnChange}
                />
              ))}
              <Form.Text>
                <p>Others, please specify: (Iba pa, tukuyin)</p>
              </Form.Text>
              <Form.Control
                type="text"
                name="occu"
                id="occu"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>
                  Organization Information (Impormasyon ng organisasyon)
                </Form.Label>
                <Form.Control
                  required
                  className="mb-1"
                  type="text"
                  name="orgaff"
                  id="orgaff"
                  placeholder="Organization Affiliated (Kaakibat na organisasyon)"
                  onChange={textOnChange}
                />
                <Form.Control
                  required
                  className="mb-1"
                  type="text"
                  name="conper"
                  id="conper"
                  placeholder="Contact Person"
                  onChange={textOnChange}
                />
                <Form.Control
                  required
                  className="mb-1"
                  type="text"
                  name="offadd"
                  id="offadd"
                  placeholder="Office Address (Address ng opisina)"
                  onChange={textOnChange}
                />
                <Form.Control
                  required
                  type="text"
                  name="telno"
                  id="telno"
                  placeholder="Tel No."
                  onChange={textOnChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>ID Reference No.</Form.Label>
                <Form.Control
                  required
                  className="mb-1"
                  type="text"
                  name="sss"
                  id="sss"
                  placeholder="SSS No."
                  onChange={textOnChange}
                />
                <Form.Control
                  required
                  className="mb-1"
                  type="text"
                  name="gsis"
                  id="gsis"
                  placeholder="GSIS No."
                  onChange={textOnChange}
                />
                <Form.Control
                  required
                  className="mb-1"
                  type="text"
                  name="pagibig"
                  id="pagibig"
                  placeholder="Pag-ibig No."
                  onChange={textOnChange}
                />
                <Form.Control
                  required
                  className="mb-1"
                  type="text"
                  name="psnno"
                  id="psnno"
                  placeholder="PSN No."
                  onChange={textOnChange}
                />
                <Form.Control
                  required
                  className="mb-1"
                  type="text"
                  name="philhealth"
                  id="philhealth"
                  placeholder="PhilHealth No."
                  onChange={textOnChange}
                />
              </Form.Group>
            </Row>
          </Col>
        </Row>
        <Row>
          <Form.Group className="mb-3">
            <Col md={12}>
              <Form.Label>Family Background (Background ng pamilya)</Form.Label>
            </Col>
            <Col md={12}>
              <Form.Label>Father's Name (Pangalan ng tatay)</Form.Label>
            </Col>
            <Row>
              <Col md={4}>
                <Form.Control
                  required
                  type="text"
                  name="father_last_name"
                  id="father_last_name"
                  placeholder="Last Name (Apelyido)"
                  onChange={textOnChange}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  required
                  type="text"
                  name="father_first_name"
                  id="father_first_name"
                  placeholder="First Name (Pangalan)"
                  onChange={textOnChange}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  type="text"
                  name="father_middle_name"
                  id="father_middle_name"
                  placeholder="Middle Name (Gitnang pangalan)"
                  onChange={textOnChange}
                />
              </Col>
            </Row>
            <Col md={12}>
              <Form.Label>Mother's Name (Pangalan ng nanay)</Form.Label>
            </Col>
            <Row>
              <Col md={4}>
                <Form.Control
                  required
                  type="text"
                  name="mother_last_name"
                  id="mother_last_name"
                  placeholder="Last Name (Apelyido)"
                  onChange={textOnChange}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  required
                  type="text"
                  name="mother_first_name"
                  id="mother_first_name"
                  placeholder="First Name (Pangalan)"
                  onChange={textOnChange}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  type="text"
                  name="mother_middle_name"
                  id="mother_middle_name"
                  placeholder="Middle Name (Gitnang pangalan)"
                  onChange={textOnChange}
                />
              </Col>
            </Row>
            <Col md={12}>
              <Form.Label>
                Guardian's Name (Pangalan ng tagapangalaga)
              </Form.Label>
            </Col>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Control
                  required
                  type="text"
                  name="guardian_last_name"
                  id="guardian_last_name"
                  placeholder="Last Name (Apelyido)"
                  onChange={textOnChange}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  required
                  type="text"
                  name="guardian_first_name"
                  id="guardian_first_name"
                  placeholder="First Name (Pangalan)"
                  onChange={textOnChange}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  type="text"
                  name="guardian_middle_name"
                  id="guardian_middle_name"
                  placeholder="Middle Name (Gitnang pangalan)"
                  onChange={textOnChange}
                />
              </Col>
            </Row>
            <Col md={12}>
              <Form.Label>Accomplished By (Naisagawa ni)</Form.Label>
            </Col>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Check
                  type="radio"
                  id="applicant"
                  name="accomBy"
                  label="Applicant"
                  value={1}
                  onChange={textOnChange}
                />
                <Form.Check
                  type="radio"
                  id="guardian"
                  name="accomBy"
                  label="Guardian"
                  value={2}
                  onChange={textOnChange}
                />
                <Form.Check
                  type="radio"
                  id="representative"
                  name="accomBy"
                  label="Representative"
                  value={3}
                  onChange={textOnChange}
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  required
                  type="text"
                  name="accom_last_name"
                  id="accom_last_name"
                  placeholder="Last Name"
                  onChange={textOnChange}
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  required
                  type="text"
                  name="accom_first_name"
                  id="accom_first_name"
                  placeholder="First Name"
                  onChange={textOnChange}
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  type="text"
                  name="accom_middle_name"
                  id="accom_middle_name"
                  placeholder="Middle Name"
                  onChange={textOnChange}
                />
              </Col>
            </Row>
            <Col md={12}>
              <Form.Label>
                Name of Certifying Physician (Pangalan ng Nagpapatunay na
                doktor)
              </Form.Label>
            </Col>
            <Row>
              <Col md={4}>
                <Form.Control
                  required
                  type="text"
                  name="cert_ph_last_name"
                  id="cert_ph_last_name"
                  placeholder="Last Name"
                  onChange={textOnChange}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  required
                  type="text"
                  name="cert_ph_first_name"
                  id="cert_ph_first_name"
                  placeholder="First Name"
                  onChange={textOnChange}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  required
                  type="text"
                  name="cert_ph_middle_name"
                  id="cert_ph_middle_name"
                  placeholder="Middle Name"
                  onChange={textOnChange}
                />
              </Col>
            </Row>
          </Form.Group>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>License No. (Numero ng lisensya)</Form.Label>
              <Form.Control
                required
                type="text"
                name="lic_no"
                id="lic_no"
                onChange={textOnChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Picture in white background (1x1) PNG ONLY (Larawan sa puting
                background)
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
                Signature over printed name. PNG ONLY (Lagda sa ibabaw ng
                pangalan)
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
            <Form.Label>Documents</Form.Label>
            <div className="mb-1">
              <small>
                Valid ID with birthday and address in San Rafael (Voter's,
                SSS/UMID, LTO, Passport), affidavit of loss (if lost ID), or if
                no valid ID available: Birth certificate or certificate of
                residency (
                <a
                  href="https://i.ibb.co/wyhLcD5/drag-and-select.gif"
                  target="_blank"
                  rel="noreferrer"
                >
                  You can multiple select files.
                </a>
                ) PDF Only
              </small>
            </div>
            <Form.Control
              required
              type="file"
              name="docs"
              id="docs"
              accept="application/pdf"
              onChange={docsOnChange}
              multiple
            />
          </Col>
          <Col md={6}></Col>
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

export default IdAppliPwd;
