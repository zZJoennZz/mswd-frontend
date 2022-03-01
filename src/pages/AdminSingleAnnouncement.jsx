import React from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Breadcrumb,
    Spinner,
    Row,
    Col,
    Form,
    Button,
    Image
} from 'react-bootstrap';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

import api from '../api/api';

const AdminSingleAnnouncement = () => {

    let { annId } = useParams();
    let [currAnn, setCurrAnn] = React.useState(false);
    let [updated, setUpdated] = React.useState("");
    let [updatedBody, setUpdatedBody] = React.useState("");
    let [annceImg, setAnnceImg] = React.useState("");

    React.useEffect(() => {
        const getAnn = async () => {
            try {
                let res = await api.get(`announcement/${annId}`);
                setCurrAnn(res.data.data);
            } catch (error) {
                setCurrAnn(false);
                alert(error + ". Please contact website administrator!");
            }
        }
        getAnn();
    }, [annId])

    const fileOnChange = (e) => {
        setAnnceImg(e.target.files);
    }

    const onChangeUpdatedText = (e) => setUpdated(e.target.value)
    const sunEditorOnChange = (content) => setUpdatedBody(content)

    const onSubmitUpdated = async (e) => {
        e.preventDefault();

        try {
            let frmData = new FormData();
            
            frmData.append('announcement_title', updated);
            frmData.append('announcement_body', updatedBody)
            frmData.append('announcement_img', annceImg[0]);

            await api.post(`announcement/put/${annId}`, frmData);
            alert("Changes successfully saved!");
        } catch (error) {
            alert(error + ". Please contact your website administrator.");
        }
    }
    
    return (
        <Container fluid>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/announcements">Announcements</Breadcrumb.Item>
                <Breadcrumb.Item active>{currAnn.announcement_title}</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col md={12}>
                    {
                        !currAnn ?
                            <><Spinner animation="border" size="sm" /> Fetching data...</>
                        :
                            <Form onSubmit={onSubmitUpdated}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Announcement Title</Form.Label>
                                    <Form.Control type="text" defaultValue={currAnn.announcement_title} name="announcement_title" id="announcement_title" onChange={onChangeUpdatedText} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Announcement Body</Form.Label>
                                    <SunEditor height="500" defaultValue={currAnn.announcement_body} name="announcement_body" id="announcement_body" onChange={sunEditorOnChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Announcement Image</Form.Label>
                                    <Image className="mb-3" fluid src={currAnn.image_path}></Image>
                                    <Form.Control type="file" name="file" id="file" onChange={fileOnChange} />
                                </Form.Group>
                                <Button type="submit">Save Changes</Button>
                            </Form>
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default AdminSingleAnnouncement;
