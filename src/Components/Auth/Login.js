import React, {useContext, useState} from 'react';
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import { useHistory } from 'react-router';
import {Form, Container, Col, Row, Button} from 'react-bootstrap';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {getLoggedIn} = useContext(AuthContext);

    const history = useHistory();

    async function login(e) {
        e.preventDefault();
        try {
            const loginData = {
                email,
                password
            };
            await axios.post("http://localhost:5000/auth/login", loginData);
            await getLoggedIn();
            history.push("/");
        }
        catch(err) {
            console.log(err);
        }
    }


    return(
        <div style={{marginTop: "100px"}}>
        <Container fluid="md" className="mt-5">
            <Row>
                <Col>
                    <Form onSubmit={login}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                    </Form.Group>

                    <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    );
}


export default Login;