import React from 'react';

import axios from 'axios';

import {
    Container,
    Button,
    Table,
    Spinner,
    Form,
    Row,
    Col
} from 'react-bootstrap';

import { sortByDesc, changeDateFormat } from '../fn/functions';

import GlobalToast from '../components/GlobalToast';

import FormModal from './FormModal';

const AdminOrgChart = () => {
    let [orgChart, setOrgChart] = React.useState(false);

    //modal
    let [show, setShow] = React.useState(false);
    let [frmTitle, setFrmTitle] = React.useState('');
    let [frmContent, setFrmContent] = React.useState('');
    let [frmBtnText, setFrmBtnText] = React.useState('');
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    //toast
    let [showToast, setShowToast] = React.useState(false);
    let [toastMsg, setToastMsg] = React.useState("Nothing to see here");

    //form data
    let [personId, setPersonId] = React.useState(0);
    let [positionId, setPositionId] = React.useState(0);
    let [divisionId, setDivisionId] = React.useState(0);
    let [orgId, setOrgId] = React.useState(0);

    const openModal = (frmMode, data = {}) => {
        if (frmMode === 'new') {
            setFrmTitle('New Organization Entry');
            setFrmContent(<NewOrgChart textOnChange={textOnChange} />);
            setFrmBtnText('Save Entry');
            handleOpen();
        } else if (frmMode === 'edit') {
            setOrgId(data.id);
            setFrmTitle('Edit Organization Entry');
            setFrmContent(<EditOrgChart textOnChange={textOnChange} data={data} />);
            setFrmBtnText('Save Changes');
            handleOpen();
        }
    }

    const textOnChange = (e) => {
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        if (fieldName === 'person_id') {
            setPersonId(fieldValue);
        } else if (fieldName === 'position_id') {
            setPositionId(fieldValue);
        } else if (fieldName === 'division_id') {
            setDivisionId(fieldValue);
        }
    }

    const onSaveBtn = () => {
        let headers = {
            'Authorization' : localStorage.getItem('token'),
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Allow-Control-Allow-Origin' : '*',
        }

        let formData = {
            person_id : personId,
            position_id : positionId,
            division_id : divisionId
        }

        if (frmBtnText === 'Save Entry') {
            try {
                axios.post(`${process.env.REACT_APP_API}org/chart/post`, formData, {headers : headers})
                    .then(res => {
                        setToastMsg("Entry is saved");
                        setShowToast(true);
                        handleClose();
                    })
                    .catch(error => {
                        setToastMsg(error);
                        setShowToast(true);
                        handleClose();
                    })
            } catch (error) {
                setToastMsg(error);
                setShowToast(true);
                handleClose();
            }
        } else if (frmBtnText === 'Save Changes') {
            try {
                axios.put(`${process.env.REACT_APP_API}org/chart/put/${orgId}`, formData, {headers : headers})
                    .then(res => {
                        setToastMsg("Entry is saved");
                        setShowToast(true);
                        handleClose();
                    })
                    .catch(error => {
                        setToastMsg(error);
                        setShowToast(true);
                        handleClose();
                    })
            } catch (error) {
                setToastMsg(error);
                setShowToast(true);
                handleClose();
            }
        }
    }

    const delEntry = async (orgId) => {
        let a = window.confirm("Are you sure to delete this record? You cannot undo this.");
        if (a) {
            let headers = {
                'Authorization' : localStorage.getItem('token'),
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Allow-Control-Allow-Origin' : '*',
            }
            try {
                await axios.delete(`${process.env.REACT_APP_API}org/chart/delete/${orgId}`, {headers: headers})
                    .then(res => {
                        setToastMsg(res.data.message);
                        setShowToast(true);
                        handleClose();
                    })
                    .catch(error => {
                        setToastMsg(error);
                        setShowToast(true);
                        handleClose();
                    })
            } catch (error) {
                setToastMsg(error);
                setShowToast(true);
                handleClose();
            }
        }
    }

    React.useEffect(() => {
        const getOrgChart = async () => {
            await axios.get(`${process.env.REACT_APP_API}org`)
                .then(res => setOrgChart(sortByDesc(res.data.data)));
        }

        getOrgChart();
    }, [showToast]);

    return (
        <Container className="org-body" style={{ maxHeight: '500px', overflow: 'auto'}} fluid>
            <h3>Organization</h3>
            <Button onClick={openModal.bind(this, 'new')} className="mb-3">Add New</Button>
            {
                !orgChart ?
                    <div>
                        <Spinner animation="border" />
                    </div>
                :
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Division</th>
                                <th width="15%">Created At</th>
                                <th width="15%">Updated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orgChart.map(d => 
                                    <tr key={d.id}>
                                        <td onClick={openModal.bind(this, "edit", d)} style={{ cursor: 'pointer' }}>{d.first_name + ' ' + d.middle_initial + ' ' + d.last_name}</td>
                                        <td>{d.position_name}</td>
                                        <td>{d.division_name}</td>
                                        <td>{changeDateFormat(d.created_at)}</td>
                                        <td>{changeDateFormat(d.updated_at)} <Button onClick={delEntry.bind(this, d.id)} style={{ float: 'right' }} variant="danger" size="sm">X</Button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
            }
            <FormModal 
                show={show}
                onHide={handleClose}
                btnclick={onSaveBtn}
                title={frmTitle}
                content={frmContent}
                btntxt={frmBtnText}
            />
            <GlobalToast onClose={() => setShowToast(false)} show={showToast} msg={toastMsg} title="Saved" />
        </Container>
    )
}

const NewOrgChart = ({textOnChange}) => {
    let [personList, setPersonList] = React.useState(false);
    let [positionList, setPositionList] = React.useState(false);
    let [divisionList, setDivisionList] = React.useState(false);
    React.useEffect(() => {
        let isActive = true;
        let headers = {
            'Authorization' : localStorage.getItem('token'),
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Allow-Control-Allow-Origin' : '*',
        }
        const getPerson = async () => {
            await axios.get(`${process.env.REACT_APP_API}org/person`, {headers: headers})
                .then(res => isActive && setPersonList(res.data.data));
        }
        const getPosition = async () => {
            await axios.get(`${process.env.REACT_APP_API}org/position`, {headers: headers})
                .then(res => isActive && setPositionList(res.data.data));
        }
        const getDivision = async () => {
            await axios.get(`${process.env.REACT_APP_API}org/division`, {headers: headers})
                .then(res => isActive && setDivisionList(res.data.data));
        }
        getPerson();
        getPosition();
        getDivision();
        return () => isActive = false;
    }, []);
    return (
        !divisionList || !personList || !positionList ? 
            "Loading..."
        :
        <Form>
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-3">
                        <Form.Label>Person</Form.Label>
                        <Form.Select name="person_id" id="person_id" onChange={textOnChange}>
                            <option disabled>Select</option>
                            {
                                !personList ?
                                    "Loading..."
                                :
                                    personList.map(d => 
                                        <option key={d.id} value={d.id}>{d.first_name + ' ' + d.middle_initial + ' ' + d.last_name}</option>
                                    )
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-3">
                        <Form.Label>Position</Form.Label>
                        <Form.Select name="position_id" id="position_id" onChange={textOnChange}>
                            <option disabled>Select</option>
                            {
                                !positionList ?
                                    "Loading..."
                                :
                                    positionList.map(d =>
                                        <option key={d.id} value={d.id}>{d.position_name}</option>    
                                    )
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form.Group>
                        <Form.Label>Division</Form.Label>
                        <Form.Select name="division_id" id="division_id" onChange={textOnChange}>
                            <option disabled>Select</option>
                            {
                                !divisionList ?
                                    "Loading..."
                                :
                                    divisionList.map(d =>
                                        <option key={d.id} value={d.id}>{d.division_name}</option>    
                                    )
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}

const EditOrgChart = ({textOnChange, data}) => {
    let [personList, setPersonList] = React.useState(false);
    let [positionList, setPositionList] = React.useState(false);
    let [divisionList, setDivisionList] = React.useState(false);
    let [orgId, setOrgId] = React.useState(0);

    React.useEffect(() => {
        let isActive = true;
        let headers = {
            'Authorization' : localStorage.getItem('token'),
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Allow-Control-Allow-Origin' : '*',
        }

        const getOrgId = async () => {
            await axios.get(`${process.env.REACT_APP_API}org/chart/${data.id}`, {headers: headers})
                .then(res => {
                    isActive && setOrgId(res.data.data)
                    return true;
                });

            return false;
        }

        const getPerson = async () => {
            await axios.get(`${process.env.REACT_APP_API}org/person`, {headers: headers})
                .then(res => isActive && setPersonList(res.data.data));
        }
        const getPosition = async () => {
            await axios.get(`${process.env.REACT_APP_API}org/position`, {headers: headers})
                .then(res => isActive && setPositionList(res.data.data));
        }
        const getDivision = async () => {
            await axios.get(`${process.env.REACT_APP_API}org/division`, {headers: headers})
                .then(res => isActive && setDivisionList(res.data.data));
        }
        getOrgId();
        getPerson();
        getPosition();
        getDivision();
        return () => isActive = false;
    }, [data.id]);
    return (
        !divisionList || !personList || !positionList ? 
            "Loading..."
        :
        <Form>
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-3">
                        <Form.Label>Person {data.person_id}</Form.Label>
                        <Form.Select name="person_id" id="person_id" onChange={textOnChange} defaultValue={orgId.person_id}>
                            <option disabled>Select</option>
                            {
                                !personList ?
                                    "Loading..."
                                :
                                    personList.map(d => 
                                        <option key={d.id} value={d.id}>{d.first_name + ' ' + d.middle_initial + ' ' + d.last_name}</option>
                                    )
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-3">
                        <Form.Label>Position</Form.Label>
                        <Form.Select name="position_id" id="position_id" onChange={textOnChange} defaultValue={orgId.position_id}>
                            <option disabled>Select</option>
                            {
                                !positionList ?
                                    "Loading..."
                                :
                                    positionList.map(d =>
                                        <option key={d.id} value={d.id}>{d.position_name}</option>    
                                    )
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form.Group>
                        <Form.Label>Division</Form.Label>
                        <Form.Select name="division_id" id="division_id" onChange={textOnChange} defaultValue={orgId.division_id}>
                            <option disabled>Select</option>
                            {
                                !divisionList ?
                                    "Loading..."
                                :
                                    divisionList.map(d =>
                                        <option key={d.id} value={d.id}>{d.division_name}</option>    
                                    )
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}

export default AdminOrgChart;