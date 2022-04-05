import React from 'react';
//import { Link } from 'react-router-dom';

import {
    Container,
    Button,
    Table,
    Spinner,
    Form,
    Row,
    Col
} from 'react-bootstrap';

import axios from 'axios';

import FormModal from './FormModal';

import { sortByDesc } from '../fn/functions';

import GlobalToast from '../components/GlobalToast';

const AdminOrgPeople = () => {
    let [modalShow, setModalShow] = React.useState(false);
    let [frmTitle, setFrmTitle] = React.useState('');
    let [frmContent, setFrmContent] = React.useState('');
    let [frmBtnText, setFrmBtnText] = React.useState('');

    let [showToast, setShowToast] = React.useState(false);
    let [toastMsg, setToastMsg] = React.useState("Nothing to see here");

    let [editId, setEditId] = React.useState(0);
    
    let [orgPer, setOrgPer] = React.useState(0);

    let [fName, setFName] = React.useState('');
    let [mInitial,setMInitial] = React.useState('');
    let [lName, setLName] = React.useState('');
    let [nSuffix, setNSuffix] = React.useState('');
    let [gender, setGender] = React.useState(3);
    let [birthday, setBirthday] = React.useState('');

    const textFormOnChange = (e) => {
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        switch(fieldName){
            case 'first_name':
                setFName(fieldValue);
                break;
            case 'middle_initial':
                setMInitial(fieldValue);
                break;  
            case 'last_name':
                setLName(fieldValue); 
                break;
            case 'suffix':
                setNSuffix(fieldValue); 
                break;
            case 'gender':
                setGender(fieldValue); 
                break;
            case 'birthday':
                setBirthday(fieldValue); 
                break;
            default:
                return;
        }
    }

    const changeDateFormat = (dateToChange) => {
        let theDate = new Date(dateToChange);
        return theDate.toLocaleDateString("en-US");
    }

    const modalOnHide = () => setModalShow(false);

    const openModal = (frmMode, id = 0, firstName, middleInitial, lastName, suffix, gender, birthday) => {
        if (frmMode === 'new') {
            setFrmTitle('New Person');
            setFrmContent(<NewPerson textOnChange={textFormOnChange} />);
            setFrmBtnText('Save Person');
            setModalShow(true);
        } else if(frmMode === 'edit') {
            setFrmTitle(`Edit ${firstName + ' ' + middleInitial + ' ' + lastName}`);
            setEditId(id);
            setFrmContent(<EditPerson textOnChange={textFormOnChange} firstName={firstName} middleInitial={middleInitial} lastName={lastName} suffix={suffix} gender={gender} birthday={birthday} />);
            setFrmBtnText('Save Changes');
            setModalShow(true);
        }else {
            alert('Something went wrong. Please try again.');
        }
    };

    const onSaveBtn = async () => {
        let headers = {
            'Authorization' : localStorage.getItem('token'),
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Allow-Control-Allow-Origin' : '*',
        }
        
        let data = {
            first_name : fName,
            middle_initial : mInitial,
            last_name : lName,
            suffix: nSuffix,
            gender: gender,
            birthday: birthday
        }

        if (frmTitle === 'New Person') {
            try { 
                await axios.post(`${process.env.REACT_APP_API}org/person/post`, data, {headers: headers})
                    .then(res => {
                        setToastMsg("Person is saved");
                        setShowToast(true);
                        setModalShow(false);
                    }).catch(error => {
                        setToastMsg(error);
                        setShowToast(true);
                        setModalShow(false);
                    })
            } catch (error) {
                setToastMsg(error);
                setShowToast(true);
                setModalShow(false);
            }
        } else {
            try {
                await axios.put(`${process.env.REACT_APP_API}org/person/put/${editId}`, data, {headers: headers})
                    .then(res => {
                        setToastMsg("Person changes is saved");
                        setShowToast(true);
                        setModalShow(false);
                    }).catch(error => {
                        setToastMsg(error);
                        setShowToast(true);
                        setModalShow(false);
                    })
            } catch (error) {
                setToastMsg(error);
                setShowToast(true);
                setModalShow(false);
            }
        }
    }

    const delPerson = async (perId) => {
        let headers = {
            'Authorization' : localStorage.getItem('token'),
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Allow-Control-Allow-Origin' : '*',
        }
        let a = window.confirm("Are you sure to delete this person?");
        if (a) {
            try {
                await axios.delete(`${process.env.REACT_APP_API}org/person/delete/${perId}`, {headers: headers})
                    .then(res => {
                        if (res.data.success) {
                            setToastMsg("Person successfully deleted");
                            setShowToast(true);
                        } else {
                            setToastMsg("Person is used in the organization chart.");
                            setShowToast(true);
                        }
                    }).catch(error => {
                        setToastMsg(error);
                        setShowToast(true);
                    });
            } catch (error) {
                setToastMsg(error);
                setShowToast(true);
            }
        }
    }

    React.useEffect(() => {
        let isActive = true;
        const getPpl = async () => {
            let headers = {
                'Authorization' : localStorage.getItem('token'),
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Allow-Control-Allow-Origin' : '*',
            }
            
            try {
                let res = await axios.get(`${process.env.REACT_APP_API}org/person`, {headers: headers});
                isActive && setOrgPer(sortByDesc(res.data.data));
            } catch (error) {
                isActive && setOrgPer(false)
            }
        }
        getPpl();
        return () => isActive = false;
    }, [showToast])

    return (
        <Container className="org-body" style={{ maxHeight: '500px', overflow: 'auto'}} fluid>
            <h3>People</h3>

            <Button onClick={openModal.bind(this, 'new')} className="mb-3">Add New</Button>
            {
                !orgPer ?
                    <div>
                        <Spinner animation="border" />
                    </div>
                :
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orgPer.map(d => 
                                    <tr key={d.id}>
                                        <td onClick={openModal.bind(this, "edit", d.id, d.first_name, d.middle_initial, d.last_name, d.suffix, d.gender, d.birthday)} style={{ cursor: 'pointer' }}>{d.first_name + " " + d.middle_initial + " " + d.last_name}</td>
                                        <td>{changeDateFormat(d.created_at)}</td>
                                        <td>{changeDateFormat(d.updated_at)} <Button onClick={delPerson.bind(this, d.id)} style={{ float: 'right' }} variant="danger" size="sm">X</Button></td>
                                    </tr>    
                                )
                            }
                        </tbody>
                    </Table>
            }
            <FormModal 
                show={modalShow}
                onHide={modalOnHide}
                btnclick={onSaveBtn}
                title={frmTitle}
                content={frmContent}
                btntxt={frmBtnText}
            />
            <GlobalToast onClose={() => setShowToast(false)} show={showToast} msg={toastMsg} title="Saved" />
        </Container>
    )
}

