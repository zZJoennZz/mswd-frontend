import React from 'react'
import {
    Container,
    Row,
    Col,
    Form,
    Button
} from 'react-bootstrap'

const AdminAddUser = ({ userDets, onSubmitAdd, onChangeField }) => {
    return (
        <Container fluid>
            <Form onSubmit={onSubmitAdd}>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
                            <Form.Control value={userDets.name} type="text" name="name" id="name" onChange={onChangeField} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                            <Form.Control value={userDets.email} type="email" name="email" id="email" onChange={onChangeField} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                            <Form.Control value={userDets.password} type="password" name="password" id="password" onChange={onChangeField} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Button type="submit">Save User</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default AdminAddUser;