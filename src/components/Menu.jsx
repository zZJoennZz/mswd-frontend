import React from 'react';
import { 
    Container,  
    Nav, 
    Navbar
  } from 'react-bootstrap';

const Menu = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="sm" variant="dark" bg="dark">
                <Container>
                <Navbar.Brand href="/" className="fw-bold">MSWD</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/services">Services</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="#home">FAQ</Nav.Link>
                        <Nav.Link href="#home">Contact Us</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Menu;
