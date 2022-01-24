import React from 'react';
import {
    Card,
    Button
} from 'react-bootstrap'

const NewsBox = () => {
    return (
        <Card className="mb-3" style={{ width: '90%', margin: 'auto' }}>
            <Card.Img variant="top" src="https://via.placeholder.com/286x140" />
            <Card.Body>
                <Card.Title>Announcement Title</Card.Title>
                <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit eget gravida cum sociis natoque penatibus. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc.
                </Card.Text>
                <Button variant="primary">Read More</Button>
            </Card.Body>
        </Card>
    );
}

export default NewsBox;
