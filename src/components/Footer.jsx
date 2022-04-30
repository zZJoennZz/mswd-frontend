import React from 'react';
import { 
    Container,
    Row,
    Col
} from 'react-bootstrap';
import govBadge from '../img/govph-seal-mono-footer.jpg';

const Footer = () => {
    return (
        <div className="p-3" style={{ background: '#EFEFEF' }}>
            <Container fluid>
                <Row style={{ fontSize: '12px', textAlign: 'left', color: '#505050', padding: '2em 0' }}>
                    <Col md={2}>
                        <img src={govBadge} height="200px" alt="Government PH Seal" />
                    </Col>
                    <Col md={4}>
                        <p style={{ textTransform: 'uppercase' }}><strong>Rebublic of the Philippines</strong></p>
                        <p>All content is in the public domain unless otherwise stated.</p>
                    </Col>
                    <Col md={4}>
                        <p style={{ textTransform: 'uppercase' }}><strong>About GovPH</strong></p>
                        <p>All content is in the public domain unless otherwise stated.</p>
                        <ul style={{ listStyleType: 'none', marginTop: '1em', padding: '0' }}>
                            <li><a href="http://www.gov.ph/" target="_blank" rel="noreferrer">GOV.PH</a></li>
                            <li><a href="http://www.gov.ph/data" target="_blank" rel="noreferrer">Open Data Portal</a></li>
                            <li><a href="http://www.officialgazette.gov.ph/" target="_blank" rel="noreferrer">Official Gazette</a></li>
                        </ul>
                    </Col>
                    <Col md={2}>
                        <p style={{ textTransform: 'uppercase' }}><strong>Government Links</strong></p>
                        <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
                            <li><a href="https://op-proper.gov.ph/" target="_blank" rel="noreferrer">Office of the President</a></li>
                            <li><a href="http://ovp.gov.ph/" target="_blank" rel="noreferrer">Office of the Vice President</a></li>
                            <li><a href="http://www.senate.gov.ph/" target="_blank" rel="noreferrer">Senate of the Philippines</a></li>
                            <li><a href="http://www.congress.gov.ph/" target="_blank" rel="noreferrer">House of Representatives</a></li>
                            <li><a href="http://sc.judiciary.gov.ph/" target="_blank" rel="noreferrer">Supreme Court</a></li>
                            <li><a href="http://ca.judiciary.gov.ph/" target="_blank" rel="noreferrer">Court of Appeals</a></li>
                            <li><a href="http://sb.judiciary.gov.ph/" target="_blank" rel="noreferrer">Sandiganbayan</a></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;
