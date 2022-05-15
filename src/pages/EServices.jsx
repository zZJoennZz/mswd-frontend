import React from 'react';
import { 
    Alert, 
    Container,
    Row,
    Col,
    Form,
    Button,
    Spinner,
    Tab,
    Tabs,
    Card,
} from 'react-bootstrap';
import axios from 'axios';

//images
import spImg from '../img/solo-parent-icon.jpg';
import pwdImg from '../img/pwd-icon.png';
import scImg from '../img/senior-citizen-icon.png';

//components
import Apply from '../components/Apply';
import UserHistory from '../components/UserHistory';

const EServices = () => {
    let [isLoading, setIsLoading] = React.useState(true);
    let [message, setMessage] = React.useState("");
    let [isAuth, setIsAuth] = React.useState(false);
    let [currentUser, setCurrentUser] = React.useState("");
    let [currentEmail, setCurrentEmail] = React.useState("");
    let [formMode, setFormMode] = React.useState(0);
    let [frmData, setFrmData] = React.useState({
        'name' : '',
        'email' : '',
        'password' : ''
    });
    let [selectedIdType, setSelectedIdType] = React.useState(0);

    const changeFrmMode = () => {
        setFrmData({
            'name' : '',
            'email' : '',
            'password' : ''
        });
        setFormMode(formMode === 0 ? 1 : 0);
    }

    const onChangeText = (e) => setFrmData({...frmData, [e.target.name] : e.target.value});

    const userLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        let headers = {
            'Authorization' : localStorage.getItem('token'),
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Allow-Control-Allow-Origin' : '*',
        }

        await axios.post(`${process.env.REACT_APP_API}signin`, frmData, {headers})
            .then(res => {
                localStorage.removeItem('token');
                localStorage.setItem('token', `Bearer ${res.data.token}`);
                setIsAuth(true);
            })
            .catch(err => {
                localStorage.removeItem('token');
                setMessage('Invalid login!');
                setIsAuth(false);
            });
        setIsLoading(false);
    }

    const logOut = async () => {
        let headers = {
            'Authorization' : localStorage.getItem('token'),
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Allow-Control-Allow-Origin' : '*',
        }
        setIsLoading(true);
        await axios.post(`${process.env.REACT_APP_API}signout`, null, {headers})
            .then(res => {
                localStorage.removeItem('token');
                setCurrentUser("");
                setCurrentEmail("");
                setIsAuth(false);
                setIsLoading(false);
            })
            .catch(err => {
                alert("Something went wrong! Please refresh the page.");
            });   
    }

    const selectIdType = (type) => {
        setSelectedIdType(type);
    }

    const resetSelectIdType = () => {
        setSelectedIdType(0);
    }

    const saveProfile = async (e) => {

        e.preventDefault();
        let headers = {
            'Authorization' : localStorage.getItem('token'),
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Allow-Control-Allow-Origin' : '*',
        }

        try {
            await axios.put(`${process.env.REACT_APP_API}updateprofile`, frmData, {headers})
                .then(res => {
                    alert("Changes saved!");
                    setCurrentUser(frmData.name);
                    setCurrentEmail(frmData.email);
                })
                .catch(err => {
                    alert("Something went wrong! Please refresh the page. If the problem persists, contact us!");
                });
        } catch (error) {
            alert("Something went wrong! Please refresh the page. If the problem persists, contact us!");
                
        }
    }

    React.useEffect(() => {
        const validateUser = async () => {
            setIsLoading(true);
            let headers = {
                'Authorization' : localStorage.getItem('token'),
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Allow-Control-Allow-Origin' : '*',
            }
            await axios.post(`${process.env.REACT_APP_API}validate-user`, null, {headers})
                .then(res => {
                    setIsAuth(true);
                    setCurrentUser(res.data.name);
                    setCurrentEmail(res.data.email);
                })
                .catch(err => {
                    setMessage("You need to login!");
                    setIsAuth(false);
                });
            setIsLoading(false);
            }

        validateUser();
    }, [isAuth]);

    if (isLoading) {
        return (
            <Container>
                <Row style={{ padding: '30vh 0' }}>
                    <Col lg={12}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            </Container>
        )
    }

    if (!isAuth) {
        return (
            <Container>
                <Row className="mt-5" style={{ minHeight: '60vh' }}>
                    <Col md={4}>
                    
                    </Col>
                    <Col className="text-start" lg={4}>
                        {
                            message !== "" ?
                                <Alert variant="primary">
                                    {message}
                                </Alert>
                            :
                                ""
                        }

                        {
                            formMode === 0 ?
                                <div>
                                    <h2>Login</h2>
                                    <Form onSubmit={userLogin} className="mb-3">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control value={frmData.email} autoComplete="current-username" type="email" id="email" name="email" placeholder="Enter email" onChange={onChangeText} />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control value={frmData.password} autoComplete="current-password" type="password" id="password" name="password" placeholder="Password" onChange={onChangeText} />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Login
                                        </Button>
                                    </Form>
                                    <small style={{ cursor: 'pointer' }} onClick={changeFrmMode}>Don't have an account? Register here!</small>
                                </div>
                            :
                                <div>
                                    <h2>Register an account</h2>
                                    <Form className="mb-3">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Full Name</Form.Label>
                                            <Form.Control value={frmData.name} id="name" name="name" type="text" placeholder="Enter email" onChange={onChangeText} />
                                        </Form.Group>
                                        
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control value={frmData.email} id="email" name="email" type="email" placeholder="Enter email" onChange={onChangeText} />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control value={frmData.password} id="password" name="password" type="password" placeholder="Password" onChange={onChangeText} />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Register
                                        </Button>
                                    </Form>
                                    <small style={{ cursor: 'pointer' }} onClick={changeFrmMode}>Already have an account? Login here!</small>
                                </div>
                        }
                    </Col>
                    <Col md={4}>
                    
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container style={{ minHeight: '65vh' }}>
            <Card className="mt-5 p-3 mb-5">
                <Row>
                    <Col md={12} className="mb-3 text-start">
                        Hello, <strong>{currentUser}</strong>!
                        <Button className="float-end" size="sm" variant="danger" onClick={logOut}>Logout</Button>
                    </Col>
                </Row>

                <Tabs defaultActiveKey="profile" className="mb-3">
                    <Tab eventKey="profile" title="Profile">
                        <Row className="text-start">
                            <Col md={12}>
                                <h2>Profile</h2>
                                <div className="p-3">
                                    <Form onSubmit={saveProfile}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Full name</Form.Label>
                                            <Form.Control defaultValue={currentUser} id="name" name="name" type="text" placeholder="Full name" onChange={onChangeText} />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control defaultValue={currentEmail} id="email" name="email" autoComplete="current-username" type="email" placeholder="Email address" onChange={onChangeText} />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control id="password" name="password" autoComplete="current-password" type="password" placeholder="Password" onChange={onChangeText} />
                                        </Form.Group>

                                        <Button variant="primary" type="submit">
                                            Save Changes
                                        </Button>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="application" title="Application">
                        {
                            selectedIdType === 0 ?
                            <>
                                <Row>
                                    <Col lg={12}>
                                        <h2 className="text-start">Select</h2>
                                    </Col>
                                </Row>
                                <Row className="pt-5">
                                    <Col lg={4}>
                                        <div style={{ cursor: 'pointer' }} onClick={selectIdType.bind(this, 1)}>
                                            <img src={spImg} alt="Solo Parent" height="180px" width="180px" style={{ borderRadius: "5px" }} />
                                        </div>
                                        <div>
                                            <small>Solo Parent</small>
                                        </div>
                                    </Col>
                                    <Col lg={4}>
                                        <div style={{ cursor: 'pointer' }} onClick={selectIdType.bind(this, 2)}>
                                            <img src={pwdImg} alt="Person with Disabilities" height="180px" width="180px" />
                                        </div>
                                        <div>
                                            <small>Person with Disabilities</small>
                                        </div>
                                    </Col>
                                    <Col lg={4}>
                                        <div style={{ cursor: 'pointer' }} onClick={selectIdType.bind(this, 3)}>
                                            <img src={scImg} alt="Senior Citizen" height="180px" width="180px" />
                                        </div>
                                        <div>
                                            <small>Senior Citizen</small>
                                        </div>
                                    </Col>
                                </Row>
                            </>
                            :
                            <Row>
                                <Col lg={12}>
                                    <Apply selId={selectedIdType} resetId={resetSelectIdType} />
                                </Col>
                            </Row>
                        }
                        
                    </Tab>
                    <Tab eventKey="track" title="Track your applications">
                        <UserHistory />
                    </Tab>
                </Tabs>
            </Card>
        </Container>
    );
}

export default EServices;