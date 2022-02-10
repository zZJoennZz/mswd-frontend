import React, { useState } from 'react';

import api from '../api/api';

import {
    Form,
    Button,
    Container,
    Row,
    Col
} from 'react-bootstrap';

const AdminLogin = ({ checkAuth }) => {

    let [frmOnChange, setFrmOnChange] = useState({});

    const textOnChange = (e) => {
        setFrmOnChange({...frmOnChange, [e.target.name]: e.target.value });
    }

    const frmOnSubmit = async (e) => {
        e.preventDefault();

        const frmData = new FormData();
        frmData.append("email", frmOnChange.username);
        frmData.append("password", frmOnChange.password);
        
        try {
            let res = await api.post("signin", frmData);
            if (res.status === 200) {
                alert("You are logged in!");
                localStorage.removeItem("token");
                localStorage.setItem("token", `Bearer ` + res.data.token);
                checkAuth(true);
            }
        } catch(e) {
            alert("Logging in failed Error: " + e);
            localStorage.removeItem("token");
            checkAuth(false);
        }
    }

    return (
        <Container fluid>
            <Row style={{ marginTop: "30vh" }}>
                <Col md={3}></Col>
                <Col md={6} className="text-start p-4" style={{ background: "#fafafa", borderRadius: "5px", boxShadow: "0px 1px 5px 0px #bcc8e8" }}>
                    <Row>
                        <Col md={3} style={{ display: "flex" }}>
                            <img height={64} width={64} style={{ margin: "auto" }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAACZklEQVR4nO2avW4UMRCAv0B0DUW6SCnSUVCEEqRAeiBPQJ+HoAeJXHiB9ClSAD1UgAR5EBQuoIgiKahDseO7ZbPOru2Z8x3rTxqt1j8z41nv2Hs+KBQKBXtOgK+5ncjJlcjCcSu3A7mxDMDdyLqF4ITZtA2VbdHxrqav+Qq8let2gh2VnLLiKY99X336upi3vSmDzwGryvrck1xp3Dfpqp8bVjNgTa5nLXWTRpusWAXggVyPWupc2UMj2yrEZmYnH0TPCNineuo/gNdSBvBRwY4ZqY5dAS9v0P9KyUYy2sugT/8duf4x0h+NRQ64BN4De7Wy3yKOPWlzaWBfhZjp+Bl4RvvS+kKkySrwVPoudQ4YNwblOAZuN+TY0/Ygwq4ZIU58qg1mDFzU9BwCm7X7TSlzXFCtEi4QXwJtmxHixBPp8ybCMdf+QO53A22bEeLEuvQ5r5U9BjaA5/z7xA+lbEPauPa/pH490HYyGstgn329Vhtfn2gG/zVYApDbgdyUAOR2IDeDD0Bh6Fj/HmBN2QilUgLgKf82Vy/iGPRxe0GL5Cx6A10rSYhtp0vd35IEczvQE3fGuJPVi0A0f84a99DXJRPRM2IJGVE5PyE9EGMGyg6zmTBF6w8SWt8OlquSpe7kaenLCyOqM4MzRRv7iuM2RyP5LXUSdEnvUW5HcqF2AuRjWTZChUJG7gE/0cvGsXIO3Dce6zW2mB17O8wTk8eOC8JWj767wCnXg3hK9ZecXtQHvygB6BuEtsE7+d7H+KJM+9jXoav/FNP9cUa6Zuj/Ou5w2iIxj/dbk6SnWXaChUJh0PwFeVn1lRtubEwAAAAASUVORK5CYII=" alt="admin icon" />
                        </Col>
                        <Col md={9}> 
                            <Form onSubmit={frmOnSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" onChange={textOnChange} name="username" id="username" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" onChange={textOnChange} name="password" id="password" placeholder="Password" />
                                </Form.Group>
                            
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Col>
                <Col md={3}></Col>
            </Row>
        </Container>
    );
};

export default AdminLogin;
