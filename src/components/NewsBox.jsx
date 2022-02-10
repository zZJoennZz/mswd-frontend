import React from 'react';
import {
    Card,
    Button
} from 'react-bootstrap'

const NewsBox = ({announcementData}) => {

    return (
        <Card className="mb-3" style={{ width: '90%', margin: 'auto' }}>
            <Card.Img variant="top" src={process.env.REACT_APP_URL_ANNOUNCEMENT_IMG + "/" + announcementData.image_path} height={140} width={286} />
            <Card.Body>
                <Card.Title className="mb-3">{announcementData.announcement_title}</Card.Title>
                <Button variant="primary">Read More</Button>
            </Card.Body>
        </Card>
    );
}

export default NewsBox;