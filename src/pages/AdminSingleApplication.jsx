import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Breadcrumb,
    Row,
    Col,
    Spinner
} from 'react-bootstrap';

import api from '../api/api';

import ApplicationFormSoloParent from '../components/ApplicationFormSoloParent';
import ApplicationFormPwd from '../components/ApplicationFormPwd';
import ApplicationFormSeniorCitizen from '../components/ApplicationFormSeniorCitizen';

const AdminSingleApplication = () => {
    let { appId } = useParams();

    let [appliData, setAppliData] = useState(false);
    let [appliFiles, setAppliFiles] = useState(false);

    useEffect(() => {
        const getApp = async () => {
            let res = await api.get(`application/${appId}`);
            setAppliData(res.data.data);
            setAppliFiles(res.data.files);
        }
        getApp();
    }, [appId])

    return (
        <Container fluid>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/applications/">Applications</Breadcrumb.Item>
                <Breadcrumb.Item active>{appliData && appliData.application_id}</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col md={12}>
                    {
                        appliData || appliFiles ? JSON.parse(appliData.application_data).appliType === 1 ?
                            <ApplicationFormSoloParent appFiles={appliFiles} appData={JSON.parse(appliData.application_data)} />
                        :
                            JSON.parse(appliData.application_data).appliType === 2 ?
                                <ApplicationFormPwd appFiles={appliFiles} subDate={appliData.created_at} appData={JSON.parse(appliData.application_data)} />
                            :
                                JSON.parse(appliData.application_data).appliType === 3 ?
                                    <ApplicationFormSeniorCitizen appFiles={appliFiles} appData={JSON.parse(appliData.application_data)} />
                                :
                                    ""
                        
                        :
                            <><Spinner animation="border" size="sm" /> Fetching data...</>
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default AdminSingleApplication;