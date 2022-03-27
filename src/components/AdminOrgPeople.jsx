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

    let [positionName, setPositionName] = React.useState('');
    let [positionDesc, setPositionDesc] = React.useState('');

    const onPosNameChange = (e) => setPositionName(e.target.value);
    const onPosDescChange = (e) => setPositionDesc(e.target.value);

    const changeDateFormat = (dateToChange) => {
        let theDate = new Date(dateToChange);
        return theDate.toLocaleDateString("en-US");
    }

    const modalOnHide = () => setModalShow(false);

    const openModal = (frmMode, id = 0, posName, posDesc) => {
        if (frmMode === 'new') {
            setFrmTitle('New Person');
            setFrmContent(<NewPerson textPersonName={onPosNameChange} textPersonDesc={onPosDescChange} />);
            setFrmBtnText('Save Person');
            setModalShow(true);
        } else if(frmMode === 'edit') {
            setFrmTitle(`Edit ${posName}`);
            setEditId(id);
            setFrmContent(<EditPosition textPosName={onPosNameChange} textPosDesc={onPosDescChange} positionName={posName} positionDesc={posDesc} />);
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
            position_name : positionName,
            position_desc : positionDesc
        }

        if (frmTitle === 'New Person') {
            try { 
                await axios.post(`${process.env.REACT_APP_API}org/position/post`, data, {headers: headers})
                    .then(res => {
                        setToastMsg("Position is saved");
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
                await axios.put(`${process.env.REACT_APP_API}org/position/put/${editId}`, data, {headers: headers})
                    .then(res => {
                        setToastMsg("Position changes is saved");
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

    const delPosition = async (posId) => {
        let headers = {
            'Authorization' : localStorage.getItem('token'),
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Allow-Control-Allow-Origin' : '*',
        }
        let a = window.confirm("Are you sure to delete this position?");
        if (a) {
            try {
                await axios.delete(`${process.env.REACT_APP_API}org/position/delete/${posId}`, {headers: headers})
                    .then(res => {
                        setToastMsg("Position successfully deleted");
                        setShowToast(true);
                    }).catch(error => {
                        setToastMsg(error);
                        setShowToast(true);
                    })
            } catch (error) {
                setToastMsg(error);
                setShowToast(true);
            }
        }
    }

    React.useEffect(() => {
        const getPpl = async () => {
            let headers = {
                'Authorization' : localStorage.getItem('token'),
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Allow-Control-Allow-Origin' : '*',
            }
            
            try {
                let res = await axios.get(`${process.env.REACT_APP_API}org/person`, {headers: headers});
                setOrgPer(sortByDesc(res.data.data));
            } catch (error) {
                setOrgPer(false)
            }
        }
        getPpl();
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
                                        <td onClick={openModal.bind(this, "edit", d.id, d.position_name, d.position_desc)} style={{ cursor: 'pointer' }}>{d.first_name + " " + d.middle_initial + " " + d.last_name}</td>
                                        <td>{changeDateFormat(d.created_at)}</td>
                                        <td>{changeDateFormat(d.updated_at)} <Button onClick={delPosition.bind(this, d.id)} style={{ float: 'right' }} variant="danger" size="sm">X</Button></td>
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

const NewPerson = ({textPosName, textPosDesc}) => {
    
    return (
        <Form>
            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="first_name" id="first_name" onChange={textPosName} />
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Middle Initial</Form.Label>
                        <Form.Control type="text" name="middle_initial" id="middle_initial" onChange={textPosName} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="last_name" id="last_name" onChange={textPosName} />
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Suffix</Form.Label>
                        <Form.Control type="text" name="suffix" id="suffix" onChange={textPosName} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control type="text" name="suffix" id="suffix" onChange={textPosName} />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="date" name="birthday" id="birthday" onChange={textPosName} />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}

const EditPosition = ({positionName, textPosName, textPosDesc, positionDesc}) => {
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Division Name</Form.Label>
                <Form.Control type="text" defaultValue={positionName} name="position_name" id="position_name" onChange={textPosName} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Position Description</Form.Label>
                <Form.Control type="text" defaultValue={positionDesc} name="position_desc" id="position_desc" onChange={textPosDesc} />
            </Form.Group>
        </Form>
    )
}

export default AdminOrgPeople;