import React from 'react'
import {
    Container,
    Row,
    Col,
    Table,
    Form,
    Button
} from 'react-bootstrap';

import api from '../api/api';

const AdminManageAcct = ({usrList, saveChanges}) => {
    let [userId, setUserId] = React.useState(0);
    let [userDetail, setUserDetail] = React.useState({
        'name' : '',
        'email' : '',
        'password' : ''
    });
    let [userDetail1, setUserDetail1] = React.useState({
        'name' : '',
        'email' : '',
        'password' : ''
    });

    const changeDateFormat = (dateToChange) => {
        let theDate = new Date(dateToChange);
        return theDate.toLocaleDateString("en-US");
    }

    const onChangeText = (e) => setUserDetail1({...userDetail1, [e.target.name] : e.target.value});

    const onSubmitSave = async (e) => {
        e.preventDefault();
        console.log(userDetail1);
        saveChanges(userDetail1, userId);
    }

    React.useEffect(() => {
        if (userId !== 0) {
            const getUser = async () => {
                api.get(`getsingle/${userId}`)
                    .then(res => setUserDetail(res.data.data))
                    .catch(e => alert(e));
            }
            getUser();
        }
    }, [userId]);

    return (
        <Container fluid>
            {
                userId === 0 ?
                <Row>
                    <Col md={12}>
                        {
                            usrList && 
                            <Table responsive bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th width="40%">Name</th>
                                        <th width="20%">Date Created</th>
                                        <th width="20%">Last Updated</th>
                                        <th style={{ textAlign: "right" }} width="20%">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        usrList.map(d => 
                                            <tr key={d.id}>
                                                <td>{d.name}</td>
                                                <td>{changeDateFormat(d.created_at)}</td>
                                                <td>{changeDateFormat(d.updated_at)}</td>
                                                <td style={{ textAlign: "right" }}><Button size="sm" onClick={() => setUserId(d.id)} disabled={d.id === 1 ? true : false}>Edit</Button> <Button variant="danger" size="sm" disabled={d.id === 1 ? true : false}>X</Button></td>
                                            </tr>    
                                        )
                                    }
                                </tbody>
                            </Table>
                        }
                    </Col>
                </Row>
                :
                <Row>
                    <Col md={12}>
                        <span style={{ cursor: "pointer" }} onClick={() => setUserId(0)}>{"<"} Back</span>
                    </Col>
                    <Form onSubmit={onSubmitSave}>
                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control onChange={onChangeText} defaultValue={userDetail.name} type="text" name="name" id="name" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control onChange={onChangeText} defaultValue={userDetail.email} type="email" name="email" id="email" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={onChangeText} type="password" name="password" id="password" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Button type="submit">Save Changes</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
            }  
        </Container>
    )
}

export default AdminManageAcct;