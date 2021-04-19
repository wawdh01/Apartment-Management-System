import React, {useState} from 'react';
import axios from 'axios';
//import AuthContext from '../../Context/AuthContext';
//import { useHistory } from 'react-router';
import {Form, Container, Col, Row, Button} from 'react-bootstrap';

function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [mbNumStr, setMbNumStr] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [login_typeStr, setLogin_typeStr] = useState("");
    const [errMessage, setErrMessage] = useState("");

    async function login(e) {
        e.preventDefault();
        setErrMessage("");
        try {
            const mbNum = parseInt(mbNumStr);
            const login_type = parseInt(login_typeStr);
            const registerData = {
                email,
                name,
                mbNum,
                password,
                passwordVerify,
                login_type
            };
            await axios.post("http://localhost:5000/auth/", registerData);
            alert("User Succesfully Registerd...\nThank You !");
        }
        catch(err) {
            setErrMessage(err.response.data.errorMessage);
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
                        e.g. abcd@gmail.com
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)} value={name}/>
                        <Form.Text className="text-muted">
                        e.g. abcd
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicMobileNumber">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type="number" placeholder="Enter Name" onChange={(e)=>setMbNumStr(e.target.value)} value={mbNumStr}/>
                        <Form.Text className="text-muted">
                        e.g. 5475856789
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Re-enter Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPasswordVerify(e.target.value)} value={passwordVerify} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={{marginRight: "20px"}}>User Type</Form.Label>
                        <select onChange={(e)=>setLogin_typeStr(e.target.value)} value={login_typeStr} style={{borderRadius: "5px"}}>
                            <option value="1" > Secretary</option>
                            <option value="2"> Flat Owner</option>
                            <option value="3" > Tennant</option>
                        </select>
                    </Form.Group>
                    <p style={{color: 'red'}}>{errMessage}</p>
                    <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    );
}


export default Register;