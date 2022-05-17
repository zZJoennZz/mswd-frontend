import React, { useState, useRef } from 'react';
import {
    Form,
    Button,
    Row,
    Col,
    Spinner,
    Accordion,
    Card
} from 'react-bootstrap';

import apifrm from '../api/apifrm';

import { barangays } from 'select-philippines-address';

const IdAppliSoloParent = ({ submitApplication }) => {
    let [frmData, setFrmData] = useState({'appliType': 1});
    let [pic, setPic] = useState(false);
    let [sig, setSig] = useState(false);
    let [docs, setDocs] = useState(false);
    let [agreeCheck, setAgreeCheck] = useState(true);
    let [fcHolder, setFcHolder] = useState({
        fc_name : '',
        fc_age : '',
        fc_bday : '',
        fc_mi : '',
        fc_rel : '',
        fc_status : ''
    });
    let [isSubmit, setIsSubmit] = useState(false);
    let [brgyList, setBrgyList] = useState(false);
    //let [famComp, setFamComp] = useState("");
    const famComRef = useRef('');

    const submitForm = async (e) => {
        setIsSubmit(true);
        e.preventDefault();
        
        try {
            let formData = new FormData();
            formData.append('application_data', JSON.stringify(frmData));
            formData.append('application_pic', pic[0]);
            formData.append('application_sig', sig[0]);
            for (let i = 0; i < docs.length; i++) {
                formData.append(`docs[${i}]`, docs[i])
            }

            let res = await apifrm.post("application/post", formData);
            submitApplication(res.data.application_id);
            setIsSubmit(false);
        } catch (error) {
            submitApplication("failed");
            alert(error + ". Please contact your website administrator.");
            setIsSubmit(false);
        }
    }

    const textOnChange = (e) => {
        setFrmData({...frmData, [e.target.name] : e.target.value});
    }

    const picOnChange = (e) => {
        setPic(e.target.files);
    }

    const sigOnChange = (e) => {
        setSig(e.target.files);
    }

    const docsOnChange = (e) => {
        setDocs(e.target.files);
    }

    const fcOnChange = (e) => setFcHolder({...fcHolder, [e.target.name] : e.target.value});

    const setFcField = () => {
        //setFamComp(famComp + fcHolder.fc_name + ',' + fcHolder.fc_rel + ',' + fcHolder.fc_age + ',' + fcHolder.fc_status + ',' + fcHolder.fc_bday + ',' + fcHolder.fc_mi + '\n');
    
        setFcHolder({
            fc_name : '',   
            fc_age : '',
            fc_bday : '',
            fc_mi : '',
            fc_rel : '',
            fc_status : ''
        });

        if (famComRef.current.value.trim() === "") {
            famComRef.current.value += fcHolder.fc_name + ',' + fcHolder.fc_rel + ',' + fcHolder.fc_age + ',' + fcHolder.fc_status + ',' + fcHolder.fc_bday + ',' + fcHolder.fc_mi;
        } else {
            famComRef.current.value += '\n' + fcHolder.fc_name + ',' + fcHolder.fc_rel + ',' + fcHolder.fc_age + ',' + fcHolder.fc_status + ',' + fcHolder.fc_bday + ',' + fcHolder.fc_mi;
        }
        
        
        setFrmData({...frmData, fam_composition: famComRef.current.value});
    }

    // const testBtn = (e) => {
    //     let lines = frmData.fam_composition.split('\n');
    //     for (let i = 0; i < lines.length; i++) {
    //         console.log(lines[i]);
    //     }
    // }

    React.useEffect(() => {
        let isMounted = true;

        barangays('031422').then((barangays) => {
            if (isMounted) {
                setBrgyList(barangays)
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div>
            <h2 className="text-uppercase mb-3">Application for Identification Card of Solo Parent</h2>
            
            <Card className="mb-5">
                <Card.Header><strong>Please read all of the requirements prior to your application <em>(Basahing mabuti bago mag fill-up ng application form)</em></strong></Card.Header>
                
                <Card.Body className="p-3 mb-3">
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Who is considered under the law as a “solo parent”? <em>(Sino ang itinuturing sa ilalim ng batas bilang "solo parent"?)</em></Accordion.Header>
                            <Accordion.Body>
                                Any individual who falls under any of the following categories is considered as a single parent: <em>(Sinumang indibidwal na nasa ilalim ng alinman sa mga sumusunod na kategorya ay itinuturing na isang solong magulang;)</em>
                                <ol>
                                    <li>A woman who gives birth as a result of rape and other crimes against chastity even without a final conviction of the offender: Provided, That the mother keeps and raises the child; <em>(Isang babae na nanganak bilang resulta ng panggagahasa at iba pang mga krimen laban sa kalinisang-puri kahit na walang huling hatol sa nagkasala: Sa kondisyon, Na ang ina ay nag-iingat at nagpalaki sa bata;)</em></li>
                                    <li>Parent left solo or alone with the responsibility of parenthood due to death of spouse; <em>(Ang magulang ay naiwan nang mag-isa o nag-iisa sa responsibilidad ng pagiging magulang dahil sa pagkamatay ng asawa;)</em></li>
                                    <li>Parent left solo or alone with the responsibility of parenthood while the spouse is detained or is serving sentence for a criminal conviction for at least one year; <em>(Ang magulang ay naiwan nang mag-isa o nag-iisa na may pananagutan sa pagiging magulang habang ang asawa ay nakakulong o nagsisilbing sentensiya para sa isang kriminal na paghatol nang hindi bababa sa isang taon;)</em></li>
                                    <li>Parent left solo or alone with the responsibility of parenthood due to physical and/or mental incapacity of spouse as certified by a public medical practitioner; <em>(Ang magulang ay naiwan nang mag-isa o nag-iisa na may pananagutan sa pagiging magulang dahil sa pisikal at/o mental na kawalan ng kakayahan ng asawa bilang sertipikado ng isang pampublikong medikal na practitioner;)</em></li>
                                    <li>Parent left solo or alone with the responsibility of parenthood due to legal separation or de facto separation from spouse for at least one year, as long as he/she is entrusted with the custody of the children; <em>(Ang magulang ay naiwan nang mag-isa o nag-iisa sa responsibilidad ng pagiging magulang dahil sa legal na paghihiwalay o de facto na paghihiwalay sa asawa nang hindi bababa sa isang taon, hangga't ipinagkatiwala sa kanya ang pangangalaga ng mga anak;)</em></li>
                                    <li>Parent left solo or alone with the responsibility of parenthood due to declaration of nullity or annulment of marriage as decreed by a court or by a church as long as he or she is entrusted with the custody of the children; <em>(Ang magulang ay naiwan nang mag-isa o nag-iisa sa pananagutan ng pagiging magulang dahil sa deklarasyon ng pagpapawalang bisa o pagpapawalang-bisa ng kasal ayon sa ipinag-utos ng korte o ng simbahan hangga't ipinagkatiwala sa kanya ang pangangalaga ng mga anak;)</em></li>
                                    <li>Parent left solo or alone with the responsibility of parenthood due to abandonment of spouse for at least one year; <em>(Ang magulang ay umalis na nag-iisa o nag-iisa sa responsibilidad ng pagiging magulang dahil sa pag-abandona ng asawa nang hindi bababa sa isang taon;)</em></li>
                                    <li>Unmarried mother or father who has preferred to keep and rear the child or children instead of having others care for them or give them up to a welfare institution; <em>(Walang asawa na ina o ama na mas piniling panatilihin at palakihin ang anak o mga anak sa halip na alagaan sila ng iba o ibigay sila sa isang institusyong pangkapakanan;)</em></li>
                                    <li>Any other person who solely provides parental care and support to a child or children; <em>(Sinumang ibang tao na tanging nagbibigay ng pangangalaga at suporta ng magulang sa isang bata o mga anak;)</em></li>
                                    <li>Any family member who assumes the responsibility of head of family as a result of the death, abandonment, disappearance or prolonged absence of the parents or solo parent. <em>(Sinumang miyembro ng pamilya na umaako sa responsibilidad ng ulo ng pamilya bilang resulta ng pagkamatay, pag-abandona, pagkawala o matagal na pagkawala ng mga magulang o solong magulang.)</em></li>
                                </ol>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                How can I use the MSWD E-Services in securing Solo Parent I.D.? <em>(Paano ko gagamitin ang DSWD E-Services sa pagkuha ng Solo Parent ID?)</em> 
                            </Accordion.Header>
                            <Accordion.Body>
                                <p><strong>Step 1: </strong>Review the documents required before proceeding. <em>(Suriing mabuti ang mga dokumentong kinakailangan bago magpatuloy.)</em></p>
                                <p><strong>Step 2: </strong>Fill up all required fields in the Solo Parent I.D. application form. <em>(Sagutan ang lahat ng kailangan sa Solo Parent I.D.  application form.)</em></p>
                                <p><strong>Step 3: </strong>Upload scanned copies of required documents. <em>(Mag-upload ng mga na-scan na kopya ng mga kinakailangang dokumento.)</em></p>
                                <p><strong>Step 4: </strong>Check submitted application. <em>(Suriin ang pinunang aplikasyon.)</em></p>
                                <p><strong>Step 5: </strong>Applicant will receive notification of the successful application of Solo Parent I.D. via email. <em>(Makakatanggap ng email ang aplikante na matagumpay na aplikayson para sa Solo Parent I.D.)</em></p>
                                <p><strong>Step 6: </strong>MSWD Staff will assess the submitted online application. <em>(Susuriin ng MSWD Staff ang naisumiteng aplikasyon.)</em></p>
                                <p><strong>Step 7: </strong>Applicant will be able to track their transaction by clicking the “Track my application” tab in their dashboard. <em>(Magagawang subaybayan ng aplikante ang kanilang transaksyon sa pamamagitan ng pag-click sa tab na "Track my application" sa kanilang dashboard.)</em></p>
                                <p><strong>Step 8: </strong>Applicant will receive notification if his/her Solo Parent I.D. are ready to release. <em>(Makakatanggap ang aplikante ng abiso kung ang kanyang Solo Parent I.D. ay handa at maari ng kuhain.)</em></p>
                                <p><strong>Step 9: </strong>Applicant will proceed to MSWD office in San Rafael Bulacan to claim his/her Solo Parent I.D after they receive notification. <em>(Magpunta sa MSWD Office of San Rafael Bulacan para kunin ang Solo Parent I.D. pagkatapos matanggap ang abiso.)</em></p>
                                <p className="text-center" style={{ textTransform: 'uppercase' }}>*** End of transaction ***</p>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                What is the Schedule of Availability of Service? <em>(Ano ang iskedyul ng serbisyo?) </em>
                            </Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    <li>The online application for Solo Parent I.D. is only available for residents of San Rafael Bulacan <em>(Ang online na aplikasyon para sa Solo Parent I.D. ay magagamit lamang para sa mga residente ng San Rafael Bulacan.)</em></li>
                                    <li>Your application will only be processed during office hours, Monday to Friday, 8:00am - 5:00pm without noon break. <em>(Ang inyong aplikasyon ay ipoproseso lamang mula Lunes hanggang Biyernes, 8:00 ng umaga - 5:00 ng hapon.)</em></li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                                How much is the processing fee in securing Solo Parent I.D.? <em>(Magkano ang bayad sa pagpoproseso ng Solo Parent I.D.?)</em>
                            </Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    <li>NONE REQUIRED FEES</li>
                                </ul>
                                <p>The MSWD shall not collect any processing fee for securing Solo Parent I.D. <em>(Ang MSWD ay hindi mangongolekta ng anumang bayad sa pagproseso para sa pagkuha ng Solo Parent I.D.)</em></p>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>
                                What do I need before I apply? <em>(Ano ang mga kailangan ko bago ako mag-apply?)</em>
                            </Accordion.Header>
                            <Accordion.Body>
                                <p>The requirements needed to obtain Solo Parent I.D. <em>(Ang mga kinakailangan upang makakuha ng Solo Parent I.D.)</em></p>
                                <ul>
                                    <li>2 pcs 1x1 ID picture (latest picture in white background) <em>(2 piraso 1x1 ID picture (pinakabagong larawan sa puting background))</em></li>
                                    <li>Solo parent certificate from the barangay (if separate) <em>(Solo parent certificate mula sa barangay (kung hiwalay))</em></li>
                                    <li>Death certificate if widow / widower <em>(Death certificate kung balo / Biyuda)</em></li>
                                    <li>Birth certificate of children <em>(Birth certificate ng mga anak)</em></li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card.Body>        
            </Card>

            <Form onSubmit={submitForm}>
                <Row>
                    <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name (Pangalan)</Form.Label>
                            <Form.Control type="text" name="first_name" id="first_name" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Middle Name (Gitnang Pangalan)</Form.Label>
                            <Form.Control type="text" name="middle_name" id="middle_name" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name (Apelyido)</Form.Label>
                            <Form.Control type="text" name="last_name" id="last_name" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                        <Form.Group className="mb-3">
                            <Form.Label>Age (Edad)</Form.Label>
                            <Form.Control type="text" name="age" id="age" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group className="mb-3">
                            <Form.Label>Sex (Kasarian)</Form.Label>
                            <Form.Select name="sex" id="sex" onChange={textOnChange}>
                                <option>Select</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Date of Birth (Kaarawan)</Form.Label>
                            <Form.Control type="date" name="dob" id="dob" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Place of Birth (Lugar ng pinagpaanakan)</Form.Label>
                            <Form.Control type="text" name="pob" id="pob" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="text" name="email_address" id="email_address" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Row>
                                <Col md={3}>
                                    <Form.Label>House No.</Form.Label>
                                    <Form.Control type="text" name="houseno" id="houseno" onChange={textOnChange} />
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Street or Sitio</Form.Label>
                                    <Form.Control type="text" name="street" id="street" onChange={textOnChange} />
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Barangay</Form.Label>
                                    <Form.Select id="barangay" name="barangay" onChange={textOnChange}>
                                        <option>Select</option>
                                        {
                                            brgyList !== false ? brgyList.map(d => 
                                                <option key={d.brgy_code} value={d.brgy_code}>{d.brgy_name}</option>   
                                            ) : ""
                                        }
                                    </Form.Select>
                                </Col>
                                <Col md={3}>
                                    <Form.Label>City and Province</Form.Label>
                                    <Form.Control type="text" value="San Rafael, Bulacan" readOnly />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Highest Educational Attainment</Form.Label>
                            <Form.Control type="text" name="hea" id="hea" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Occupation (Trabaho)</Form.Label>
                            <Form.Control type="text" name="occupation" id="occupation" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Monthly Income (Buwanang kita)</Form.Label>
                            <Form.Control type="text" name="monthly_income" id="monthly_income" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Total Monthly Family Income (Buwanang kita ng buong pamilya)</Form.Label>
                            <Form.Control type="text" name="tmfi" id="tmfi" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control type="text" name="contact_number" id="contact_number" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact person in case of emergency</Form.Label>
                            <Form.Control type="text" name="contact_person" id="contact_person" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control type="text" name="contact_number_contact_person" id="contact_number_contact_person" onChange={textOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-1">
                            <Form.Label>I. Family Composition: (PANGALAN NG MGA ANAK AT IBA PANG KASAMA SA BAHAY)</Form.Label>
                            <div><small>Use form below to add each family members</small></div>
                            <Row className="mb-3">
                                <Col lg={2} className="mb-sm-1">
                                    <Form.Control type="text" value={fcHolder.fc_name} name="fc_name" id="fc_name" placeholder="Full Name" onChange={fcOnChange} />
                                </Col>
                                <Col lg={2} className="mb-sm-1">
                                    <Form.Control type="text" value={fcHolder.fc_rel} name="fc_rel" id="fc_rel" placeholder="Relationship" onChange={fcOnChange} />
                                </Col>
                                <Col lg={1} className="mb-sm-1">
                                    <Form.Control type="text" value={fcHolder.fc_age} name="fc_age" id="fc_age" placeholder="Age" onChange={fcOnChange} />
                                </Col>
                                <Col lg={2} className="mb-sm-1">
                                    <Form.Select name="fc_status" id="fc_status" value={fcHolder.fc_status} onChange={fcOnChange}>
                                        <option value="">Select</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Divorced">Divorced</option>
                                        <option value="Separated">Separated</option>
                                        <option value="Widowed">Widowed</option>
                                    </Form.Select>
                                </Col>
                                <Col lg={2} className="mb-sm-1">
                                    <Form.Control type="date" value={fcHolder.fc_bday} name="fc_bday" id="fc_bday" placeholder="Birthday" onChange={fcOnChange} />
                                </Col>
                                <Col lg={2} className="mb-sm-1">
                                    <Form.Control type="text" value={fcHolder.fc_mi} name="fc_mi" id="fc_mi" placeholder="Monthly Income" onChange={fcOnChange} />
                                </Col>
                                <Col>
                                    <Button onClick={setFcField}>
                                        + Add
                                    </Button>
                                </Col>
                            </Row>
                            <Form.Control placeholder="Example: Juan de la Cruz, Anak, 23, Single, 06/14/1996, Waiter/10000" as="textarea" name="fam_composition" id="fam_composition" ref={famComRef} onChange={textOnChange} rows={5}></Form.Control>
                        </Form.Group>
                        <Button style={{float:'right'}} size="sm" onClick={() => famComRef.current.value = ""}>Clear Family Composition</Button>
                        <p>Include family members and other members of the household.</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>II. Classification/Circumstances of Being a Solo Parent</Form.Label>
                            <Form.Text> Dahilan ng pagiging solo parent</Form.Text>
                            <Form.Control as="textarea" name="solo_parent_classification" id="solo_parent_classification" onChange={textOnChange} rows={2}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>III. Needs/Problems of Solo Parents:</Form.Label>
                            <Form.Text> Mga pangangailangan bilang solo parent</Form.Text>
                            <Form.Control as="textarea" name="needs_of_solo_parents" id="needs_of_solo_parents" onChange={textOnChange} rows={2}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>IV. Family Resources:</Form.Label>
                            <Form.Control as="textarea" name="family_resources" id="family_resources" onChange={textOnChange} rows={2}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Picture in white background (1x1) PNG ONLY</Form.Label>
                            <Form.Control type="file" name="picture1x1" id="picture1x1" accept="image/png" onChange={picOnChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Signature over printed name PNG ONLY</Form.Label>
                            <Form.Control type="file" name="signature" id="signature" accept="image/png" onChange={sigOnChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Documents</Form.Label>
                            <div className="mb-1"><small>Solo parent certificate mula sa barangay kung hiwalay, death certificate kung balo/biyida, and birth certificate ng mga anak. (<a href="https://i.ibb.co/wyhLcD5/drag-and-select.gif" target="_blank" rel="noreferrer">You can multiple select files.</a>) PDF Only</small></div>
                            <Form.Control type="file" name="docs" id="docs" accept="application/pdf" onChange={docsOnChange} multiple />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                       
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Check aria-label="agreement" label="I hereby certify that the information given above are true and correct. I further understand that any misinterpretationthat may have made will subject me to criminal and civil liabilities provided for by existing laws." onChange={() => setAgreeCheck(!agreeCheck)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                    {
                            isSubmit ? 
                            <Button variant="primary" disabled>
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> Submitting...
                            </Button>
                            :
                            <Button className="mb-3" variant="primary" type="submit" disabled={agreeCheck}>
                                Submit Application
                            </Button>
                        }
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default IdAppliSoloParent;