import React from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    ListGroup
} from 'react-bootstrap';
import api from '../api/api';
import './track.css';

const Track = () => {
    let [appStat, setAppStat] = React.useState(false);
    let { trackId } = useParams();

    React.useEffect(() => {
        const getAppStat = async () => {
            try {
                await api.get(`track/${trackId}`)
                    .then(res => {
                        setAppStat(res.data.data);
                    })
            } catch (error) {
                alert(error);
                setAppStat(false)
            }
        }
        getAppStat()
    }, [trackId])
    return (
        <Container className="mt-3 mb-3" style={{ minHeight: "85vh" }} fluid>
            {
                !appStat ?
                    <Row>
                        <Col md={12}>
                            Loading...
                        </Col>
                    </Row>
                :
                    <>
                        <Row className="mb-3 block">
                            <Col md={3}></Col>
                            <Col md={6}>
                                <div className="wrapper-progressBar">
                                    <ul className="progressBar">
                                        {appStat.length > 0  ? <li className="active">Submitted</li> : <li>Error</li>}
                                        {appStat.length > 1 ? <li className="active">Processing</li> : <li>Processing</li>}
                                        {appStat.length > 2 ? appStat[2].status === 3 ? <li className="active">Approved</li> : <li className="denied">Denied</li> : <li>Result</li>}
                                    </ul>    
                                </div>
                            </Col>
                            <Col md={3}></Col>
                        </Row>
                        <Row style={{ textAlign: "left" }}>
                            <Col md={3}></Col>
                            <Col md={6}>
                                <ListGroup>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{appStat.length > 0  ? <span>Submitted</span> : <span>Error</span>}</div>
                                            {appStat.length > 0  ? appStat[0].statusMsg : <span>Error</span>}
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{appStat.length > 0  ? <span>Processing</span> : <span></span>}</div>
                                            {appStat.length > 1  ? appStat[1].statusMsg : <span>...</span>}
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{appStat.length > 0  ? <span>Result</span> : <span></span>}</div>
                                            {appStat.length > 2 ? appStat[2].status === 3 ? <span>Approved: {appStat[2].statusMsg}</span> : <span>Denied: {appStat[2].statusMsg}</span> : <span>...</span>}
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}></Col>
                        </Row>
                    </>
            }
        </Container>
    )
}

export default Track;