import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Card,
  Table,
  Accordion,
} from "react-bootstrap";

import mswdoLogo from "../img/MSWDO Logo.png";
import foiphLogo from "../img/foiph.png";

import api from "../api/api";

import { sortByDesc } from "../fn/functions";

//components
import NewsBox from "../components/NewsBox";
import ContactForm from "../components/ContactForm";
import RunningDateTime from "../components/RunningDateTime";

import bannerImg from "../img/banner-img.png";

const Home = () => {
  let [ann, setAnn] = useState(false);

  const proc = {
    aics: [
      {
        procedures:
          "1. Received the complete requirements from the client (Natanggap ang kumpletong mga kinakailangan mula sa kliyente)",
        proc_time: "2 minutes",
        res_per: "Elsa Revilla",
      },
      {
        procedures:
          "2. Interview and assess the client and prepare social case study report (Interbyuhin at tasahin ang kliyente at ihanda ang ulat ng social case study)",
        proc_time: "35 minutes",
        res_per: "Elsa Revilla",
      },
      {
        procedures:
          "3. Transfer the data gathered using the DSWD – Intake Form (Ilipat ang mga datos na nakalap gamit ang DSWD – Intake Form)",
        proc_time: "5 minutes",
        res_per: "Elsa Revilla",
      },
      {
        procedures:
          "4. Typing the Request Information Sheet (RIS) (Pag-type ng Request Information Sheet (RIS))",
        proc_time: "5 minutes",
        res_per: "Elsa Revilla",
      },
      {
        procedures:
          "5. Signature of the Municipal Social Welfare and Development Officer (Lagda ng Municipal Social Welfare and Development Officer)",
        proc_time: "1 minute",
        res_per: "Ma. Victoria G. Ramos",
      },
      {
        procedures:
          "6. Typing other pertinent documents (ALOBS) at the Municipal Budget Officer’s Office and signature of the Municipal Budget Officer (Pag-type ng iba pang nauugnay na dokumento (ALOBS) sa Municipal Budget Officer’s Office at lagda ng Municipal Budget Officer)",
        proc_time: "5 minutes",
        res_per: "Budget Office’s Staff",
      },
      {
        procedures:
          "7. Signature of the Municipal Social Welfare and Development Officer (Lagda ng Municipal Social Welfare and Development Officer)",
        proc_time: "1 minute",
        res_per: "Ma. Victoria G. Ramos",
      },
      {
        procedures:
          "8. Preparation of supporting documents and Signature of the Municipal Accountant (Paghahanda ng mga sumusuportang dokumento at Lagda ng Municipal )",
        proc_time: "1 minute",
        res_per: "Emerenciana DL. Forlales",
      },
      {
        procedures:
          "9. Signature of the Municipal Mayor (Lagda ng Alkalde ng Munisipyo)",
        proc_time: "1 minute",
        res_per: "Hon. Cipriano D. Violago, Jr.",
      },
      {
        procedures:
          "10. Preparation of Check and Signature of the Municipal Treasurer (Paghahanda ng Tseke at Lagda ng Municipal)",
        proc_time: "5 minutes",
        res_per: "Gloria G. Valderama",
      },
      {
        procedures: `11. Client received his/her financial assistance at the Treasurer's Office (Natanggap ng kliyente ang kanyang tulong pinansyal sa Treasurer's Office`,
        proc_time: "1 minute",
        res_per: "Client",
      },
    ],
    ioi: [
      {
        procedures:
          "1. Proceed to the Social Welfare and Development Office and present complete requirements (Magpatuloy sa Social Welfare and Development Office at ipakita ang kumpletong dokumento na mga kinakailangan)",
        proc_time: "5 minutes",
        res_per: "Social Welfare Officer III/Social Welfare Assistant",
      },
      {
        procedures: "2. Attend an interview (Dumalo sa isang panayam)",
        proc_time: "35 minutes",
        res_per: "Social Welfare Officer III/Social Welfare Assistant",
      },
      {
        procedures: "3. Claim certificate (I-claim ang sertipiko)",
        proc_time: "2 minutes",
        res_per: "MSWDO Staff",
      },
    ],
    spb: [
      {
        procedures:
          "1. Proceed to the Social Welfare and Development Office and present requirements (Magpatuloy sa Social Welfare and Development Office at kasalukuyang mga kinakailangan)",
        proc_time: "5 minutes",
        res_per: "MSWDO Staff",
      },
      {
        procedures: "2. Receive Purchase Booklet",
        proc_time: "2 minutes",
        res_per: "MSWDO Staff",
      },
    ],
    scsr: [
      {
        procedures:
          "1. Proceed to the Municipal Social Welfare and Development Office and Submit complete Documents (Magpatuloy sa Municipal Social Welfare and Development Office at Isumite nang kumpleto mga dokumento)",
        proc_time: "10 minutes",
        res_per: "MSWDO Staff",
      },
      {
        procedures: "2. Attend an interview (Dumalo sa isang panayam)",
        proc_time: "40 minutes",
        res_per: "MSWDO Staff",
      },
      {
        procedures: "3. Receive Social Case Study Report",
        proc_time: "5 minutes",
        res_per: "MSWDO Staff",
      },
    ],
    pmc: [
      {
        procedures:
          "1. Proceed to the Social Welfare and Development Office and present requirement (Magpatuloy sa Social Welfare and Development Office at i-present ang mga nasabing requirements",
        proc_time: "10 minutes",
        res_per: "Administrative Aide II",
      },
      {
        procedures:
          "2. Attend Pre-Marriage Counseling Orientation (Dumalo sa Pre-Marriage Counseling Orientation)",
        proc_time: "2 hours",
        res_per: "Social Worker Officer II/Administrative Aide II",
      },
      {
        procedures: `3. Pay at the Treasurer's Office (Magbayad sa Treasurer's Office)`,
        proc_time: "5 minutes",
        res_per: "Revenue Collection Clerk II",
      },
      {
        procedures: "4. Claim certificate (I-claim ang sertipiko)",
        proc_time: "2 minutes",
        res_per: "MSWDO Staff",
      },
    ],
  };

  const getAnn = async () => {
    let res = await api.get("announcement");
    let data = res.data.data;

    setAnn(sortByDesc(data));
  };

  useEffect(() => {
    getAnn();
  }, []);

  return (
    <div>
      <div
        style={{
          background: `#000`,
          backgroundPosition: "bottom",
          color: "#fff",
          backgroundSize: "cover",
          padding: "15vh 0",
        }}
      >
        <Container>
          <Row>
            <Col xs="12">
              <h1 style={{ fontSize: "2.5em" }}>
                Municipal Social Welfare and Development Office
              </h1>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <h3 style={{ fontSize: "1.5em" }}>San Rafael, Bulacan Office</h3>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Button
                size="lg"
                variant="light"
                href="/services"
                className="mt-5"
              >
                Services
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Container fluid className="pt-5 pb-5">
        <Row>
          <Col lg={3} style={{ fontSize: "16px" }}>
            <Card className="mb-3 p-3">
              {/* <center><iframe title="Philippine Standard Time" src="https://free.timeanddate.com/clock/i8asrvlg/n145/fn16/fc444/tt0/tm1/tb4" frameBorder="0" width="161" height="34"></iframe></center> */}
              <RunningDateTime />
            </Card>
            <Card className="mb-3 p-3">
              <center>
                <div>
                  <img src={mswdoLogo} width={200} alt="MSWDO Logo" />
                </div>
                <div>
                  <a
                    href="https://www.foi.gov.ph/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={foiphLogo}
                      width={200}
                      alt="Freedom of Information Philippines Logo"
                    />
                  </a>
                </div>
              </center>
            </Card>
            <Card className="mb-3 p-3">
              <strong>Sitemap</strong>
              <ul style={{ textAlign: "left" }}>
                <li>
                  <a href="/" rel="noreferrer">
                    <strong>Home</strong>
                  </a>
                  <ul>
                    <li>
                      <a href="#announcements" rel="noreferrer">
                        Announcement
                      </a>
                    </li>
                    <li>
                      <a href="#about" rel="noreferrer">
                        Vision, Mission, Objectives, and Pledge
                      </a>
                    </li>
                    <li>
                      <a href="#services" rel="noreferrer">
                        Service Offered
                      </a>
                    </li>
                    <li>
                      <a href="#eservices" rel="noreferrer">
                        eService Offered
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="/eservices" rel="noreferrer">
                    <strong>E-Services</strong>
                  </a>
                </li>
                <li>
                  <a href="/services" rel="noreferrer">
                    <strong>Services Offered</strong>
                  </a>
                </li>
                <li>
                  <a href="/about" rel="noreferrer">
                    <strong>About Us</strong>
                  </a>
                  <ul>
                    <li>
                      <a href="/about" rel="noreferrer">
                        Vision, Mission, Objectives, and Pledge
                      </a>
                    </li>
                    <li>
                      <a href="/about" rel="noreferrer">
                        Organization Chart
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="/faq" rel="noreferrer">
                    <strong>FAQ</strong>
                  </a>
                </li>
                <li>
                  <a href="/download-forms" rel="noreferrer">
                    <strong>Downloadable Forms</strong>
                  </a>
                </li>
              </ul>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="p-3 mb-3" id="announcements">
              <h5
                className="mb-3"
                style={{ textAlign: "left", textTransform: "uppercase" }}
              >
                Announcements
              </h5>
              <div
                className="newsBox"
                style={{ maxHeight: "500px", overflow: "auto" }}
              >
                {!ann ? (
                  <Spinner className="mt-5" animation="border" variant="info" />
                ) : (
                  ann.map((d) => <NewsBox key={d.id} announcementData={d} />)
                )}
              </div>
            </Card>

            <Card className="p-3 mb-3" style={{ textAlign: "left" }} id="about">
              <h5 style={{ textTransform: "uppercase" }}>Vision</h5>
              <p>
                An ideal office embodied by truly dedicated personnel whose path
                is governed by God and by the Professional Social Worker’s Code
                of Ethics, Values and Principles. Our collective efforts are
                towards the empowerment, participation and rehabilitation of the
                disadvantaged sectors of society whether individual, group and
                community designed for the restoration of their normal level of
                social functioning.
              </p>
              <p style={{ fontWeight: "bold", fontStyle: "italic" }}>
                “Empowered families and individuals in the municipality who
                actively participate in community affairs and have normal level
                of social functioning”.
              </p>
            </Card>

            <Card className="p-3 mb-3" style={{ textAlign: "left" }}>
              <h5 style={{ textTransform: "uppercase" }}>Mission</h5>
              <p>
                Care, protection and rehabilitation of the municipality’s
                population which has the least in life and needs social welfare
                assistance and social work interventions to restore their normal
                social functioning and participation in community affairs.
              </p>
            </Card>

            <Card className="p-3 mb-3" style={{ textAlign: "left" }}>
              <h5 style={{ textTransform: "uppercase" }}>Objectives</h5>
              <ol>
                <li style={{ marginBottom: "1em" }}>
                  <strong>
                    Provision of preventive, protective, rehabilitative and
                    developmental programs and services for:
                  </strong>
                  <ul>
                    <li>Family & Community Welfare</li>
                    <li>Child and Youth Welfare</li>
                    <li>Women Welfare Program</li>
                    <li>Person with Disability Welfare</li>
                    <li>Emergency Assistance Welfare</li>
                  </ul>
                </li>
                <li style={{ marginBottom: "1em" }}>
                  <strong>
                    Formulation and advocacy of just and responsive social
                    welfare and development legislative agenda policies and
                    plans as well as ensuring this effective implementation of
                    all programs.
                  </strong>
                </li>
                <li>
                  <strong>
                    Strengthen agency and community networks, linkages and
                    collaboration for a responsive and strategic delivery of
                    social protective services.
                  </strong>
                </li>
              </ol>
            </Card>

            <Card className="p-3 mb-3" style={{ textAlign: "left" }}>
              <h5 style={{ textTransform: "uppercase" }}>
                Pledge and Commitment
              </h5>
              <p>
                We, the official and employees of the Municipal Social Welfare
                and Development Office of San Rafael, Bulacan pledge and commit
                to deliver quality services that will really meet the needs of
                our clientele as promised in this Citizen's Charter; to ensure
                their normal social functioning and maximum participation in
                community affairs. We, will demonstrate sensitivity and
                appropriate behavior and professionalism based on the social
                worker's code of ethics.
              </p>
            </Card>

            <Card
              className="p-3 mb-3"
              style={{ textAlign: "left" }}
              id="services"
            >
              <h5 className="mb-3" style={{ textTransform: "uppercase" }}>
                Services Offered by MSWD
              </h5>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    Provision of Assistance to Individuals in Crisis Situation
                    (AICS)
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Financial Assistance or Assistance for Individual in
                      Crisis Situation (AICS) - the provision of needed
                      interventions to enable distressed individuals/families to
                      cope with crisis; assistance maybe in the form of
                      transportation, medical or hospitalization support, burial
                      assistance/ sympathy flowers to bereaved families and
                      other financial support.{" "}
                      <em>
                        (Financial Assistance or Assistance for Individual in
                        Crisis Situation (AICS) - ang pagbibigay ng mga
                        kinakailangang interbensyon upang bigyang-daan ang mga
                        indibidwal/pamilyang nahihirapang makayanan ang krisis;
                        maaaring tulong sa anyo ng transportasyon, suportang
                        medikal o ospital, tulong sa paglilibing/ bulaklak ng
                        pakikiramay sa mga naulilang pamilya at iba pang
                        suportang pinansyal.)
                      </em>
                    </p>
                    <strong>
                      The assistance maybe in the form of the following:
                    </strong>
                    <ul>
                      <li>Financial Assistance</li>
                      <li>Burial Assistance</li>
                      <li>Wheelchair Assistance</li>
                      <li>Calamity Assistance</li>
                    </ul>
                    <strong>How to Avail of the Service:</strong>
                    <Table responsive hover striped bordered>
                      <thead>
                        <tr>
                          <th width="50%">Procedures</th>
                          <th>Processing Time</th>
                          <th>Responsible Person</th>
                        </tr>
                      </thead>
                      <tbody>
                        {proc.aics.map((d, key) => (
                          <tr key={key}>
                            <td>{d.procedures}</td>
                            <td>{d.proc_time}</td>
                            <td>{d.res_per}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Issuance of Indigency</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Certificate of Indigency is a certification issued by the
                      Municipal Social Welfare and Development Office certifying
                      that the said client/applicant belongs to the indigent
                      families in their barangay as certified by their barangay
                      captains.{" "}
                      <em>
                        (Ang Certificate of Indigency ay isang sertipikasyon na
                        inisyu ng Municipal Social Welfare and Development
                        Office na nagpapatunay na ang nasabing
                        kliyente/aplikante ay kabilang sa mga mahihirap na
                        pamilya sa kanilang barangay ayon sa sertipikasyon ng
                        kanilang mga barangay captain.)
                      </em>
                    </p>
                    <strong>Who May Avail of the Service:</strong>
                    <ul>
                      <li>
                        Bonafide resident who belongs to marginalized group of
                        families
                      </li>
                    </ul>
                    <strong>How to Avail of the Service:</strong>
                    <Table responsive hover striped bordered>
                      <thead>
                        <tr>
                          <th width="50%">Procedures</th>
                          <th width="20%">Processing Time</th>
                          <th>Responsible Person</th>
                        </tr>
                      </thead>
                      <tbody>
                        {proc.ioi.map((d, key) => (
                          <tr key={key}>
                            <td>{d.procedures}</td>
                            <td>{d.proc_time}</td>
                            <td>{d.res_per}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Securing Purchase Booklet</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      The Purchase Booklet is issued by the Office of the Senior
                      Citizen Affairs (OSCA). This is use to avail special
                      discount for basic necessities and prime commodities. It
                      shall be presented together with the Senior Citizen ID or
                      PWD ID.
                    </p>
                    <p>
                      <em>
                        (Ang Purchase Booklet ay inisyu ng Office of the Senior
                        Citizen Affairs (OSCA). Ito ay ginagamit upang makakuha
                        ng espesyal na diskwento para sa mga pangunahing
                        pangangailangan at pangunahing bilihin. Dapat itong
                        iharap kasama ng Senior Citizen ID o PWD ID.)
                      </em>
                    </p>
                    <p>
                      <strong>Persons with Disabilities</strong> are those
                      suffering from restriction of different abilities, as a
                      result of a mental, physical or sensory impairment, to
                      perform an activity in the manner or within the range
                      considered normal for a human being.{" "}
                      <em>
                        (Ang mga taong may Kapansanan ay ang mga dumaranas ng
                        paghihigpit sa iba't ibang kakayahan, bilang resulta ng
                        kapansanan sa pag-iisip, pisikal o pandama, upang
                        magsagawa ng aktibidad sa paraang o sa loob ng saklaw na
                        itinuturing na normal para sa isang tao.)
                      </em>
                    </p>
                    <p>
                      <strong>Senior Citizen</strong> shall mean any resident
                      citizen of the Philippines and at least 60 years of age
                      and above.{" "}
                      <em>
                        (Ang Senior Citizen ay nangangahulugang sinumang
                        residenteng mamamayan ng Pilipinas at hindi bababa sa 60
                        taong gulang pataas)
                      </em>
                    </p>
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-check-lg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                      </svg>{" "}
                      The grant of 20% discount from all the establishments
                      relative to the utilization of services in hotels,
                      restaurants and recreation centers and purchase of
                      medicines in all establishments for the exclusive use or
                      enjoyment of Senior Citizens, including funeral and
                      burials services for the death of Senior Citizens.{" "}
                      <em>
                        (Ang pagbibigay ng 20% na diskwento mula sa lahat ng mga
                        establisyimento na may kaugnayan sa paggamit ng mga
                        serbisyo sa mga hotel, restaurant at recreation center
                        at pagbili ng mga gamot sa lahat ng mga establisyimento
                        para sa eksklusibong paggamit o kasiyahan ng mga Senior
                        Citizens, kabilang ang mga serbisyo sa libing at burial
                        para sa pagkamatay ng Senior. Mga mamamayan.)
                      </em>
                    </p>
                    <strong>Who May Avail of the Service:</strong>
                    <ul>
                      <li>Senior citizens, Person with Disability (PWD)</li>
                    </ul>
                    <strong>How to Avail of the Service:</strong>
                    <Table responsive hover striped bordered>
                      <thead>
                        <tr>
                          <th width="50%">Procedures</th>
                          <th width="20%">Processing Time</th>
                          <th>Responsible Person</th>
                        </tr>
                      </thead>
                      <tbody>
                        {proc.spb.map((d, key) => (
                          <tr key={key}>
                            <td>{d.procedures}</td>
                            <td>{d.proc_time}</td>
                            <td>{d.res_per}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    Securing Social Case Study Report
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Social Case Study Report - it is a referral letter or a
                      case study (prepared by the MSWDO or a social worker) for
                      the concerned agencies like PCSO, Hospitals and referrals
                      of clients to other service providers of other agencies
                      concerned.{" "}
                      <em>
                        (Social Case Study Report – ito ay isang liham ng
                        referral o isang case study (inihanda ng MSWDO o isang
                        social worker) para sa mga kinauukulang ahensya tulad ng
                        PCSO, Mga Ospital at mga referral ng mga kliyente sa iba
                        pang mga service provider ng iba pang ahensyang may
                        kinalaman.)
                      </em>
                    </p>
                    <strong>Who May Avail of the Service:</strong>
                    <ul>
                      <li>
                        Indigent individuals or families
                        <p>
                          <strong>Situation Covered</strong>
                        </p>
                        <ul>
                          <li>
                            Burial Assistance
                            <ul>
                              <li>For Indigents</li>
                              <li>For Senior Citizen</li>
                            </ul>
                          </li>
                          <li>Hospitalization Assistance</li>
                          <li>Financial Assistance</li>
                        </ul>
                      </li>
                    </ul>
                    <strong>How to Avail of the Service:</strong>
                    <Table responsive hover striped bordered>
                      <thead>
                        <tr>
                          <th width="50%">Procedures</th>
                          <th width="20%">Processing Time</th>
                          <th>Responsible Person</th>
                        </tr>
                      </thead>
                      <tbody>
                        {proc.spb.map((d, key) => (
                          <tr key={key}>
                            <td>{d.procedures}</td>
                            <td>{d.proc_time}</td>
                            <td>{d.res_per}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <strong>
                      <em>
                        Note: Only registered social worker prepares and signed
                        the social case study report (Ang rehistradong social
                        worker lamang ang naghahanda at pumirma sa ulat ng
                        social case study)
                      </em>
                    </strong>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    Securing Pre-Marriage Counselling Certificate (PMC)
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Pre-marriage counseling – is a one-day orientation and
                      counseling to would-be couples on Responsible Parenthood
                      and Family Planning. This is a Presidential Decree No. 965
                      as a pre-requisite for securing the marriage license of
                      the couple.{" "}
                      <em>
                        (Pre-marriage counseling – ay isang isang araw na
                        oryentasyon at pagpapayo sa mga magiging mag-asawa sa
                        Responsible Parenthood at Family Planning. Ito ay isang
                        Presidential Decree No. 965 bilang isang pre-requisite
                        para sa pagkuha ng marriage license ng mag-asawa.)
                      </em>
                    </p>
                    <strong>Who May Avail of the Service:</strong>
                    <ul>
                      <li>Couples even if they already have a child</li>
                    </ul>
                    <strong>Requirements</strong>
                    <ul>
                      <li>Accomplished PMC Registration Form</li>
                    </ul>
                    <p>
                      <a
                        href="https://u.pcloud.link/publink/show?code=XZrHbXVZuQll6EPKDrSrCBPOkSoAK06ADMK7"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Click here to download the PMC Registration Form
                      </a>
                    </p>
                    <strong>How to Avail of the Service:</strong>
                    <Table responsive hover striped bordered>
                      <thead>
                        <tr>
                          <th width="50%">Procedures</th>
                          <th width="20%">Processing Time</th>
                          <th>Responsible Person</th>
                        </tr>
                      </thead>
                      <tbody>
                        {proc.pmc.map((d, key) => (
                          <tr key={key}>
                            <td>{d.procedures}</td>
                            <td>{d.proc_time}</td>
                            <td>{d.res_per}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card>

            <Card className="p-3 mb-3 text-start" id="eservices">
              <h5 className="mb-3" style={{ textTransform: "uppercase" }}>
                e-Services Offered by MSWD
              </h5>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    Issuance of Solo Parent Identification Card
                  </Accordion.Header>
                  <Accordion.Body>
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          Who is considered under the law as a “solo parent”?{" "}
                          <em>
                            (Sino ang itinuturing sa ilalim ng batas bilang
                            "solo parent"?)
                          </em>
                        </Accordion.Header>
                        <Accordion.Body>
                          Any individual who falls under any of the following
                          categories is considered as a single parent:{" "}
                          <em>
                            (Sinumang indibidwal na nasa ilalim ng alinman sa
                            mga sumusunod na kategorya ay itinuturing na isang
                            solong magulang;)
                          </em>
                          <ol>
                            <li>
                              A woman who gives birth as a result of rape and
                              other crimes against chastity even without a final
                              conviction of the offender: Provided, That the
                              mother keeps and raises the child;{" "}
                              <em>
                                (Isang babae na nanganak bilang resulta ng
                                panggagahasa at iba pang mga krimen laban sa
                                kalinisang-puri kahit na walang huling hatol sa
                                nagkasala: Sa kondisyon, Na ang ina ay
                                nag-iingat at nagpalaki sa bata;)
                              </em>
                            </li>
                            <li>
                              Parent left solo or alone with the responsibility
                              of parenthood due to death of spouse;{" "}
                              <em>
                                (Ang magulang ay naiwan nang mag-isa o nag-iisa
                                sa responsibilidad ng pagiging magulang dahil sa
                                pagkamatay ng asawa;)
                              </em>
                            </li>
                            <li>
                              Parent left solo or alone with the responsibility
                              of parenthood while the spouse is detained or is
                              serving sentence for a criminal conviction for at
                              least one year;{" "}
                              <em>
                                (Ang magulang ay naiwan nang mag-isa o nag-iisa
                                na may pananagutan sa pagiging magulang habang
                                ang asawa ay nakakulong o nagsisilbing
                                sentensiya para sa isang kriminal na paghatol
                                nang hindi bababa sa isang taon;)
                              </em>
                            </li>
                            <li>
                              Parent left solo or alone with the responsibility
                              of parenthood due to physical and/or mental
                              incapacity of spouse as certified by a public
                              medical practitioner;{" "}
                              <em>
                                (Ang magulang ay naiwan nang mag-isa o nag-iisa
                                na may pananagutan sa pagiging magulang dahil sa
                                pisikal at/o mental na kawalan ng kakayahan ng
                                asawa bilang sertipikado ng isang pampublikong
                                medikal na practitioner;)
                              </em>
                            </li>
                            <li>
                              Parent left solo or alone with the responsibility
                              of parenthood due to legal separation or de facto
                              separation from spouse for at least one year, as
                              long as he/she is entrusted with the custody of
                              the children;{" "}
                              <em>
                                (Ang magulang ay naiwan nang mag-isa o nag-iisa
                                sa responsibilidad ng pagiging magulang dahil sa
                                legal na paghihiwalay o de facto na paghihiwalay
                                sa asawa nang hindi bababa sa isang taon,
                                hangga't ipinagkatiwala sa kanya ang
                                pangangalaga ng mga anak;)
                              </em>
                            </li>
                            <li>
                              Parent left solo or alone with the responsibility
                              of parenthood due to declaration of nullity or
                              annulment of marriage as decreed by a court or by
                              a church as long as he or she is entrusted with
                              the custody of the children;{" "}
                              <em>
                                (Ang magulang ay naiwan nang mag-isa o nag-iisa
                                sa pananagutan ng pagiging magulang dahil sa
                                deklarasyon ng pagpapawalang bisa o
                                pagpapawalang-bisa ng kasal ayon sa ipinag-utos
                                ng korte o ng simbahan hangga't ipinagkatiwala
                                sa kanya ang pangangalaga ng mga anak;)
                              </em>
                            </li>
                            <li>
                              Parent left solo or alone with the responsibility
                              of parenthood due to abandonment of spouse for at
                              least one year;{" "}
                              <em>
                                (Ang magulang ay umalis na nag-iisa o nag-iisa
                                sa responsibilidad ng pagiging magulang dahil sa
                                pag-abandona ng asawa nang hindi bababa sa isang
                                taon;)
                              </em>
                            </li>
                            <li>
                              Unmarried mother or father who has preferred to
                              keep and rear the child or children instead of
                              having others care for them or give them up to a
                              welfare institution;{" "}
                              <em>
                                (Walang asawa na ina o ama na mas piniling
                                panatilihin at palakihin ang anak o mga anak sa
                                halip na alagaan sila ng iba o ibigay sila sa
                                isang institusyong pangkapakanan;)
                              </em>
                            </li>
                            <li>
                              Any other person who solely provides parental care
                              and support to a child or children;{" "}
                              <em>
                                (Sinumang ibang tao na tanging nagbibigay ng
                                pangangalaga at suporta ng magulang sa isang
                                bata o mga anak;)
                              </em>
                            </li>
                            <li>
                              Any family member who assumes the responsibility
                              of head of family as a result of the death,
                              abandonment, disappearance or prolonged absence of
                              the parents or solo parent.{" "}
                              <em>
                                (Sinumang miyembro ng pamilya na umaako sa
                                responsibilidad ng ulo ng pamilya bilang resulta
                                ng pagkamatay, pag-abandona, pagkawala o matagal
                                na pagkawala ng mga magulang o solong magulang.)
                              </em>
                            </li>
                          </ol>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          How can I use the MSWD E-Services in securing Solo
                          Parent I.D.?{" "}
                          <em>
                            (Paano ko gagamitin ang DSWD E-Services sa pagkuha
                            ng Solo Parent ID?)
                          </em>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            <strong>Step 1: </strong>Applicant must register by
                            clicking the “Don't have an account? Register here!”
                            tab, follow the instructions.{" "}
                            <em>
                              (Magrehistro muna sa pamamagitan ng pag pindot ng
                              “Don't have an account? Register here!” tab,
                              sundin ang mga kailangan.)
                            </em>
                          </p>
                          <p>
                            <strong>Step 2: </strong>If applicant has
                            successfully registered, login and go to Solo Parent
                            I.D. application form.{" "}
                            <em>
                              (Kapag nakapag registro na ang aplikante,
                              mag-login muna at pumunta sa Solo Parents I.D.
                              Application Form.)
                            </em>
                          </p>
                          <p>
                            <strong>Step 3: </strong>Review the documents
                            required before proceeding.{" "}
                            <em>
                              (Suriing mabuti ang mga dokumentong kinakailangan
                              bago magpatuloy.)
                            </em>
                          </p>
                          <p>
                            <strong>Step 4: </strong>Fill up all required fields
                            in the Solo Parent I.D. application form.{" "}
                            <em>
                              (Sagutan ang lahat ng kailangan sa Solo Parent
                              I.D. application form.)
                            </em>
                          </p>
                          <p>
                            <strong>Step 5: </strong>Upload scanned copies of
                            required documents.{" "}
                            <em>
                              (Mag-upload ng mga na-scan na kopya ng mga
                              kinakailangang dokumento.)
                            </em>
                          </p>
                          <p>
                            <strong>Step 6: </strong>Check submitted
                            application.{" "}
                            <em>(Suriin ang pinunang aplikasyon.)</em>
                          </p>
                          <p>
                            <strong>Step 7: </strong>Applicant will receive
                            notification of the successful application of Solo
                            Parent I.D. via email.{" "}
                            <em>
                              (Makakatanggap ng email ang aplikante na
                              matagumpay na aplikayson para sa Solo Parent I.D.)
                            </em>
                          </p>
                          <p>
                            <strong>Step 8: </strong>MSWD Staff will assess the
                            submitted online application.{" "}
                            <em>
                              (Susuriin ng MSWD Staff ang naisumiteng
                              aplikasyon.)
                            </em>
                          </p>
                          <p>
                            <strong>Step 9: </strong>Applicant will be able to
                            track their transaction by clicking the “Track my
                            application” tab in their dashboard.{" "}
                            <em>
                              (Magagawang subaybayan ng aplikante ang kanilang
                              transaksyon sa pamamagitan ng pag-click sa tab na
                              "Track my application" sa kanilang dashboard.)
                            </em>
                          </p>
                          <p>
                            <strong>Step 10: </strong>Applicant will receive
                            notification if his/her Solo Parent I.D. are ready
                            to release.{" "}
                            <em>
                              (Makakatanggap ang aplikante ng abiso kung ang
                              kanyang Solo Parent I.D. ay handa at maari ng
                              kuhain.)
                            </em>
                          </p>
                          <p>
                            <strong>Step 11: </strong>Applicant will proceed to
                            MSWD office in San Rafael Bulacan to claim his/her
                            Solo Parent I.D after they receive notification.{" "}
                            <em>
                              (Magpunta sa MSWD Office of San Rafael Bulacan
                              para kunin ang Solo Parent I.D. pagkatapos
                              matanggap ang abiso.)
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
                          What do I need before I apply?{" "}
                          <em>
                            (Ano ang mga kailangan ko bago ako mag-apply?)
                          </em>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            The requirements needed to obtain Solo Parent I.D.{" "}
                            <em>
                              (Ang mga kinakailangan upang makakuha ng Solo
                              Parent I.D.)
                            </em>
                          </p>
                          <ul>
                            <li>
                              2 pcs 1x1 ID picture (latest picture in white
                              background){" "}
                              <em>
                                (2 piraso 1x1 ID picture (pinakabagong larawan
                                sa puting background))
                              </em>
                            </li>
                            <li>
                              Solo parent certificate from the barangay (if
                              separate){" "}
                              <em>
                                (Solo parent certificate mula sa barangay (kung
                                hiwalay))
                              </em>
                            </li>
                            <li>
                              Death certificate if widow / widower{" "}
                              <em>(Death certificate kung balo / Biyuda)</em>
                            </li>
                            <li>
                              Birth certificate of children{" "}
                              <em>(Birth certificate ng mga anak)</em>
                            </li>
                            <li>
                              Affidavit of loss (if lost ID) (Affidavit of loss
                              (kung nawala ang ID))
                            </li>
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    Issuance of Senior Citizen Identification Card
                  </Accordion.Header>
                  <Accordion.Body>
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          Who is considered under the law as a “Senior Citizen”?{" "}
                          <em>
                            (Sino ang itinuturing sa ilalim ng batas bilang
                            “Senior Citizen”?)
                          </em>
                        </Accordion.Header>
                        <Accordion.Body>
                          Senior Citizen shall mean any resident citizen of the
                          Philippines and at least 60 years of age and above{" "}
                          <em>
                            (Ang Senior Citizen ay nangangahulugang sinumang
                            residenteng mamamayan ng Pilipinas at hindi bababa
                            sa 60 taong gulang pataas)
                          </em>
                          <ol>
                            <li>
                              The grant of 20% discount from all the
                              establishments relative to the utilization of
                              services in hotels, restaurants and recreation
                              centers and purchase of medicines in all
                              establishments for the exclusive use or enjoyment
                              of Senior Citizens, including funeral and burials
                              services for the death of Senior Citizens.{" "}
                              <em>
                                (- Ang pagbibigay ng 20% na diskwento mula sa
                                lahat ng mga establisyimento na may kaugnayan sa
                                paggamit ng mga serbisyo sa mga hotel,
                                restaurant at recreation center at pagbili ng
                                mga gamot sa lahat ng mga establisyimento para
                                sa eksklusibong paggamit o kasiyahan ng mga
                                Senior Citizen, kabilang ang mga serbisyo sa
                                libing at libing para sa pagkamatay ng
                                Matatanda.)
                              </em>
                            </li>
                          </ol>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          How can I use the MSWD E-Services in securing Senior
                          Citizen I.D.?{" "}
                          <em>
                            (Paano ko gagamitin ang DSWD E-Services sa pagkuha
                            ng Senior Citizen ID?)
                          </em>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            <strong>Step 1: </strong>Applicant must register by
                            clicking the “Don't have an account? Register here!”
                            tab, follow the instructions.{" "}
                            <em>
                              (Magrehistro muna sa pamamagitan ng pag pindot ng
                              “Don't have an account? Register here!” tab,
                              sundin ang mga kailangan.)
                            </em>
                          </p>
                          <p>
                            <strong>Step 2: </strong>If applicant has
                            successfully registered, login and go to Senior
                            Citizen I.D. application form.{" "}
                            <em>
                              (Kapag nakapag registro na ang aplikante,
                              mag-login muna at pumunta sa Senior Citizen I.D.
                              Application Form.)
                            </em>
                          </p>
                          <p>
                            <strong>Step 3: </strong>Review the documents
                            required before proceeding.{" "}
                            <em>
                              (Suriing mabuti ang mga dokumentong kinakailangan
                              bago magpatuloy.)
                            </em>
                          </p>
                          <p>
                            <strong>Step 4: </strong>Fill up all required fields
                            in the Senior Citizen I.D. application form.{" "}
                            <em>
                              (Sagutan ang lahat ng kailangan sa Senior Citizen
                              I.D. application form.)
                            </em>
                          </p>
                          <p>
                            <strong>Step 5: </strong>Upload scanned copies of
                            required documents.{" "}
                            <em>
                              (Mag-upload ng mga na-scan na kopya ng mga
                              kinakailangang dokumento.)
                            </em>
                          </p>
                          <p>
                            <strong>Step 6: </strong>Check submitted
                            application.{" "}
                            <em>(Suriin ang pinunang aplikasyon.)</em>
                          </p>
                          <p>
                            <strong>Step 7: </strong>Applicant will receive
                            notification of the successful application of Senior
                            Citizen I.D. via email.{" "}
                            <em>
                              (Makakatanggap ng email ang aplikante na
                              matagumpay na aplikayson para sa Senior Citizen
                              I.D.)
                            </em>
                          </p>
                          <p>
                            <strong>Step 8: </strong>MSWD Staff will assess the
                            submitted online application.{" "}
                            <em>
                              (Susuriin ng MSWD Staff ang naisumiteng
                              aplikasyon.)
                            </em>
                          </p>
                          <p>
                            <strong>Step 9: </strong>Applicant will be able to
                            track their transaction by clicking the “Track my
                            application” tab in their dashboard.{" "}
                            <em>
                              (Magagawang subaybayan ng aplikante ang kanilang
                              transaksyon sa pamamagitan ng pag-click sa tab na
                              "Track my application" sa kanilang dashboard.)
                            </em>
                          </p>
                          <p>
                            <strong>Step 10: </strong>Applicant will receive
                            notification if his/her Senior Citizen I.D. are
                            ready to release.{" "}
                            <em>
                              (Makakatanggap ang aplikante ng abiso kung ang
                              kanyang Senior Citizen I.D. ay handa at maari ng
                              kuhain.)
                            </em>
                          </p>
                          <p>
                            <strong>Step 11: </strong>Applicant will proceed to
                            MSWD office in San Rafael Bulacan to claim his/her
                            Senior Citizen I.D. after they receive notification.{" "}
                            <em>
                              (Magpunta sa MSWD Office of San Rafael Bulacan
                              para kunin ang Senior Citizen I.D. pagkatapos
                              matanggap ang abiso.)
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
                          What do I need before I apply?{" "}
                          <em>
                            (Ano ang mga kailangan ko bago ako mag-apply?)
                          </em>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            The requirements needed to obtain Senior Citizen
                            I.D.{" "}
                            <em>
                              (Ang mga kinakailangan upang makakuha ng Senior
                              Citizen I.D.)
                            </em>
                          </p>
                          <ul>
                            <li>
                              Photocopy - Valid ID with birthday and address in
                              San Rafael (Voters, SSS/UMID, LTO, Passport){" "}
                              <em>
                                (Photocopy - Valid ID na may kaarawan at address
                                sa San Rafael (Mga Botante, SSS/UMID, LTO,
                                Pasaporte)
                              </em>
                            </li>
                            <li>
                              2pcs latest 1x1 colored ID picture in white
                              background{" "}
                              <em>
                                (2pcs pinakabagong 1x1 colored ID picture na
                                nakaputing background)
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
                                  birth certificate{" "}
                                  <em>(sertipiko ng kapanganakan)</em>
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
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    Issuance of Person with Disabilities (PWD) Identification
                    Card
                  </Accordion.Header>
                  <Accordion.Body>
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          Who is considered under the law as a “PWD or Person
                          with Disabilities"?{" "}
                          <em>
                            (Sino ang itinuturing sa ilalim ng batas bilang "PWD
                            or Person with Disabilities"?)
                          </em>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            Persons with Disabilities are those suffering from
                            restriction of different abilities, as a result of a
                            mental, physical or sensory impairment, to perform
                            an activity in the manner or within the range
                            considered normal for a human being{" "}
                            <em>
                              (Ang mga taong may Kapansanan ay ang mga dumaranas
                              ng paghihigpit sa iba't ibang kakayahan, bilang
                              resulta ng kapansanan sa pag-iisip, pisikal o
                              pandama, upang magsagawa ng aktibidad sa paraang o
                              sa loob ng saklaw na itinuturing na normal para sa
                              isang tao.)
                            </em>
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          How can I use the MSWD E-Services in securing PWD I.D.
                          or Person with Disabilities I.D.?{" "}
                          <em>
                            (Paano ko gagamitin ang DSWD E-Services sa pagkuha
                            ng PWD I.D. o Person with Disabilities I.D.?)
                          </em>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            <strong>Step 1: </strong>Applicant must register by
                            clicking the “Don't have an account? Register here!”
                            tab, follow the instructions.{" "}
                            <em>
                              (Magrehistro muna sa pamamagitan ng pag pindot ng
                              “Don't have an account? Register here!” tab,
                              sundin ang mga kailangan.)
                            </em>
                          </p>

                          <p>
                            <strong>Step 2: </strong>If applicant has
                            successfully registered, login and go to Person with
                            Disabilities I.D. application form.{" "}
                            <em>
                              (Kapag nakapag registro na ang aplikante,
                              mag-login muna at pumunta sa Person with
                              Disabilities I.D. Application Form.)
                            </em>
                          </p>

                          <p>
                            <strong>Step 3: </strong>Review the documents
                            required before proceeding.{" "}
                            <em>
                              (Suriing mabuti ang mga dokumentong kinakailangan
                              bago magpatuloy.)
                            </em>
                          </p>

                          <p>
                            <strong>Step 4: </strong>Fill up all required fields
                            in the Person with Disabilities I.D. application
                            form.{" "}
                            <em>
                              (Sagutan ang lahat ng kailangan sa Person with
                              Disabilities I.D. application form.)
                            </em>
                          </p>

                          <p>
                            <strong>Step 5: </strong>Upload scanned copies of
                            required documents.{" "}
                            <em>
                              (Mag-upload ng mga na-scan na kopya ng mga
                              kinakailangang dokumento.)
                            </em>
                          </p>

                          <p>
                            <strong>Step 6: </strong>Check submitted
                            application.{" "}
                            <em>(Suriin ang pinunang aplikasyon.)</em>
                          </p>

                          <p>
                            <strong>Step 7: </strong>Applicant will receive
                            notification of the successful application Person
                            with Disabilities I.D. via email.{" "}
                            <em>
                              (Makakatanggap ng email ang aplikante na
                              matagumpay na aplikayson para sa Person with
                              Disabilities I.D.)
                            </em>
                          </p>

                          <p>
                            <strong>Step 8: </strong>MSWD Staff will assess the
                            submitted online application.{" "}
                            <em>
                              (Susuriin ng MSWD Staff ang naisumiteng
                              aplikasyon.)
                            </em>
                          </p>

                          <p>
                            <strong>Step 9: </strong>Applicant will be able to
                            track their transaction by clicking the “Track my
                            application” tab in their dashboard.{" "}
                            <em>
                              (Magagawang subaybayan ng aplikante ang kanilang
                              transaksyon sa pamamagitan ng pag-click sa tab na
                              "Track my application" sa kanilang dashboard.)
                            </em>
                          </p>

                          <p>
                            <strong>Step 10: </strong>Applicant will receive
                            notification if his/her Person with Disabilities
                            I.D. are ready to release.{" "}
                            <em>
                              (Makakatanggap ang aplikante ng abiso kung ang
                              kanyang Person with Disabilities I.D. ay handa at
                              maari ng kuhain.)
                            </em>
                          </p>

                          <p>
                            <strong>Step 11: </strong>Applicant will proceed to
                            MSWD office in San Rafael Bulacan to claim his/
                            Person with Disabilities I.D. after they receive
                            notification.{" "}
                            <em>
                              (Magpunta sa MSWD Office of San Rafael Bulacan
                              para kunin ang Person with Disabilities I.D.
                              pagkatapos matanggap ang abiso.)
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
                          What do I need before I apply?{" "}
                          <em>
                            (Ano ang mga kailangan ko bago ako mag-apply?)
                          </em>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            The requirements needed to obtain Person with
                            Disabilities I.D.{" "}
                            <em>
                              (Ang mga kinakailangan upang makakuha ng Person
                              with Disabilities I.DD.)
                            </em>
                          </p>
                          <ul>
                            <li>
                              MEDICAL CERTIFICATE INDICATING DISABILITY{" "}
                              <em>
                                (MEDICAL CERTIFICATE NA NAGPAPAHAYAG NG
                                DISABILIDAD)
                              </em>
                            </li>
                            <li>2PCS 1X1 ID PICTURE</li>
                            <li>
                              BLOOD TYPE <em>(Uri ng iyong dugo)</em>
                            </li>
                            <li>
                              Affidavit of loss (if lost ID) (Affidavit of loss
                              (kung nawala ang ID))
                            </li>
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Row className="mt-3">
                <Col md={12} className="text-center">
                  <Button size="lg" href="/eservices">
                    Go to eServices
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg={3}>
            <Card className="p-3 mb-3">
              <h5 style={{ textTransform: "uppercase", textAlign: "left" }}>
                Inquire
              </h5>

              <ContactForm />
            </Card>
            <Card className="p-3" style={{ textAlign: "left" }}>
              <strong>You may reach us</strong>
              <ul>
                <li>Contact Number: (+63) 922-564-5695</li>
                <li>Email Address: mswdosanrafaelbulacan@gmail.com</li>
                <li>
                  Location: Maharlika Highway, Brgy. Sampaloc, San Rafael
                  Bulacan.
                </li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
