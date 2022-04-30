import React, { useState, useEffect } from 'react';
import { 
    Container,
    Row,
    Col,
    Button,
    Spinner,
    Card,
    Table,
    Accordion
} from 'react-bootstrap';

import mswdoLogo from '../img/MSWDO Logo.png';
import foiphLogo from '../img/foiph.png';

import api from '../api/api';

import { sortByDesc } from '../fn/functions';

//components
import NewsBox from '../components/NewsBox';
import ContactForm from '../components/ContactForm';

import bannerImg from '../img/banner-img.png';

const Home = () => {
    let [ann, setAnn] = useState(false);

    const proc = {
        'aics' : [
            {
                'procedures' : '1. Received the complete requirements from the client (Natanggap ang kumpletong mga kinakailangan mula sa kliyente)',
                'proc_time' : '2 minutes',
                'res_per' : 'Elsa Revilla',
            },{
                'procedures' : '2. Interview and assess the client and prepare social case study report (Interbyuhin at tasahin ang kliyente at ihanda ang ulat ng social case study)',
                'proc_time' : '35 minutes',
                'res_per' : 'Elsa Revilla',
            },{
                'procedures' : '3. Transfer the data gathered using the DSWD – Intake Form (Ilipat ang mga datos na nakalap gamit ang DSWD – Intake Form)',
                'proc_time' : '5 minutes',
                'res_per' : 'Elsa Revilla',
            },{
                'procedures' : '4. Typing the Request Information Sheet (RIS) (Pag-type ng Request Information Sheet (RIS))',
                'proc_time' : '5 minutes',
                'res_per' : 'Elsa Revilla',
            },{
                'procedures' : '5. Signature of the Municipal Social Welfare and Development Officer (Lagda ng Municipal Social Welfare and Development Officer)',
                'proc_time' : '1 minute',
                'res_per' : 'Ma. Victoria G. Ramos',
            },{
                'procedures' : '6. Typing other pertinent documents (ALOBS) at the Municipal Budget Officer’s Office and signature of the Municipal Budget Officer (Pag-type ng iba pang nauugnay na dokumento (ALOBS) sa Municipal Budget Officer’s Office at lagda ng Municipal Budget Officer)',
                'proc_time' : '5 minutes',
                'res_per' : 'Budget Office’s Staff',
            },{
                'procedures' : '7. Signature of the Municipal Social Welfare and Development Officer (Lagda ng Municipal Social Welfare and Development Officer)',
                'proc_time' : '1 minute',
                'res_per' : 'Ma. Victoria G. Ramos',
            },{
                'procedures' : '8. Preparation of supporting documents and Signature of the Municipal Accountant (Paghahanda ng mga sumusuportang dokumento at Lagda ng Municipal )',
                'proc_time' : '1 minute',
                'res_per' : 'Emerenciana DL. Forlales',
            },{
                'procedures' : '9. Signature of the Municipal Mayor (Lagda ng Alkalde ng Munisipyo)',
                'proc_time' : '1 minute',
                'res_per' : 'Hon. Cipriano D. Violago, Jr.',
            },{
                'procedures' : '10. Preparation of Check and Signature of the Municipal Treasurer (Paghahanda ng Tseke at Lagda ng Municipal)',
                'proc_time' : '5 minutes',
                'res_per' : 'Gloria G. Valderama',
            },{
                'procedures' : `11. Client received his/her financial assistance at the Treasurer's Office (Natanggap ng kliyente ang kanyang tulong pinansyal sa Treasurer's Office`,
                'proc_time' : '1 minute',
                'res_per' : 'Client',
            },
        ],
        'ioi' : [
            {
                'procedures' : '1. Proceed to the Social Welfare and Development Office and present complete requirements (Magpatuloy sa Social Welfare and Development Office at ipakita ang kumpletong dokumento na mga kinakailangan)',
                'proc_time' : '5 minutes',
                'res_per' : 'Social Welfare Officer III/Social Welfare Assistant',
            },{
                'procedures' : '2. Attend an interview (Dumalo sa isang panayam)',
                'proc_time' : '35 minutes',
                'res_per' : 'Social Welfare Officer III/Social Welfare Assistant',
            },{
                'procedures' : '3. Claim certificate (I-claim ang sertipiko)',
                'proc_time' : '2 minutes',
                'res_per' : 'MSWDO Staff',
            },
        ],
        'spb' : [
            {
                'procedures' : '1. Proceed to the Social Welfare and Development Office and present requirements (Magpatuloy sa Social Welfare and Development Office at kasalukuyang mga kinakailangan)',
                'proc_time' : '5 minutes',
                'res_per' : 'MSWDO Staff',
            },{
                'procedures' : '2. Receive Purchase Booklet',
                'proc_time' : '2 minutes',
                'res_per' : 'MSWDO Staff',
            },
        ],
        'scsr' : [
            {
                'procedures' : '1. Proceed to the Municipal Social Welfare and Development Office and Submit complete Documents (Magpatuloy sa Municipal Social Welfare and Development Office at Isumite nang kumpleto mga dokumento)',
                'proc_time' : '10 minutes',
                'res_per' : 'MSWDO Staff',
            },{
                'procedures' : '2. Attend an interview (Dumalo sa isang panayam)',
                'proc_time' : '40 minutes',
                'res_per' : 'MSWDO Staff',
            },{
                'procedures' : '3. Receive Social Case Study Report',
                'proc_time' : '5 minutes',
                'res_per' : 'MSWDO Staff',
            },  
        ],
        'pmc' : [
            {
                'procedures' : '1. Proceed to the Social Welfare and Development Office and present requirement (Magpatuloy sa Social Welfare and Development Office at i-present ang mga nasabing requirements',
                'proc_time' : '10 minutes',
                'res_per' : 'Administrative Aide II',
            },{
                'procedures' : '2. Attend Pre-Marriage Counseling Orientation (Dumalo sa Pre-Marriage Counseling Orientation)',
                'proc_time' : '2 hours',
                'res_per' : 'Social Worker Officer II/Administrative Aide II',
            },{
                'procedures' : `3. Pay at the Treasurer's Office (Magbayad sa Treasurer's Office)`,
                'proc_time' : '5 minutes',
                'res_per' : 'Revenue Collection Clerk II',
            },{
                'procedures' : '4. Claim certificate (I-claim ang sertipiko)',
                'proc_time' : '2 minutes',
                'res_per' : 'MSWDO Staff',
            },
        ]
    }

    const getAnn = async() => {
        let res = await api.get("announcement");
        let data = res.data.data;

        setAnn(sortByDesc(data));
    }

    useEffect(() => {
        getAnn();
    }, []);
    
    return (
        <div>
            <div style={{ background: `linear-gradient(0deg, rgba(25, 25, 25, 0.8), rgba(58, 58, 58, 0.5)), url('${bannerImg}'), #000`, backgroundPosition: 'bottom', color: '#fff', backgroundSize: 'cover', padding: '15vh 0' }}>
                <Container>
                    <Row>
                        <Col xs="12">
                            <h1>Municipal Social Welfare and Development Office</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <h3>San Rafael, Bulacan Office</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <Button size="lg" variant="light" href="/services" className="mt-5">Services</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container fluid className="pt-5 pb-5">
                <Row>
                    <Col lg={3} style={{ fontSize: '16px' }}>
                        <Card className="mb-3 p-3">
                            <strong>Philippine Standard Time</strong>
                            <center><iframe title="Philippine Standard Time" src="https://free.timeanddate.com/clock/i8asrvlg/n145/fn16/fc444/tt0/tm1/tb4" frameBorder="0" width="161" height="34"></iframe></center>
                        </Card>
                        <Card className="mb-3 p-3">
                            <center>
                                <img
                                    src={mswdoLogo}
                                    width={200}
                                    alt="MSWDO Logo"
                                />
                                <a href="https://www.foi.gov.ph/" target="_blank" rel="noreferrer">
                                    <img
                                        src={foiphLogo}
                                        width={200}
                                        alt="Freedom of Information Philippines Logo"
                                    />
                                </a>
                            </center>
                        </Card>
                        <Card className="mb-3 p-3">
                            <strong>Sitemap</strong>
                            <ul style={{ textAlign: 'left' }}>
                                <li>
                                    <strong>Home</strong> 
                                    <ul>
                                        <li>Announcement</li>
                                        <li>Vision, Mission, Objectives, and Pledge</li>
                                        <li>Service Offered</li>
                                    </ul>
                                </li>
                                <li><strong>E-Services</strong></li>
                                <li><strong>Services Offered</strong></li>
                                <li>
                                    <strong>About Us</strong>
                                    <ul>
                                        <li>Vision, Mission, Objectives, and Pledge</li>
                                        <li>Organization Chart</li>
                                    </ul>
                                </li>
                                <li><strong>FAQ</strong></li>
                                <li><strong>Downloadable Forms</strong></li>
                            </ul>
                        </Card>
                    </Col>
                    <Col lg={6}>
                        <Card className="p-3 mb-3">
                            <h5 className="mb-3" style={{ textAlign: 'left', textTransform: 'uppercase' }}>Announcements</h5>
                            <div className="newsBox" style={{ maxHeight: '500px', overflow: 'auto' }}>
                                {
                                    !ann ?
                                        <Spinner className="mt-5" animation="border" variant="info" />
                                    :
                                        ann.map(d => 
                                                <NewsBox key={d.id} announcementData={d} />
                                            )                   
                                }
                            </div>
                        </Card>

                        <Card className="p-3 mb-3" style={{ textAlign: 'left' }}>
                            <h5 style={{ textTransform: 'uppercase' }}>Vision</h5>
                            <p>An ideal office embodied by truly dedicated personnel whose path is governed by God and by the Professional Social Worker’s Code of Ethics, Values and Principles. Our collective efforts are towards the empowerment, participation and rehabilitation of the disadvantaged sectors of society whether individual, group and community designed for the restoration of their normal level of social functioning.</p>
                            <p style={{ fontWeight: 'bold', fontStyle: 'italic' }}>“Empowered families and individuals in the municipality who actively participate in community affairs and have normal level of social functioning”.</p>
                        </Card>

                        <Card className="p-3 mb-3" style={{ textAlign: 'left' }}>
                            <h5 style={{ textTransform: 'uppercase' }}>Mission</h5>
                            <p>Care, protection and rehabilitation of the municipality’s population which has the least in life and needs social welfare assistance and social work interventions to restore their normal social functioning and participation in community affairs.</p>
                        </Card>

                        <Card className="p-3 mb-3" style={{ textAlign: 'left' }}>
                            <h5 style={{ textTransform: 'uppercase' }}>Objectives</h5>
                            <ol>
                                <li style={{ marginBottom: '1em' }}>
                                    <strong>Provision of preventive, protective, rehabilitative and developmental programs and services for:</strong>
                                    <ul>
                                        <li>Family & Community Welfare</li>
                                        <li>Child and Youth Welfare</li>
                                        <li>Women Welfare Program</li>
                                        <li>Person with Disability Welfare</li>
                                        <li>Emergency Assistance Welfare</li>
                                    </ul>
                                </li>
                                <li style={{ marginBottom: '1em' }}><strong>Formulation and advocacy of just and responsive social welfare and development legislative agenda policies and plans as well as ensuring this effective implementation of all programs.</strong></li>
                                <li><strong>Strengthen agency and community networks, linkages and collaboration for a responsive and strategic delivery of social protective services.</strong></li>
                            </ol>
                        </Card>

                        <Card className="p-3 mb-3" style={{ textAlign: 'left' }}>
                            <h5 style={{ textTransform: 'uppercase' }}>Pledge and Commitment</h5>
                            <p>We, the official and employees of the Municipal Social Welfare and Development Office of San Rafael, Bulacan pledge and commit to deliver quality services that will really meet the needs of our clientele as promised in this Citizen's Charter; to ensure their normal social functioning and maximum participation in community affairs. We, will demonstrate sensitivity and appropriate behavior and professionalism based on the social worker's code of ethics.</p>
                        </Card>

                        <Card className="p-3 mb-3" style={{ textAlign: 'left' }}>
                            <h4 className="mb-3" style={{ textTransform: 'uppercase' }}>Services Offered by MSWD</h4>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Provision of Assistance to Individuals in Crisis Situation (AICS)</Accordion.Header>
                                    <Accordion.Body>
                                        <p>Financial Assistance or Assistance for Individual in Crisis Situation (AICS) - the provision of needed interventions to enable distressed individuals/families to cope with crisis; assistance maybe in the form of transportation, medical or hospitalization support, burial assistance/ sympathy flowers to bereaved families and other financial support. <em>(Financial Assistance or Assistance for Individual in Crisis Situation (AICS) - ang pagbibigay ng mga kinakailangang interbensyon upang bigyang-daan ang mga indibidwal/pamilyang nahihirapang makayanan ang krisis; maaaring tulong sa anyo ng transportasyon, suportang medikal o ospital, tulong sa paglilibing/ bulaklak ng pakikiramay sa mga naulilang pamilya at iba pang suportang pinansyal.)</em></p>
                                        <strong>The assistance maybe in the form of the following:</strong>
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
                                                {
                                                    proc.aics.map((d, key) => 
                                                        <tr key={key}>
                                                            <td>{d.procedures}</td>
                                                            <td>{d.proc_time}</td>
                                                            <td>{d.res_per}</td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Issuance of Indigency</Accordion.Header>
                                    <Accordion.Body>
                                        <p>Certificate of Indigency is a certification issued by the Municipal Social Welfare and 	Development Office certifying that the said client/applicant belongs to the indigent 	families in their barangay as certified by their barangay captains. <em>(Ang Certificate of Indigency ay isang sertipikasyon na inisyu ng Municipal Social Welfare and Development Office na nagpapatunay na ang nasabing kliyente/aplikante ay kabilang sa mga mahihirap na pamilya sa kanilang barangay ayon sa sertipikasyon ng kanilang mga barangay captain.)</em></p>
                                        <strong>Who May Avail of the Service:</strong>
                                        <ul>
                                            <li>Bonafide resident who belongs to marginalized group of families</li>
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
                                                {
                                                    proc.ioi.map((d, key) => 
                                                        <tr key={key}>
                                                            <td>{d.procedures}</td>
                                                            <td>{d.proc_time}</td>
                                                            <td>{d.res_per}</td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Securing Purchase Booklet</Accordion.Header>
                                    <Accordion.Body>
                                        <p>The Purchase Booklet is issued by the Office of the Senior Citizen Affairs (OSCA). This is use to avail special discount for basic necessities and prime commodities. It shall be presented together with the Senior Citizen ID or PWD ID.</p>
                                        <p><em>(Ang Purchase Booklet ay inisyu ng Office of the Senior Citizen Affairs (OSCA). Ito ay ginagamit upang makakuha ng espesyal na diskwento para sa mga pangunahing pangangailangan at pangunahing bilihin. Dapat itong iharap kasama ng Senior Citizen ID o PWD ID.)</em></p>
                                        <p><strong>Persons with Disabilities</strong> are those suffering from restriction of different abilities, as a result of a mental, physical or sensory impairment, to perform an activity in the manner or within the range considered normal for a human being. <em>(Ang mga taong may Kapansanan ay ang mga dumaranas ng paghihigpit sa iba't ibang kakayahan, bilang resulta ng kapansanan sa pag-iisip, pisikal o pandama, upang magsagawa ng aktibidad sa paraang o sa loob ng saklaw na itinuturing na normal para sa isang tao.)</em></p>
                                        <p><strong>Senior Citizen</strong> shall mean any resident citizen of the Philippines and at least 60 years of age and above. <em>(Ang Senior Citizen ay nangangahulugang sinumang residenteng mamamayan ng Pilipinas at hindi bababa sa 60 taong gulang pataas)</em></p>
                                        <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg> The grant of 20% discount from all the establishments relative to the utilization of services in hotels, restaurants and recreation centers and purchase of medicines in all establishments for the exclusive use or enjoyment of Senior Citizens, including funeral and burials services for the death of Senior Citizens. <em>(Ang pagbibigay ng 20% na diskwento mula sa lahat ng mga establisyimento na may kaugnayan sa paggamit ng mga serbisyo sa mga hotel, restaurant at recreation center at pagbili ng mga gamot sa lahat ng mga establisyimento para sa eksklusibong paggamit o kasiyahan ng mga Senior Citizens, kabilang ang mga serbisyo sa libing at burial para sa pagkamatay ng Senior. Mga mamamayan.)</em></p>
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
                                                {
                                                    proc.spb.map((d, key) => 
                                                        <tr key={key}>
                                                            <td>{d.procedures}</td>
                                                            <td>{d.proc_time}</td>
                                                            <td>{d.res_per}</td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>Securing Social Case Study Report</Accordion.Header>
                                    <Accordion.Body>
                                        <p>Social Case Study Report – it is a referral letter or a case study (prepared by the MSWDO or a social worker) for the concerned agencies like PCSO, Hospitals and referrals of clients to other service providers of other agencies concerned. <em>(Social Case Study Report – ito ay isang liham ng referral o isang case study (inihanda ng MSWDO o isang social worker) para sa mga kinauukulang ahensya tulad ng PCSO, Mga Ospital at mga referral ng mga kliyente sa iba pang mga service provider ng iba pang ahensyang may kinalaman.)</em></p>
                                        <strong>Who May Avail of the Service:</strong>
                                        <ul>
                                            <li>
                                                Indigent individuals or families
                                                
                                                <p><strong>Situation Covered</strong></p>
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
                                                {
                                                    proc.spb.map((d, key) => 
                                                        <tr key={key}>
                                                            <td>{d.procedures}</td>
                                                            <td>{d.proc_time}</td>
                                                            <td>{d.res_per}</td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </Table>
                                        <strong><em>Note: Only registered social worker prepares and signed the social case study report (Ang rehistradong social worker lamang ang naghahanda at pumirma sa ulat ng social case study)</em></strong>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>Securing Pre-Marriage Counselling Certificate (PMC)</Accordion.Header>
                                    <Accordion.Body>
                                        <p>Pre-marriage counseling – is a one-day orientation and counseling to would-be couples 	on Responsible Parenthood and Family Planning. This is a Presidential Decree No. 965 	as a pre-requisite for securing the marriage license of the couple. <em>(Pre-marriage counseling – ay isang isang araw na oryentasyon at pagpapayo sa mga magiging mag-asawa sa Responsible Parenthood at Family Planning. Ito ay isang Presidential Decree No. 965 bilang isang pre-requisite para sa pagkuha ng marriage license ng mag-asawa.)</em></p>
                                        <strong>Who May Avail of the Service:</strong>
                                        <ul>
                                            <li>Couples even if they already have a child</li>
                                        </ul>
                                        <strong>Requirements</strong>
                                        <ul>
                                            <li>Accomplished PMC Registration Form</li>
                                        </ul>
                                        <p><a href="https://u.pcloud.link/publink/show?code=XZrHbXVZuQll6EPKDrSrCBPOkSoAK06ADMK7" target="_blank" rel="noreferrer">Click here to download the PMC Registration Form</a></p>
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
                                                {
                                                    proc.pmc.map((d, key) => 
                                                        <tr key={key}>
                                                            <td>{d.procedures}</td>
                                                            <td>{d.proc_time}</td>
                                                            <td>{d.res_per}</td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Card>
                    </Col>
                    <Col lg={3}>
                        <h3 className="mb-3">Inquire</h3>
                        <Card className="p-3">
                            <ContactForm />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;
