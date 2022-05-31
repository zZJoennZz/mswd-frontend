import React from "react";
import {
  Alert,
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Tab,
  Tabs,
  Card,
  Modal,
  Accordion,
} from "react-bootstrap";
import axios from "axios";

//images
import spImg from "../img/solo-parent-icon.jpg";
import pwdImg from "../img/pwd-icon.png";
import scImg from "../img/senior-citizen-icon.png";
import mswdoImg from "../img/mswdo-logo.png";

//components
import Apply from "../components/Apply";
import UserHistory from "../components/UserHistory";

const EServices = () => {
  const [loginShowPass, setLoginShowPass] = React.useState(false);
  const [registerShowPass, setRegisterShowPass] = React.useState(false);
  let [isLoading, setIsLoading] = React.useState(true);
  let [message, setMessage] = React.useState("");
  let [isAuth, setIsAuth] = React.useState(false);
  let [currentUser, setCurrentUser] = React.useState("");
  let [currentLastName, setCurrentLastName] = React.useState("");
  let [currentEmail, setCurrentEmail] = React.useState("");
  let [formMode, setFormMode] = React.useState(0);
  let [frmData, setFrmData] = React.useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });
  let [selectedIdType, setSelectedIdType] = React.useState(0);
  let [agreeCheck, setAgreeCheck] = React.useState(false);

  let [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const changeFrmMode = () => {
    if (formMode === 0) {
      setMessage("Please use your active email address!");
    } else {
      setMessage("");
    }
    setFrmData({
      name: "",
      last_name: "",
      email: "",
      password: "",
    });
    setFormMode(formMode === 0 ? 1 : 0);
  };

  const onChangeText = (e) =>
    setFrmData({ ...frmData, [e.target.name]: e.target.value });

  const userLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let headers = {
      Authorization: localStorage.getItem("token"),
      Accept: "application/json",
      "Content-Type": "application/json",
      "Allow-Control-Allow-Origin": "*",
    };

    await axios
      .post(`${process.env.REACT_APP_API}signin`, frmData, { headers })
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        setIsAuth(true);
        window.location.reload();
      })
      .catch((err) => {
        localStorage.removeItem("token");
        setMessage("Invalid login!");
        setIsAuth(false);
      });
    setIsLoading(false);
  };

  const logOut = async () => {
    let headers = {
      Authorization: localStorage.getItem("token"),
      Accept: "application/json",
      "Content-Type": "application/json",
      "Allow-Control-Allow-Origin": "*",
    };
    setIsLoading(true);
    await axios
      .post(`${process.env.REACT_APP_API}signout`, null, { headers })
      .then((res) => {
        localStorage.removeItem("token");
        setCurrentUser("");
        setCurrentLastName("");
        setCurrentEmail("");
        setIsAuth(false);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("Something went wrong! Please refresh the page.");
      });
  };

  const selectIdType = (type) => {
    setSelectedIdType(type);
  };

  const resetSelectIdType = () => {
    setSelectedIdType(0);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    let headers = {
      Authorization: localStorage.getItem("token"),
      Accept: "application/json",
      "Content-Type": "application/json",
      "Allow-Control-Allow-Origin": "*",
    };

    try {
      await axios
        .put(`${process.env.REACT_APP_API}updateprofile`, frmData, { headers })
        .then((res) => {
          alert("Changes saved!");
          setCurrentUser(frmData.name);
          setCurrentLastName(frmData.last_name);
          setCurrentEmail(frmData.email);
        })
        .catch((err) => {
          alert(
            "Something went wrong! Please refresh the page. If the problem persists, contact us!"
          );
        });
    } catch (error) {
      alert(
        "Something went wrong! Please refresh the page. If the problem persists, contact us!"
      );
    }
  };

  const registerUser = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let headers = {
      Authorization: localStorage.getItem("token"),
      Accept: "application/json",
      "Content-Type": "application/json",
      "Allow-Control-Allow-Origin": "*",
    };

    try {
      await axios
        .post(`${process.env.REACT_APP_API}register`, frmData, { headers })
        .then((res) => {
          alert("Register success!");
          localStorage.removeItem("token");
          localStorage.setItem("token", `Bearer ${res.data.token}`);
          setIsAuth(true);
          window.location.reload();
        })
        .catch((err) => {
          alert("Email already in used!");
        });
    } catch (error) {
      alert(
        "Something went wrong! Please refresh the page. If the problem persists, contact us!"
      );
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    const validateUser = async () => {
      setIsLoading(true);
      let headers = {
        Authorization: localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*",
      };
      await axios
        .post(`${process.env.REACT_APP_API}validate-user`, null, { headers })
        .then((res) => {
          setIsAuth(true);
          setCurrentUser(res.data.name);
          setCurrentLastName(res.data.last_name);
          setCurrentEmail(res.data.email);
        })
        .catch((err) => {
          setMessage("You need to login!");
          setIsAuth(false);
        });
      setIsLoading(false);
    };

    validateUser();
  }, [isAuth]);

  if (isLoading) {
    return (
      <Container>
        <Row style={{ padding: "30vh 0" }}>
          <Col lg={12}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!isAuth) {
    return (
      <Container>
        <Row className="mt-5" style={{ minHeight: "60vh" }}>
          {formMode === 3 ? (
            <>
              <Col lg={1}></Col>
              <Col lg={10}>
                <Card className="p-3 mb-5 text-start">
                  <Card className="mb-3" border="primary">
                    <Card.Header>
                      <h2 className="text-uppercase">
                        Application for Identification Card of Solo Parent
                      </h2>
                    </Card.Header>

                    <Card.Body className="p-3 mb-3">
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
                            <ul>
                              <li>
                                A woman who gives birth as a result of rape and
                                other crimes against chastity even without a
                                final conviction of the offender: Provided, That
                                the mother keeps and raises the child;{" "}
                                <em>
                                  (Isang babae na nanganak bilang resulta ng
                                  panggagahasa at iba pang mga krimen laban sa
                                  kalinisang-puri kahit na walang huling hatol
                                  sa nagkasala: Sa kondisyon, Na ang ina ay
                                  nag-iingat at nagpalaki sa bata;)
                                </em>
                              </li>
                              <li>
                                Parent left solo or alone with the
                                responsibility of parenthood due to death of
                                spouse;{" "}
                                <em>
                                  (Ang magulang ay naiwan nang mag-isa o
                                  nag-iisa sa responsibilidad ng pagiging
                                  magulang dahil sa pagkamatay ng asawa;)
                                </em>
                              </li>
                              <li>
                                Parent left solo or alone with the
                                responsibility of parenthood while the spouse is
                                detained or is serving sentence for a criminal
                                conviction for at least one year;{" "}
                                <em>
                                  (Ang magulang ay naiwan nang mag-isa o
                                  nag-iisa na may pananagutan sa pagiging
                                  magulang habang ang asawa ay nakakulong o
                                  nagsisilbing sentensiya para sa isang kriminal
                                  na paghatol nang hindi bababa sa isang taon;)
                                </em>
                              </li>
                              <li>
                                Parent left solo or alone with the
                                responsibility of parenthood due to physical
                                and/or mental incapacity of spouse as certified
                                by a public medical practitioner;{" "}
                                <em>
                                  (Ang magulang ay naiwan nang mag-isa o
                                  nag-iisa na may pananagutan sa pagiging
                                  magulang dahil sa pisikal at/o mental na
                                  kawalan ng kakayahan ng asawa bilang
                                  sertipikado ng isang pampublikong medikal na
                                  practitioner;)
                                </em>
                              </li>
                              <li>
                                Parent left solo or alone with the
                                responsibility of parenthood due to legal
                                separation or de facto separation from spouse
                                for at least one year, as long as he/she is
                                entrusted with the custody of the children;{" "}
                                <em>
                                  (Ang magulang ay naiwan nang mag-isa o
                                  nag-iisa sa responsibilidad ng pagiging
                                  magulang dahil sa legal na paghihiwalay o de
                                  facto na paghihiwalay sa asawa nang hindi
                                  bababa sa isang taon, hangga't ipinagkatiwala
                                  sa kanya ang pangangalaga ng mga anak;)
                                </em>
                              </li>
                              <li>
                                Parent left solo or alone with the
                                responsibility of parenthood due to declaration
                                of nullity or annulment of marriage as decreed
                                by a court or by a church as long as he or she
                                is entrusted with the custody of the children;{" "}
                                <em>
                                  (Ang magulang ay naiwan nang mag-isa o
                                  nag-iisa sa pananagutan ng pagiging magulang
                                  dahil sa deklarasyon ng pagpapawalang bisa o
                                  pagpapawalang-bisa ng kasal ayon sa
                                  ipinag-utos ng korte o ng simbahan hangga't
                                  ipinagkatiwala sa kanya ang pangangalaga ng
                                  mga anak;)
                                </em>
                              </li>
                              <li>
                                Parent left solo or alone with the
                                responsibility of parenthood due to abandonment
                                of spouse for at least one year;{" "}
                                <em>
                                  (Ang magulang ay umalis na nag-iisa o nag-iisa
                                  sa responsibilidad ng pagiging magulang dahil
                                  sa pag-abandona ng asawa nang hindi bababa sa
                                  isang taon;)
                                </em>
                              </li>
                              <li>
                                Unmarried mother or father who has preferred to
                                keep and rear the child or children instead of
                                having others care for them or give them up to a
                                welfare institution;{" "}
                                <em>
                                  (Walang asawa na ina o ama na mas piniling
                                  panatilihin at palakihin ang anak o mga anak
                                  sa halip na alagaan sila ng iba o ibigay sila
                                  sa isang institusyong pangkapakanan;)
                                </em>
                              </li>
                              <li>
                                Any other person who solely provides parental
                                care and support to a child or children;{" "}
                                <em>
                                  (Sinumang ibang tao na tanging nagbibigay ng
                                  pangangalaga at suporta ng magulang sa isang
                                  bata o mga anak;)
                                </em>
                              </li>
                              <li>
                                Any family member who assumes the responsibility
                                of head of family as a result of the death,
                                abandonment, disappearance or prolonged absence
                                of the parents or solo parent.{" "}
                                <em>
                                  (Sinumang miyembro ng pamilya na umaako sa
                                  responsibilidad ng ulo ng pamilya bilang
                                  resulta ng pagkamatay, pag-abandona, pagkawala
                                  o matagal na pagkawala ng mga magulang o
                                  solong magulang.)
                                </em>
                              </li>
                            </ul>
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
                              <strong>Step 1: </strong>Applicant must register
                              by clicking the “Don't have an account? Register
                              here!” tab, follow the instructions.{" "}
                              <em>
                                (Magrehistro muna sa pamamagitan ng pag pindot
                                ng “Don't have an account? Register here!” tab,
                                sundin ang mga kailangan.)
                              </em>
                            </p>
                            <p>
                              <strong>Step 2: </strong>If applicant has
                              successfully registered, login and go to Solo
                              Parent I.D. application form.{" "}
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
                                (Suriing mabuti ang mga dokumentong
                                kinakailangan bago magpatuloy.)
                              </em>
                            </p>
                            <p>
                              <strong>Step 4: </strong>Fill up all required
                              fields in the Solo Parent I.D. application form.{" "}
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
                                matagumpay na aplikayson para sa Solo Parent
                                I.D.)
                              </em>
                            </p>
                            <p>
                              <strong>Step 8: </strong>MSWD Staff will assess
                              the submitted online application.{" "}
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
                                transaksyon sa pamamagitan ng pag-click sa tab
                                na "Track my application" sa kanilang
                                dashboard.)
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
                              <strong>Step 11: </strong>Applicant will proceed
                              to MSWD office in San Rafael Bulacan to claim
                              his/her Solo Parent I.D after they receive
                              notification.{" "}
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
                            What is the Schedule of Availability of Service?{" "}
                            <em>(Ano ang iskedyul ng serbisyo?) </em>
                          </Accordion.Header>
                          <Accordion.Body>
                            <ul>
                              <li>
                                The online application for Solo Parent I.D. is
                                only available for residents of San Rafael
                                Bulacan{" "}
                                <em>
                                  (Ang online na aplikasyon para sa Solo Parent
                                  I.D. ay magagamit lamang para sa mga residente
                                  ng San Rafael Bulacan.)
                                </em>
                              </li>
                              <li>
                                Your application will only be processed during
                                office hours, Monday to Friday, 8:00am - 5:00pm
                                without noon break.{" "}
                                <em>
                                  (Ang inyong aplikasyon ay ipoproseso lamang
                                  mula Lunes hanggang Biyernes, 8:00 ng umaga -
                                  5:00 ng hapon.)
                                </em>
                              </li>
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                          <Accordion.Header>
                            How much is the processing fee in securing Solo
                            Parent I.D.?{" "}
                            <em>
                              (Magkano ang bayad sa pagpoproseso ng Solo Parent
                              I.D.?)
                            </em>
                          </Accordion.Header>
                          <Accordion.Body>
                            <ul>
                              <li>NONE REQUIRED FEES</li>
                            </ul>
                            <p>
                              The MSWD shall not collect any processing fee for
                              securing Solo Parent I.D.{" "}
                              <em>
                                (Ang MSWD ay hindi mangongolekta ng anumang
                                bayad sa pagproseso para sa pagkuha ng Solo
                                Parent I.D.)
                              </em>
                            </p>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
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
                                  (Solo parent certificate mula sa barangay
                                  (kung hiwalay))
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
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3" border="primary">
                    <Card.Header>
                      <h2 className="text-uppercase">
                        Application for Identification Card of Senior Citizen
                      </h2>
                    </Card.Header>

                    <Card.Body className="p-3 mb-3">
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            Who is considered under the law as a “Senior
                            Citizen”?{" "}
                            <em>
                              (Sino ang itinuturing sa ilalim ng batas bilang
                              “Senior Citizen”?)
                            </em>
                          </Accordion.Header>
                          <Accordion.Body>
                            Senior Citizen shall mean any resident citizen of
                            the Philippines and at least 60 years of age and
                            above{" "}
                            <em>
                              (Ang Senior Citizen ay nangangahulugang sinumang
                              residenteng mamamayan ng Pilipinas at hindi bababa
                              sa 60 taong gulang pataas)
                            </em>
                            <ul>
                              <li>
                                The grant of 20% discount from all the
                                establishments relative to the utilization of
                                services in hotels, restaurants and recreation
                                centers and purchase of medicines in all
                                establishments for the exclusive use or
                                enjoyment of Senior Citizens, including funeral
                                and burials services for the death of Senior
                                Citizens.{" "}
                                <em>
                                  (- Ang pagbibigay ng 20% na diskwento mula sa
                                  lahat ng mga establisyimento na may kaugnayan
                                  sa paggamit ng mga serbisyo sa mga hotel,
                                  restaurant at recreation center at pagbili ng
                                  mga gamot sa lahat ng mga establisyimento para
                                  sa eksklusibong paggamit o kasiyahan ng mga
                                  Senior Citizen, kabilang ang mga serbisyo sa
                                  libing at libing para sa pagkamatay ng
                                  Matatanda.)
                                </em>
                              </li>
                            </ul>
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
                              <strong>Step 1: </strong>Applicant must register
                              by clicking the “Don't have an account? Register
                              here!” tab, follow the instructions.{" "}
                              <em>
                                (Magrehistro muna sa pamamagitan ng pag pindot
                                ng “Don't have an account? Register here!” tab,
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
                                (Suriing mabuti ang mga dokumentong
                                kinakailangan bago magpatuloy.)
                              </em>
                            </p>
                            <p>
                              <strong>Step 4: </strong>Fill up all required
                              fields in the Senior Citizen I.D. application
                              form.{" "}
                              <em>
                                (Sagutan ang lahat ng kailangan sa Senior
                                Citizen I.D. application form.)
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
                              notification of the successful application of
                              Senior Citizen I.D. via email.{" "}
                              <em>
                                (Makakatanggap ng email ang aplikante na
                                matagumpay na aplikayson para sa Senior Citizen
                                I.D.)
                              </em>
                            </p>
                            <p>
                              <strong>Step 8: </strong>MSWD Staff will assess
                              the submitted online application.{" "}
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
                                transaksyon sa pamamagitan ng pag-click sa tab
                                na "Track my application" sa kanilang
                                dashboard.)
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
                              <strong>Step 11: </strong>Applicant will proceed
                              to MSWD office in San Rafael Bulacan to claim
                              his/her Senior Citizen I.D. after they receive
                              notification.{" "}
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
                            What is the Schedule of Availability of Service?{" "}
                            <em>(Ano ang iskedyul ng serbisyo?) </em>
                          </Accordion.Header>
                          <Accordion.Body>
                            <ul>
                              <li>
                                The online application for Senior Citizen I.D.
                                is only available for residents of San Rafael
                                Bulacan{" "}
                                <em>
                                  (Ang online na aplikasyon para sa Senior
                                  Citizen I.D. ay magagamit lamang para sa mga
                                  residente ng San Rafael Bulacan.)
                                </em>
                              </li>
                              <li>
                                Your application will only be processed during
                                office hours, Monday to Friday, 8:00am – 5:00pm
                                without noon break.{" "}
                                <em>
                                  (Ang inyong aplikasyon ay ipoproseso lamang
                                  mula Lunes hanggang Biyernes, 8:00 ng umaga –
                                  5:00 ng hapon.)
                                </em>
                              </li>
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                          <Accordion.Header>
                            How much is the processing fee in securing Senior
                            Citizen I.D.?{" "}
                            <em>
                              (Magkano ang bayad sa pagpoproseso ng Senior
                              Citizen I.D.?)
                            </em>
                          </Accordion.Header>
                          <Accordion.Body>
                            <ul>
                              <li>NONE REQUIRED FEES</li>
                            </ul>
                            <p>
                              The MSWD shall not collect any processing fee for
                              securing Senior Citizen I.D.{" "}
                              <em>
                                (Ang MSWD ay hindi mangongolekta ng anumang
                                bayad sa pagproseso para sa pagkuha ng Senior
                                Citizen I.D.)
                              </em>
                            </p>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
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
                                Photocopy - Valid ID with birthday and address
                                in San Rafael (Voters, SSS/UMID, LTO, Passport){" "}
                                <em>
                                  (Photocopy - Valid ID na may kaarawan at
                                  address sa San Rafael (Mga Botante, SSS/UMID,
                                  LTO, Pasaporte)
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
                                <em>
                                  (Affidavit of loss (kung nawala ang ID))
                                </em>
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
                    </Card.Body>
                  </Card>

                  <Card border="primary">
                    <Card.Header>
                      <h2 className="text-uppercase">
                        Application for Identification Card of Persons with
                        Disability
                      </h2>
                    </Card.Header>
                    <Card.Body className="mb-3 p-3">
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            Who is considered under the law as a “PWD or Person
                            with Disabilities"?{" "}
                            <em>
                              (Sino ang itinuturing sa ilalim ng batas bilang
                              "PWD or Person with Disabilities"?)
                            </em>
                          </Accordion.Header>
                          <Accordion.Body>
                            <p>
                              Persons with Disabilities are those suffering from
                              restriction of different abilities, as a result of
                              a mental, physical or sensory impairment, to
                              perform an activity in the manner or within the
                              range considered normal for a human being{" "}
                              <em>
                                (Ang mga taong may Kapansanan ay ang mga
                                dumaranas ng paghihigpit sa iba't ibang
                                kakayahan, bilang resulta ng kapansanan sa
                                pag-iisip, pisikal o pandama, upang magsagawa ng
                                aktibidad sa paraang o sa loob ng saklaw na
                                itinuturing na normal para sa isang tao.)
                              </em>
                            </p>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>
                            How can I use the MSWD E-Services in securing PWD
                            I.D. or Person with Disabilities I.D.?{" "}
                            <em>
                              (Paano ko gagamitin ang DSWD E-Services sa pagkuha
                              ng PWD I.D. o Person with Disabilities I.D.?)
                            </em>
                          </Accordion.Header>
                          <Accordion.Body>
                            <p>
                              <strong>Step 1: </strong>Applicant must register
                              by clicking the “Don't have an account? Register
                              here!” tab, follow the instructions.{" "}
                              <em>
                                (Magrehistro muna sa pamamagitan ng pag pindot
                                ng “Don't have an account? Register here!” tab,
                                sundin ang mga kailangan.)
                              </em>
                            </p>

                            <p>
                              <strong>Step 2: </strong>If applicant has
                              successfully registered, login and go to Person
                              with Disabilities I.D. application form.{" "}
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
                                (Suriing mabuti ang mga dokumentong
                                kinakailangan bago magpatuloy.)
                              </em>
                            </p>

                            <p>
                              <strong>Step 4: </strong>Fill up all required
                              fields in the Person with Disabilities I.D.
                              application form.{" "}
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
                              <strong>Step 8: </strong>MSWD Staff will assess
                              the submitted online application.{" "}
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
                                transaksyon sa pamamagitan ng pag-click sa tab
                                na "Track my application" sa kanilang
                                dashboard.)
                              </em>
                            </p>

                            <p>
                              <strong>Step 10: </strong>Applicant will receive
                              notification if his/her Person with Disabilities
                              I.D. are ready to release.{" "}
                              <em>
                                (Makakatanggap ang aplikante ng abiso kung ang
                                kanyang Person with Disabilities I.D. ay handa
                                at maari ng kuhain.)
                              </em>
                            </p>

                            <p>
                              <strong>Step 11: </strong>Applicant will proceed
                              to MSWD office in San Rafael Bulacan to claim his/
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
                            What is the Schedule of Availability of Service?{" "}
                            <em>(Ano ang iskedyul ng serbisyo?) </em>
                          </Accordion.Header>
                          <Accordion.Body>
                            <ul>
                              <li>
                                The online application for Person with
                                Disabilities I.D. is only available for
                                residents of San Rafael Bulacan{" "}
                                <em>
                                  (Ang online na aplikasyon para sa Person with
                                  Disabilities I.D. ay magagamit lamang para sa
                                  mga residente ng San Rafael Bulacan.)
                                </em>
                              </li>
                              <li>
                                Your application will only be processed during
                                office hours, Monday to Friday, 8:00am - 5:00pm
                                without noon break.{" "}
                                <em>
                                  (Ang inyong aplikasyon ay ipoproseso lamang
                                  mula Lunes hanggang Biyernes, 8:00 ng umaga -
                                  5:00 ng hapon.)
                                </em>
                              </li>
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                          <Accordion.Header>
                            How much is the processing fee in securing Solo
                            Parent I.D.?{" "}
                            <em>
                              (Magkano ang bayad sa pagpoproseso ng Solo Parent
                              I.D.?)
                            </em>
                          </Accordion.Header>
                          <Accordion.Body>
                            <ul>
                              <li>NONE REQUIRED FEES</li>
                            </ul>
                            <p>
                              The MSWD shall not collect any processing fee for
                              securing Person with Disabilities I.D.{" "}
                              <em>
                                (Ang MSWD ay hindi mangongolekta ng anumang
                                bayad sa pagproseso para sa pagkuha ng Person
                                with Disabilities I.D.)
                              </em>
                            </p>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
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
                                with Disabilities I.D.)
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
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </Card.Body>
                  </Card>
                  <Row className="mt-3 text-center">
                    <Col lg={6}>
                      <Button variant="primary" onClick={(e) => setFormMode(1)}>
                        Don't have an account? Register here!
                      </Button>
                    </Col>
                    <Col lg={6}>
                      <Button variant="success" onClick={(e) => setFormMode(0)}>
                        Already have an account? Log in here!
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col lg={1}></Col>
            </>
          ) : (
            <>
              <Col md={4}></Col>
              <Col className="text-start" lg={4}>
                <Card className="p-3 mb-5">
                  <img
                    src={mswdoImg}
                    className="mb-3"
                    width="100%"
                    alt="MSWDO Logo"
                  />
                  {message !== "" ? (
                    <Alert variant="primary">{message}</Alert>
                  ) : (
                    ""
                  )}

                  {formMode === 0 ? (
                    <div>
                      <h2>Login</h2>
                      <Form onSubmit={userLogin} className="mb-3">
                        <Form.Group className="mb-3">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            required
                            value={frmData.email}
                            autoComplete="current-username"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={onChangeText}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Password</Form.Label>{" "}
                          <span
                            className="small text-primary"
                            style={{ cursor: "pointer" }}
                            onClick={() => setLoginShowPass(!loginShowPass)}
                          >
                            {loginShowPass ? "Hide password" : "Show password"}
                          </span>
                          <Form.Control
                            required
                            value={frmData.password}
                            autoComplete="current-password"
                            type={loginShowPass ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Password"
                            onChange={onChangeText}
                          />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </Form>
                      <small
                        style={{ cursor: "pointer" }}
                        onClick={changeFrmMode}
                      >
                        Don't have an account? Register here!
                      </small>
                    </div>
                  ) : (
                    <div>
                      <h2>Register an account</h2>
                      <Form onSubmit={registerUser} className="mb-3">
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <div className="float-end fst-italic">(Pangalan)</div>
                          <Form.Control
                            value={frmData.name}
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter first name"
                            onChange={onChangeText}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <div className="float-end fst-italic">(Apelyido)</div>
                          <Form.Control
                            value={frmData.last_name}
                            id="last_name"
                            name="last_name"
                            type="text"
                            placeholder="Enter last name"
                            onChange={onChangeText}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Email address</Form.Label>
                          <div className="float-end fst-italic">
                            (Valid Email Only)
                          </div>
                          <Form.Control
                            value={frmData.email}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            onChange={onChangeText}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Password</Form.Label>{" "}
                          <span
                            className="small text-primary"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setRegisterShowPass(!registerShowPass)
                            }
                          >
                            {registerShowPass
                              ? "Hide password"
                              : "Show password"}
                          </span>
                          <Form.Control
                            value={frmData.password}
                            id="password"
                            name="password"
                            type={registerShowPass ? "text" : "password"}
                            placeholder="Password"
                            onChange={onChangeText}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col sm={1}>
                              <Form.Check
                                type="checkbox"
                                onChange={(e) => setAgreeCheck(!agreeCheck)}
                              />
                            </Col>
                            <Col sm={11}>
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
                        <Button
                          variant="primary"
                          type="submit"
                          disabled={!agreeCheck}
                        >
                          Register
                        </Button>
                      </Form>
                      <small
                        style={{ cursor: "pointer" }}
                        onClick={changeFrmMode}
                      >
                        Already have an account? Login here!
                      </small>
                    </div>
                  )}
                </Card>
              </Col>
              <Col md={4}></Col>
            </>
          )}
        </Row>
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
              account matters on our site in which you have expressed interest.
              By signing up you agree to:
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
                password and account, and are fully responsible for all
                activities that occur under your password or account;
              </li>
            </ol>
            <h4>Coverage of Service</h4>
            <p>
              The MSWDO San Rafael, Bulacan eServices covers the online and
              mobile applications, processing and approvals of the following
              frontline services: Travel Clearance for Minors Travelling Abroad
              (MTA) and Registration, Licensing and Accreditation (RLA) of
              Social Welfare and Development Agencies and Service Providers.
            </p>
            <h4>Information Collection, Use, and Sharing</h4>
            <p>
              We are the sole owners of the information collected on this site.
              We only have access to/collect information that you voluntarily
              give us via the modules of this website or other direct contact
              from you. We will not sell or rent this information to anyone. All
              of the provisions in the Data Privacy Act will be observed
              specifically on the management of personal identifiable
              information.
            </p>
            <p>
              We will use your information to respond to you, regarding the
              services that you require. We will not share your information with
              any third party outside of our organization, other than as
              necessary to fulfill your requested services. The DSWD however
              reserves the right to request the applicants to submit the
              hardcopy of documentary requirements in order to verify the
              authenticity of the information;
            </p>
            <p>
              Unless you ask us not to, we may contact you via email or SMS in
              the future to tell you about the status of your
              transaction/service request or changes to this privacy policy.
            </p>
            <h4>Security</h4>
            <p>
              We take precautions to protect your information. When you submit
              sensitive information via the website, your information is
              protected both online and offline. Wherever we collect sensitive
              information (such as passport and Birth Certificates), that
              information is encrypted and transmitted to us in a secure way.
              You can verify this by looking for a lock icon in the address bar
              and looking for "https" at the beginning of the address of the Web
              page.
            </p>
            <p>
              While we use encryption to protect sensitive information
              transmitted online, we also protect your information offline. Only
              employees who need the information to perform a specific job (for
              example, certificate printing or customer service) are granted
              access to personally identifiable information. The
              computers/servers in which we store personally identifiable
              information are kept in a secure environment.
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
      </Container>
    );
  }

  return (
    <Container style={{ minHeight: "65vh" }}>
      <Card className="mt-5 p-3 mb-5">
        <Row>
          <Col md={12} className="mb-3 text-start">
            Hello, <strong>{currentUser + " " + currentLastName}</strong>!
            <Button
              className="float-end"
              size="sm"
              variant="danger"
              onClick={logOut}
            >
              Logout
            </Button>
          </Col>
        </Row>

        <Tabs defaultActiveKey="application" className="mb-3">
          <Tab eventKey="application" title="Application">
            {selectedIdType === 0 ? (
              <>
                <Row>
                  <Col lg={12}>
                    <h2 className="text-start">Select</h2>
                  </Col>
                </Row>
                <Row className="pt-5">
                  <Col lg={4}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={selectIdType.bind(this, 1)}
                    >
                      <img
                        src={spImg}
                        alt="Solo Parent"
                        height="180px"
                        width="180px"
                        style={{ borderRadius: "5px" }}
                      />
                    </div>
                    <div>
                      <small>Solo Parent</small>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={selectIdType.bind(this, 2)}
                    >
                      <img
                        src={pwdImg}
                        alt="Person with Disabilities"
                        height="180px"
                        width="180px"
                      />
                    </div>
                    <div>
                      <small>Person with Disabilities</small>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={selectIdType.bind(this, 3)}
                    >
                      <img
                        src={scImg}
                        alt="Senior Citizen"
                        height="180px"
                        width="180px"
                      />
                    </div>
                    <div>
                      <small>Senior Citizen</small>
                    </div>
                  </Col>
                </Row>
              </>
            ) : (
              <Row>
                <Col lg={12}>
                  <Apply selId={selectedIdType} resetId={resetSelectIdType} />
                </Col>
              </Row>
            )}
          </Tab>
          <Tab eventKey="track" title="Track your applications">
            <UserHistory />
          </Tab>
          <Tab eventKey="profile" title="Profile">
            <Row className="text-start">
              <Col md={12}>
                <h2>Profile</h2>
                <div className="p-3">
                  <Form onSubmit={saveProfile}>
                    <Form.Group className="mb-3">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        defaultValue={currentUser}
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Full name"
                        onChange={onChangeText}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        defaultValue={currentLastName}
                        id="last_name"
                        name="last_name"
                        type="text"
                        placeholder="Full name"
                        onChange={onChangeText}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        defaultValue={currentEmail}
                        id="email"
                        name="email"
                        autoComplete="current-username"
                        type="email"
                        placeholder="Email address"
                        onChange={onChangeText}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        type="password"
                        placeholder="Password"
                        onChange={onChangeText}
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </Card>
    </Container>
  );
};

export default EServices;
