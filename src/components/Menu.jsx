import React from 'react';

import { 
    Container,  
    Nav, 
    Navbar,
    Form,
    Button,
    NavDropdown
  } from 'react-bootstrap';

const Menu = () => {
    let [appId, setAppId] = React.useState(false);

    const onSubmitTrack = (e) => {
        e.preventDefault();
        window.location.href = `/track/${appId}`;
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" variant="light" bg="light" style={{ fontSize: '18px' }}>
                <Container>
                    <Navbar.Brand href="/" className="fw-bold">MSWD</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto my-2 my-lg-0">
                            <Nav.Link href="/">Home</Nav.Link>
                            <NavDropdown title="Services" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/services">Services</NavDropdown.Item>
                                <NavDropdown.Item href="/eservices">e-Services</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/faq">FAQ</Nav.Link>
                            <Nav.Link href="/contact-us">Contact Us</Nav.Link>
                            <Nav.Link href="/download-forms">Downloadable Forms</Nav.Link>
                        </Nav>
                        <Form onSubmit={onSubmitTrack} className="d-flex">
                            <Form.Control
                                type="text"
                                placeholder="Track your application"
                                className="me-2"
                                aria-label="Track your application"
                                onChange={(e) => setAppId(e.target.value)}
                            />
                            <Button type="submit" variant="primary">Track</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Menu;