const NewPerson = ({textOnChange}) => {
    
    return (
        <Form>
            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="first_name" id="first_name" onChange={textOnChange} />
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Middle Initial</Form.Label>
                        <Form.Control type="text" name="middle_initial" id="middle_initial" onChange={textOnChange} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="last_name" id="last_name" onChange={textOnChange} />
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Suffix</Form.Label>
                        <Form.Control type="text" name="suffix" id="suffix" onChange={textOnChange} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select name="gender" id="gender" onChange={textOnChange}>
                            <option value={0}>None</option>
                            <option value={1}>Male</option>
                            <option value={1}>Female</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="date" name="birthday" id="birthday" onChange={textOnChange} />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}

const EditPerson = ({textOnChange, firstName, middleInitial, lastName, suffix, gender, birthday}) => {
    return (
        <Form>
            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control defaultValue={firstName} type="text" name="first_name" id="first_name" onChange={textOnChange} />
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Middle Initial</Form.Label>
                        <Form.Control defaultValue={middleInitial} type="text" name="middle_initial" id="middle_initial" onChange={textOnChange} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control defaultValue={lastName} type="text" name="last_name" id="last_name" onChange={textOnChange} />
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Suffix</Form.Label>
                        <Form.Control defaultValue={suffix} type="text" name="suffix" id="suffix" onChange={textOnChange} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select defaultValue={gender} name="gender" id="gender" onChange={textOnChange}>
                            <option value={0}>None</option>
                            <option value={1}>Male</option>
                            <option value={2}>Female</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control defaultValue={birthday} type="date" name="birthday" id="birthday" onChange={textOnChange} />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}

export default AdminOrgPeople;