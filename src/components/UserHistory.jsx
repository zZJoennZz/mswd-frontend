import React from 'react';
import axios from 'axios';
import {
    Container,
    Table,
    Badge
} from 'react-bootstrap';

const UserHistory = () => {
    let [userHistory, setUserHistory] = React.useState(false);
    let [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        let isSubscribed = true;

        const getHistory = async () => {
            setIsLoading(true);
            let headers = {
                'Authorization' : localStorage.getItem('token'),
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Allow-Control-Allow-Origin' : '*',
            }
    
            await axios.get(`${process.env.REACT_APP_API}getHistory`, {headers})
                .then(res => {
                    if (isSubscribed) {
                        setUserHistory(res.data.data);
                    }
                })
                .catch(error => console.log(error));
            setIsLoading(false);
        }

        getHistory();

        return () => (isSubscribed = false);
    }, []);
    return (
        <Container fluid className="text-start">
            {
                isLoading ?
                    "Loading..."
                :
                    !userHistory || userHistory.length <= 0 ? 
                        "There's no records."
                    :
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <td width="40%">Application #</td>
                                    <td width="25%">Date of Application</td>
                                    <td width="25%">Application Type</td>
                                    <td width="10%">Track</td>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                userHistory.map(d => 
                                    <tr key={d.id}>
                                        <td>{d.status === 0 ? <Badge bg="warning">Processing</Badge> : d.status === 2 ? <Badge bg="danger">Denied</Badge> : <Badge bg="success">Approved</Badge>} {d.application_id}</td>
                                        <td>{d.created_at}</td>
                                        <td>{JSON.parse(d.application_data).appliType === 1 ? "Solo Parent" : JSON.parse(d.application_data).appliType === 2 ? "Person with Disabilities" : JSON.parse(d.application_data).appliType === 3 ? "Senior Citizen" : "Invalid"}</td>
                                        <td><a href={"/track/" + d.application_id} rel="noreferrer" target="_blank">Track</a></td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
            }
        </Container>
    );
}

export default UserHistory;