import React from 'react';
import { Container,
    Row,
    Col,
    Card, 
    Button,
    Tabs,
    Tab
} from 'react-bootstrap';

const Services = () => {
    return (
        <div className="mt-5 services">
            <h1 className="mt-5 pt-3">Services</h1>
            <Container>
                <Row>
                    <Col md="4">
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Issuance of Social Case Study Report</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Burial/Hospitalization/Financial Assistance</Card.Subtitle>
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Who may avail</Card.Title>
                                <Card.Text style={{ textAlign: 'left' }}>
                                    <ul>
                                        <li>Indigent individuals or families</li>
                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Requirements</Card.Title>
                                <Tabs defaultActiveKey="hospitalization" id="uncontrolled-tab-example" className="mb-3">
                                    <Tab eventKey="burial" title="Burial" style={{ textAlign: "left" }}>
                                        For Indigents
                                        <ul>
                                            <li>Death certificate of deceased family member</li>
                                            <li>Marriage contract or birth certificate as proof of relationship to the deceased family member</li>
                                            <li>Letter request addressed to Municipal Mayor</li>
                                            <li>Certificate of indigency from Punong Barangay</li>
                                            <li>Valid identification card</li>
                                        </ul>
                                        For Senior Citizen
                                        <ul>
                                            <li>Death certificate of deceased senior citizen</li>
                                            <li>Claim advisory form</li>
                                            <li>Certificate of membership</li>
                                            <li>Official receipt of membership fee and monthly dues</li>
                                            <li>Federation ID</li>
                                            <li>Marriage contract if wife is the claimant</li>
                                            <li>Birth certificate and waiver of siblings if child is the claimant</li>
                                        </ul>
                                    </Tab>
                                    <Tab eventKey="hospitalization" title="Hospitalization" style={{ textAlign: "left" }}>
                                        <ul>
                                            <li>Letter request addressed to Municipal Mayor</li>
                                            <li>Certificate of indigency from the Punong Barangay</li>
                                            <li>Valid identification card</li>
                                            <li>Birth certificate or marriage contract of the patient</li>
                                            <li>Billing statement from the hospital</li>
                                        </ul>
                                    </Tab>
                                    <Tab eventKey="financial" title="Financial" style={{ textAlign: "left" }}>
                                        <ul>
                                            <li>Letter request addressed to Municipal Mayor</li>
                                            <li>Certificate of indigency from the Punong Barangay</li>
                                            <li>Valid identification card</li>
                                            <li>Birth certificate or marriage contract of the patient</li>
                                            <li>Medical abstract</li>
                                            <li>Request for laboratory examination/procedures</li>
                                        </ul>
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <Button href="/apply/1" size="lg" variant="primary">Apply</Button>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Issuance of Identification Cards</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Who may avail</Card.Title>
                                <Card.Text style={{ textAlign: 'left' }}>
                                    <ul>
                                        <li>Solo parents</li>
                                        <li>Person with Disabilities (PWD)</li>
                                        <li>Senior citizen</li>
                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Requirements</Card.Title>
                                <Tabs defaultActiveKey="soloparent" id="uncontrolled-tab-example" className="mb-3">
                                    <Tab eventKey="soloparent" title="Solo Parent" style={{ textAlign: "left" }}>
                                        <ul>
                                            <li>Filled up application form</li>
                                            <li>2 copies of 1x1 picture</li>
                                            <li>Any of the three (3):</li>
                                            <ul>
                                                <li>Death certificate of spouse</li>
                                                <li>Certification from Punong Barangay that they are separated</li>
                                                <li>Certification from Punong Barangay that the spouse is imprisoned for more than 1 year</li>
                                            </ul>
                                        </ul> 
                                    </Tab>
                                    <Tab eventKey="pwd" title="PWD" style={{ textAlign: "left" }}>
                                        <ul>
                                            <li>Filled up application form</li>
                                            <li>2 copies of 1x1 picture</li>
                                            <li>Medical certificate indicating type of disability</li>
                                        </ul>
                                    </Tab>
                                    <Tab eventKey="senior" title="Senior Citizens" style={{ textAlign: "left" }}>
                                        <ul>
                                            <li>Filled up application form</li>
                                            <li>2 copies of 1x1 picture</li>
                                            <li>Proof of age (Birth/Baptismal/Marriage certificate or Voters registration record)</li>
                                        </ul>
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <Button href="/apply/2" size="lg" variant="primary">Apply</Button>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Issuance of Purchase Booklet</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Who may avail</Card.Title>
                                <Card.Text style={{ textAlign: 'left' }}>
                                    <ul>
                                        <li>Senior citizen</li>
                                        <li>Person with Disabilities (PWD)</li>
                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Requirements</Card.Title>
                                
                                <Card.Text eventKey="soloparent" title="Solo Parent" style={{ textAlign: "left" }}>
                                    <ul>
                                        <li>Senior citizen/PWD Identification card</li>
                                    </ul> 
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <Button href="/apply/3" size="lg" variant="primary">Apply</Button>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Issuance of Certificate of Indigency</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Who may avail</Card.Title>
                                <Card.Text style={{ textAlign: 'left' }}>
                                    <ul>
                                        <li>Bonafide resident who belongs to marginalized group of families</li>
                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Requirements</Card.Title>
                                <Card.Text style={{ textAlign: 'left' }}>
                                    <div>
                                        PAO and IBP
                                    </div>
                                    <ul>
                                        <li>Certificate of no property from assessor's office</li>
                                        <li>Certificate of indigency from Punong Barangay</li>
                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <Button href="/apply/4" size="lg" variant="primary">Apply</Button>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Issuance of Pre-Marriage Counselling (PMC) Certificate</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Who may avail</Card.Title>
                                <Card.Text style={{ textAlign: 'left' }}>
                                    <ul>
                                        <li>Couples even if they already have a child</li>
                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Requirements</Card.Title>
                                <Card.Text style={{ textAlign: 'left' }}>
                                    <ul>
                                        <li>Accomplished PMC registration form</li>
                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <Button href="/apply/5" size="lg" variant="primary">Apply</Button>
                        </Card>
                    </Col>
                    <Col md="4">
                        
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Services;