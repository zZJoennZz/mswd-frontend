import React from 'react';
import { Container,
    Row,
    Col,
    Card, 
    Button,
    Tabs,
    Tab,
    Accordion,
    Table
} from 'react-bootstrap';

import bannerImg from '../img/services-header.jpg';

const Services = () => {

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

    return (
        // <div className="mt-5 mb-5 services">
        //     <h1 className="mt-5 pt-3">Services</h1>
        //     <Container>
        //         <Row>
        //             <Col md="4">
        //                 <Card className="mb-3">
        //                     <Card.Body>
        //                         <Card.Title>Issuance of Social Case Study Report</Card.Title>
        //                         <Card.Subtitle className="mb-2 text-muted">Burial/Hospitalization/Financial Assistance</Card.Subtitle>
        //                     </Card.Body>
        //                 </Card>
        //                 <Card className="mb-3">
        //                     <Card.Body>
        //                         <Card.Title>Who may avail</Card.Title>
        //                         <span style={{ textAlign: 'left' }}>
        //                             <ul>
        //                                 <li>Indigent individuals or families</li>
        //                             </ul>
        //                         </span>
        //                     </Card.Body>
        //                 </Card>
        //                 <Card className="mb-3">
        //                     <Card.Body>
        //                         <Card.Title>Requirements</Card.Title>
        //                         <Tabs defaultActiveKey="hospitalization" id="uncontrolled-tab-example" className="mb-3">
        //                             <Tab eventKey="burial" title="Burial" style={{ textAlign: "left" }}>
        //                                 For Indigents
        //                                 <ul>
        //                                     <li>Death certificate of deceased family member</li>
        //                                     <li>Marriage contract or birth certificate as proof of relationship to the deceased family member</li>
        //                                     <li>Letter request addressed to Municipal Mayor</li>
        //                                     <li>Certificate of indigency from Punong Barangay</li>
        //                                     <li>Valid identification card</li>
        //                                 </ul>
        //                                 For Senior Citizen
        //                                 <ul>
        //                                     <li>Death certificate of deceased senior citizen</li>
        //                                     <li>Claim advisory form</li>
        //                                     <li>Certificate of membership</li>
        //                                     <li>Official receipt of membership fee and monthly dues</li>
        //                                     <li>Federation ID</li>
        //                                     <li>Marriage contract if wife is the claimant</li>
        //                                     <li>Birth certificate and waiver of siblings if child is the claimant</li>
        //                                 </ul>
        //                             </Tab>
        //                             <Tab eventKey="hospitalization" title="Hospitalization" style={{ textAlign: "left" }}>
        //                                 <ul>
        //                                     <li>Letter request addressed to Municipal Mayor</li>
        //                                     <li>Certificate of indigency from the Punong Barangay</li>
        //                                     <li>Valid identification card</li>
        //                                     <li>Birth certificate or marriage contract of the patient</li>
        //                                     <li>Billing statement from the hospital</li>
        //                                 </ul>
        //                             </Tab>
        //                             <Tab eventKey="financial" title="Financial" style={{ textAlign: "left" }}>
        //                                 <ul>
        //                                     <li>Letter request addressed to Municipal Mayor</li>
        //                                     <li>Certificate of indigency from the Punong Barangay</li>
        //                                     <li>Valid identification card</li>
        //                                     <li>Birth certificate or marriage contract of the patient</li>
        //                                     <li>Medical abstract</li>
        //                                     <li>Request for laboratory examination/procedures</li>
        //                                 </ul>
        //                             </Tab>
        //                         </Tabs>
        //                         <Button href="/apply/1" size="lg" variant="primary">Inquire</Button>
        //                     </Card.Body>
        //                 </Card>
        //             </Col>
        //             <Col md="4">
        //                 <Card className="mb-3">
        //                     <Card.Body>
        //                         <Card.Title>Issuance of Identification Cards</Card.Title>
        //                     </Card.Body>
        //                 </Card>
        //                 <Card className="mb-3">
        //                     <Card.Body>
        //                         <Card.Title>Who may avail</Card.Title>
        //                         <span style={{ textAlign: 'left' }}>
        //                             <ul>
        //                                 <li>Solo parents</li>
        //                                 <li>Person with Disabilities (PWD)</li>
        //                                 <li>Senior citizen</li>
        //                             </ul>
        //                         </span>
        //                     </Card.Body>
        //                 </Card>
        //                 <Card className="mb-3">
        //                     <Card.Body>
        //                         <Card.Title>Requirements</Card.Title>
        //                         <Tabs defaultActiveKey="soloparent" id="uncontrolled-tab-example" className="mb-3">
        //                             <Tab eventKey="soloparent" title="Solo Parent" style={{ textAlign: "left" }}>
        //                                 <ul>
        //                                     <li>1 pc 1x1 ID picture (latest picture in white background)</li>
        //                                     <li>Solo parent certificate from barangay (kung hiwalay)</li>
        //                                     <li>Death certificate kung balo/biyuda</li>
        //                                     <li>Birth certificate ng mga anak</li>
        //                                 </ul> 
        //                             </Tab>
        //                             <Tab eventKey="pwd" title="PWD" style={{ textAlign: "left" }}>
        //                                 <ul>
        //                                     <li>Medical Certificate Indicating Disability</li>
        //                                     <li>2 copies of 1x1 picture</li>
        //                                     <li>Blood Type</li>
        //                                 </ul>
        //                             </Tab>
        //                             <Tab eventKey="senior" title="Senior Citizens" style={{ textAlign: "left" }}>
        //                                 <ul>
        //                                     <li>Photocopy - Valid ID with birthday and address in San Rafael (Voter's, SSS/UMID/ LTO/ Passport)</li>
        //                                     <li>2 pcs latest 1x1 colored ID picture in white background</li>
        //                                     <li>Affidavit of loss (if lost ID)</li>
        //                                     <li>If no valid id available
        //                                         <ul>
        //                                             <li>Birth certificate</li>
        //                                             <li>Certificate of residency</li>
        //                                         </ul>
        //                                     </li>
        //                                 </ul>
        //                             </Tab>
        //                         </Tabs>
        //                         <Button href="/apply/2" size="lg" variant="success">Apply</Button>
        //                     </Card.Body>
        //                 </Card>
        //             </Col>
        //             <Col md="4">
        //                 <Card className="mb-3">
        //                     <Card.Body>
        //                         <Card.Title>Issuance of Purchase Booklet</Card.Title>
        //                     </Card.Body>
        //                 </Card>
        //                 <Card className="mb-3">
        //                     <Card.Body>
        //                         <Card.Title>Who may avail</Card.Title>
        //                         <div style={{ textAlign: 'left' }}>
        //                             <ul>
        //                                 <li>Senior citizen</li>
        //                                 <li>Person with Disabilities (PWD)</li>
        //                             </ul>
        //                         </div>
        //                     </Card.Body>
        //                 </Card>
        //                 <Card className="mb-3">
        //                     <Card.Body>
        //                         <Card.Title>Requirements</Card.Title>
                                
        //                         <div style={{ textAlign: "left" }}>
        //                             <ul>
        //                                 <li>Senior citizen/PWD Identification card</li>
        //                             </ul> 
        //                         </div>
        //                         <Button href="/apply/3" size="lg" variant="primary">Inquire</Button>
        //                     </Card.Body>
        //                 </Card>
        //             </Col>
        //         </Row>
        //         <Row>
        //             <Col md="4">
        //                 <Card className="mb-3">
        //                     <Card.Body>
        //                         <Card.Title>Issuance of Certificate of Indigency</Card.Title>
        //                     </Card.Body>
        //                 </Card>
        //                 <Card className="mb-3">
        //                     <Card.Body>
        //                         <Card.Title>Who may avail</Card.Title>
        //                         <div style={{ textAlign: 'left' }}>
        //                             <ul>
        //                                 <li>Bonafide resident who belongs to marginalized group of families</li>
        //                             </ul>
        //                         </div>
        //                     </Card.Body>
        //                 </Card>
        //                 <Card className="mb-3">
        //                     <Card.Body>
        //                         <Card.Title>Requirements</Card.Title>
        //                         <div style={{ textAlign: 'left' }}>
        //                             <div>
        //                                 PAO and IBP
        //                             </div>
        //                             <ul>
        //                                 <li>Certificate of no property from assessor's office</li>
        //                                 <li>Certificate of indigency from Punong Barangay</li>
        //                             </ul>
        //                         </div>
        //                         <Button href="/apply/4" size="lg" variant="primary">Inquire</Button>
        //                     </Card.Body>
        //                 </Card>
        //             </Col>
        //             <Col md="4">
        //                 <Card className="mb-3">
        //                     <Card.Body>
        //                         <Card.Title>Issuance of Pre-Marriage Counselling (PMC) Certificate</Card.Title>
        //                     </Card.Body>
        //                 </Card>
        //                 <Card className="mb-3">
        //                     <Card.Body>
        //                         <Card.Title>Who may avail</Card.Title>
        //                         <div style={{ textAlign: 'left' }}>
        //                             <ul>
        //                                 <li>Couples even if they already have a child</li>
        //                             </ul>
        //                         </div>
        //                     </Card.Body>
        //                 </Card>
        //                 <Card className="mb-3">
        //                     <Card.Body>
        //                         <Card.Title>Requirements</Card.Title>
        //                         <div style={{ textAlign: 'left' }}>
        //                             <ul>
        //                                 <li>Accomplished PMC registration form</li>
        //                             </ul>
        //                         </div>
        //                         <Button href="/apply/5" size="lg" variant="primary">Inquire</Button>
        //                     </Card.Body>
        //                 </Card>
        //             </Col>
        //             <Col md="4">
                        
        //             </Col>
        //         </Row>
        //     </Container>
        // </div>
        <div>
            <Container fluid>
                <Row style={{ background: `linear-gradient(0deg, rgba(25, 25, 25, 0.8), rgba(58, 58, 58, 0.5)), url('${bannerImg}'), #000`, backgroundPosition: 'center', color: '#fff', backgroundSize: 'cover', padding: '15vh 0' }}>
                    <Col md={12}>
                        <h1>Services</h1>
                    </Col>
                </Row>
            </Container>
            <Container className="text-start">
                <Row className="mt-5 mb-5">
                    <Col md={12}>
                        <Accordion style={{ 'fontSize' : '18px' }}>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header><h2>Issuance of AICS or Assistance to Individuals in Crisis Situation</h2></Accordion.Header>
                                <Accordion.Body>
                                    <Card className="p-3 mb-3">
                                        <h3>About the service</h3>
                                        <p>Financial Assistance or Assistance for Individual in Crisis Situation (AICS) - the provision of needed interventions to enable distressed individuals/families to cope with crisis; assistance maybe in the form of transportation, medical or hospitalization support, burial assistance/ sympathy flowers to bereaved families and other financial support. <em>(Financial Assistance or Assistance for Individual in Crisis Situation (AICS) - ang pagbibigay ng mga kinakailangang interbensyon upang bigyang-daan ang mga indibidwal/pamilyang nahihirapang makayanan ang krisis; maaaring tulong sa anyo ng transportasyon, suportang medikal o ospital, tulong sa paglilibing/ bulaklak ng pakikiramay sa mga naulilang pamilya at iba pang suportang pinansyal.)</em></p>
                                    </Card>
                                    
                                    <Card className="p-3 mb-3" style={{ fontSize: '15px' }}>
                                        <h3>Requirements</h3>
                                        <Tabs defaultActiveKey="financial" id="uncontrolled-tab" className="mb-3">
                                            <Tab eventKey="financial" title="Financial Assistance">
                                                <h4>Financial Assistance</h4>
                                                <ol>
                                                    <li>Medical Abstract/Medical Certificate(hospital) (original or certified true copy) <em>(Medical Abstract/Medical Certificate(ospital) (orihinal o kopya ng sertipikadong tunay)</em></li>
                                                    <li>Reseta (photocopy - optional) <em>(Reseta (Kopya – Maaring magbigay ngunit hindi inuubliga))</em></li>
                                                    <li>Birth/Marriage Cert. (original or certified true copy)
                                                        <ul>
                                                            <li>**If NSO/PSA (photocopy)</li>
                                                        </ul>
                                                        (Sertipiko ng kapanganakan/Sertipiko ng kasal (kopya ng sertipikadong tunay)
                                                        <ul>
                                                            <li>**Kung NSO/PSA(kopya)</li>
                                                        </ul>
                                                    </li>
                                                    <li>If not married, certification (barangay -original) (Kung hindi kasal, sertipikasyon (barangay -orihinal)</li>
                                                    <li>Sulat Kahilingan (To the Mayor) (Sulat Kahilingan para sa Mayor)</li>
                                                    <li>Cert. of Indigency (barangay-original) (Sertipiko ng Indigency (barangay-orihinal)</li>
                                                    <li>Case Study Report (MSWD office -original) (Case Study Report (MSWD office -orihinal)</li>
                                                    <li>RIS (MSWD office)</li>
                                                    <li>Valid ID of Client and Claimant(photocopy)
                                                        <ul>
                                                            <li>** If no Valid ID, Voters Certification (COMELEC)</li>
                                                        </ul>
                                                        (Valid ID ng kliyente at tatanggap (Kopya))
                                                        <ul>
                                                            <li>** Kung walang Valid ID, Voters Certification (COMELEC)</li>
                                                        </ul>
                                                    </li>
                                                </ol>
                                            </Tab>
                                            <Tab eventKey="burial" title="Burial Assistance">
                                                <h4>Burial Assistance</h4>
                                                <ol>
                                                    <li>Resibo ng Funeraria (below Php25,000) (Resibo ng Funeraria (Mababa sa 25,000 pesos)</li>
                                                    <li>Death Certificate (certified true copy) (Sertipiko ng kamatayan (kopya ng sertipikadong tunay)</li>
                                                    <li>Birth/Marriage Cert. (original or certified true copy)
                                                        <ul>
                                                            <li>**If NSO/PSA (photocopy)</li>
                                                        </ul>
                                                        (Sertipiko ng kapanganakan/Sertipiko ng kasal (kopya ng sertipikadong tunay)
                                                        <ul>
                                                            <li>**Kung NSO/PSA(kopya)</li>
                                                        </ul>
                                                    </li>
                                                    <li>If not married, certification (barangay -original) (Kung hindi kasal, sertipikasyon (barangay -orihinal)</li>
                                                    <li>Sulat Kahilingan (To the Mayor) (Sulat Kahilingan para sa Mayor)</li>
                                                    <li>Cert. of Indigency (barangay-original) (Sertipiko ng Indigency (barangay-orihinal)</li>
                                                    <li>Case Study Report (MSWD office -original) (Case Study Report (MSWD office -orihinal)</li>
                                                    <li>RIS (MSWD office)</li>
                                                    <li>Valid ID of Client and Claimant(photocopy)
                                                        <ul>
                                                            <li>** If no Valid ID, Voters Certification (COMELEC)</li>
                                                        </ul>
                                                        (Valid ID ng kliyente at tatanggap (Kopya))
                                                        <ul>
                                                            <li>** Kung walang Valid ID, Voters Certification (COMELEC)</li>
                                                        </ul>
                                                    </li>
                                                    <li>10.	Waiver (optional) Waiver (Maaring magbigay ngunit hindi inuubliga)</li>
                                                </ol>
                                            </Tab>
                                            <Tab eventKey="wheelchair" title="Wheelchair Assistance">
                                                <h4>Wheelchair Assistance</h4>
                                                <ol>
                                                    <li>Whole body picture (Litratong kuha ang buong katawan)</li>
                                                    <li>Birth/Marriage Cert. (original or certified true copy)
                                                        <ul>
                                                            <li>**If NSO/PSA (photocopy)</li>
                                                        </ul>
                                                        (Sertipiko ng kapanganakan/Sertipiko ng kasal (kopya ng sertipikadong tunay)
                                                        <ul>
                                                            <li>**Kung NSO/PSA(kopya)</li>
                                                        </ul>
                                                    </li>
                                                    <li>If not married, certification (barangay -original) (Kung hindi kasal, sertipikasyon (barangay -orihinal)</li>
                                                    <li>Sulat Kahilingan (To the Mayor) (Sulat Kahilingan para sa Mayor)</li>
                                                    <li>Cert. of Indigency (barangay-original) (Sertipiko ng Indigency (barangay-orihinal)</li>
                                                    <li>Case Study Report (MSWD office -original) (Case Study Report (MSWD office -orihinal)</li>
                                                    <li>RIS (MSWD office)</li>
                                                    <li>Valid ID of Client and Claimant(photocopy)
                                                        <ul>
                                                            <li>** If no Valid ID, Voters Certification (COMELEC)</li>
                                                        </ul>
                                                        (Valid ID ng kliyente at tatanggap (Kopya))
                                                        <ul>
                                                            <li>** Kung walang Valid ID, Voters Certification (COMELEC)</li>
                                                        </ul>
                                                    </li>
                                                </ol>
                                            </Tab>
                                            <Tab eventKey="calamity" title="Calamity Assistance">
                                                <h4>Calamity Assistance</h4>
                                                <ol>
                                                    <li>RIS (MSWD office)</li>
                                                    <li>Case Study Report (MSWD office -original) (Case Study Report (MSWD office -orihinal)</li>
                                                    <li>Certificate of Indigency (from Captain) (Sertipiko ng Indigency (barangay-orihinal)</li>
                                                    <li>Barangay Certification (affected of typhoon- from Captain) (Sertipikasyon ng Barangay (naapektuhan ng bagyo- mula kay Kapitan)</li>
                                                    <li>If not married, certification (barangay -original) (Kung hindi kasal, sertipikasyon (barangay -orihinal)</li>
                                                    <li>Picture (Litrato)</li>
                                                    <li>Cert. of Indigency (barangay-original) (Sertipiko ng Indigency (barangay-orihinal)</li>
                                                    <li>Valid ID of Claimant(photocopy)
                                                        <ul>
                                                            <li>** If no Valid ID, Voters Certification (COMELEC)</li>
                                                        </ul>
                                                        (Valid ID ng tatanggap (Kopya))
                                                        <ul>
                                                            <li>** Kung walang Valid ID, Voters Certification (COMELEC)</li>
                                                        </ul>
                                                    </li>
                                                    <li>Request letter (Address to Mayor) (Sulat Kahilingan para sa Mayor)</li>
                                                    <li>Costing (itemized) Halaga (Ilista ng detalyado)</li>
                                                </ol>
                                            </Tab>
                                        </Tabs>
                                    </Card>
                                    <Card className="p-3 mb-3">
                                        <h3>Fees</h3>
                                        <p>None required <em>(Hindi kinakailangang magbayad)</em></p>
                                    </Card>
                                    <Card className="p-3 mb-3">
                                        <h3>Availability</h3>
                                        <p>
                                            Monday-Friday, 8:00 am to 5:00pm without noon break <em>(Lunes hanggang biyernes, mula 8:00 ng umaga hanggang 5:00 ng hapon walang pahinga sa tanghali)</em>
                                        </p>
                                    </Card>
                                    <Card className="p-3 mb-3">
                                        <h3>Duration</h3>
                                        <p>
                                            1 Hour and 2 Minutes
                                        </p>
                                    </Card>
                                    <Card className="p-3 mb-3">
                                        <h3>How to Avail of the Service:</h3>
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
                                    </Card>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header><h2>Issuance of Indigency</h2></Accordion.Header>
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
                                <Accordion.Header><h2>Securing Purchase Booklet</h2></Accordion.Header>
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
                                <Accordion.Header><h2>Securing Social Case Study Report</h2></Accordion.Header>
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
                                <Accordion.Header><h2>Securing Pre-Marriage Counselling Certificate (PMC)</h2></Accordion.Header>
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
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Services;