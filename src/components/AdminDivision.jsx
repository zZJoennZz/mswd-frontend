import React from 'react';
//import { Link } from 'react-router-dom';
import {
    Container,
    Button,
    
    Table,
    Spinner,
    Form
} from 'react-bootstrap';

import axios from 'axios';

import FormModal from './FormModal';

import { sortByDesc } from '../fn/functions';

const AdminDivision = () => {
    let [modalShow, setModalShow] = React.useState(false);
    let [frmTitle, setFrmTitle] = React.useState('');
    let [frmContent, setFrmContent] = React.useState('');
    let [frmBtnText, setFrmBtnText] = React.useState('');

    let [editId, setEditId] = React.useState(0);
    
    let [division, setDivision] = React.useState(0);

    const changeDateFormat = (dateToChange) => {
        let theDate = new Date(dateToChange);
        return theDate.toLocaleDateString("en-US");
    }

    const modalOnHide = () => setModalShow(false);

    const openModal = (frmMode, id = 0, div_name) => {
        if (frmMode === 'new') {
            setFrmTitle('New Division');
            setFrmContent(<NewDivision />);
            setFrmBtnText('Save Division');
            setModalShow(true);
        } else if(frmMode === 'edit') {
            setFrmTitle(`Edit ${div_name}`);
            setEditId(id);
            setFrmContent(<EditDivision divName={div_name} />);
            setFrmBtnText('Save Changes');
            setModalShow(true);
        }else {
            alert('Something went wrong. Please try again.');
        }
    };

    const onSaveBtn = async () => {
        if (frmTitle === 'New Division') {
            alert("NEW");
        } else {
            alert(editId);
        }
    }

    React.useEffect(() => {
        const getDivision = async () => {
            let headers = {
                'Authorization' : localStorage.getItem('token'),
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Allow-Control-Allow-Origin' : '*',
            }
            try {
                let res = await axios.get(`${process.env.REACT_APP_API}org/division`, {headers: headers});
                setDivision(sortByDesc(res.data.data));
            } catch (error) {
                setDivision(false)
            }
        }
        getDivision();
    }, [])

    return (
        <Container fluid>
            <Button onClick={openModal.bind(this, 'new')} className="mb-3">Add New</Button>
            {
                !division ?
                    <div>
                        <Spinner animation="border" />
                    </div>
                :
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>Division Name</th>
                                <th>Under Of</th>
                                <th>Order</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                division.map(d => 
                                    <tr key={d.id} style={{ cursor: 'pointer' }} onClick={openModal.bind(this, "edit", d.id, d.division_name)}>
                                        <td>{d.division_name}</td>
                                        <td>{d.sub_division_of === 0 ? "N/A" : division.filter(divi => divi.id === d.sub_division_of)[0].division_name}</td>
                                        <td>{d.order}</td>
                                        <td>{changeDateFormat(d.created_at)}</td>
                                        <td>{changeDateFormat(d.updated_at)}</td>
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
        </Container>
    )
}

const NewDivision = () => {
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Division Name</Form.Label>
                <Form.Control type="text" />
            </Form.Group>
        </Form>
    )
}

const EditDivision = ({divName}) => {
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Division Name</Form.Label>
                <Form.Control type="text" defaultValue={divName} />
            </Form.Group>
        </Form>
    )
}

export default AdminDivision;