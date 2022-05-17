import React from 'react'
import {
    Container,
    Row,
    Col,
    Form,
    Button
} from 'react-bootstrap'
import api from '../api/api';

const AdminManageAcct = ({ saveChanges }) => {
    let [userId, setUserId] = React.useState(0);
    let [userDets, setUserDets] = React.useState({
        'name' : '',
        'last_name' : '',
        'email' : '',
        'password' : ''
    });

    const onChangeField = (e) => setUserDets({...userDets, [e.target.name] : e.target.value});

    const exeSave = (e) => {
        e.preventDefault();
        saveChanges(userDets);
    }

    React.useEffect(() => {
        const getProfile = async () => {
            await api.get('getprofile')
                .then(res => {
                    setUserDets({
                        'name' : res.data.name,
                        'last_name' : res.data.last_name,
                        'email' : res.data.email
                    })
                    setUserId(res.data.id);
            });
        }
        getProfile();
    }, [userId]);

    return (
        <Container fluid>
            <Form onSubmit={exeSave}>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control defaultValue={userDets.name} type="text" name="name1" id="name1" onChange={onChangeField} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control defaultValue={userDets.last_name} type="text" name="last_name1" id="last_name1" onChange={onChangeField} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control defaultValue={userDets.email} type="email" name="email1" id="email1" onChange={onChangeField} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control defaultValue={userDets.password} type="password" name="password1" id="password1" onChange={onChangeField} />
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

export default AdminManageAcct;