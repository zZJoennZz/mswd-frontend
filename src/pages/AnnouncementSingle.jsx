import React from 'react';
import {
    Container,
    Row,
    Col,
    Spinner
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import api from '../api/api';

const AnnouncementSingle = () => {
    const { annId } = useParams();
    let [ann, setAnn] = React.useState(false)

    React.useEffect(() => {
        const getAnn = async () => {
            await api.get(`announcement/${annId}`)
                .then(res => setAnn(res.data.data))
                .catch(err => {
                    alert(err + ". Please contact your website administrator.")
                    setAnn(false);
                });
        }
        getAnn();
    }, [annId])

    const bannerCss = (bannerImg) => {
        return {
            'background' : `linear-gradient(0deg, rgba(25, 25, 25, 0.8), rgba(58, 58, 58, 0.5)), url('${bannerImg}'), #000`,
            'backgroundSize' : 'cover',
            'backgroundPosition': 'center',
            'padding' : '100px 15px',
            'color' : '#fff'
        }
    }

    const changeDateFormat = (dateToChange) => {
        let theDate = new Date(dateToChange);
        return theDate.toLocaleString();
    }

    return (
        <Container fluid className="pb-5" style={{ minHeight: "90vh" }}>
            {
                !ann ?
                    <Spinner />
                :
                    <div>
                        <Row style={bannerCss(process.env.REACT_APP_URL_ANNOUNCEMENT_IMG + "/" + ann.image_path)}>
                            <Col md={12}>
                                <h1>{ann.announcement_title}</h1>  
                                <p><span style={{fontStyle: 'italic', color: '#858585'}}>Posted on</span> {changeDateFormat(ann.created_at)} (<span style={{fontStyle: 'italic', color: '#858585'}}>Last updated on</span> {changeDateFormat(ann.updated_at)})</p>  
                            </Col>
                        </Row>
                        <Row>
                            <Col md={2}></Col>
                            <Col md={8} className="p-5" dangerouslySetInnerHTML={{__html: ann.announcement_body}}></Col>
                            <Col md={2}></Col>
                        </Row>
                    </div>
            }
        </Container>
    )
}

export default AnnouncementSingle;