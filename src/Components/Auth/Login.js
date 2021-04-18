import React, {useContext, useState} from 'react';
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import { useHistory } from 'react-router';
import {Form, Container, Col, Row, Button} from 'react-bootstrap';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [resetemail, setResetemail] = useState("");
    const [oldPassword, setOldpassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [forgotemail, setForgotemail] = useState("");
    const [forgotmobile, setForgotmobile] = useState("");

    const {getLoggedIn} = useContext(AuthContext);

    const history = useHistory();


    async function forogotlogin(e) {
        e.preventDefault();
        try {
            const forgotData = {
                forgotemail,
                forgotmobile
            }
            await axios.post('http://localhost:5000/auth/forgotpassword', forgotData);
            alert('Mail has been Sent..\nPlease Check your mailbox.. !')
        }
        catch(err) {
            console.log(err);
        }
    }

    async function resetlogin(e) {
        e.preventDefault();
        try {
            const resetData = {
                resetemail,
                oldPassword,
                newPassword
            };
            await axios.post('http://localhost:5000/auth/resetpassword', resetData);
            alert('Your Password has been Resetted...\nPlease Login.. !')
        }
        catch(err) {
            console.log(err);
        }
    }

    async function login(e) {
        e.preventDefault();
        try {
            const loginData = {
                email,
                password
            };
            await axios.post("http://localhost:5000/auth/login", loginData);
            await getLoggedIn();
            history.push("/notice");
        }
        catch(err) {
            console.log(err);
        }
    }


    return(
        <div style={{marginTop: "100px"}}>
        <Container fluid="md" className="mt-5">
            <Row style={{border: "2px black"}}>
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
            <Row>
                <Col>
                <pre>


                </pre>
                <p>
                    Dear Members,
                    <ol>
                        <li>If you have reset the password then you can fill the <i>reset password</i> Form.</li>
                        <li>If you have Forgot the password Then,
                            <ul>
                                <li>Fill the <i>Forgot Password</i> form.</li>
                                <li>The mail will go to the registered email id</li>
                                <li>Your old password is there in the mail</li>
                                <li>Now You can, reset the password if you wish.(Better Advice: Reset Your Password)</li>
                            </ul>
                        </li>

                    </ol>
                </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <pre>


                        
                    </pre>
                    <Form onSubmit={resetlogin}>
                    <fieldset>
                    <legend>Reset Your Password</legend>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setResetemail(e.target.value)} value={resetemail}/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setOldpassword(e.target.value)} value={oldPassword} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setNewPassword(e.target.value)} value={newPassword} />
                    </Form.Group>

                    <Button variant="primary" type="submit">Reset Password</Button>
                    </fieldset>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                <pre>



                </pre>
                <Form onSubmit={forogotlogin}>
                    <fieldset>
                    <legend>Forgot Your Password</legend>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setForgotemail(e.target.value)} value={forgotemail}/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type="number" placeholder="Mobile Number" onChange={(e)=>setForgotmobile(e.target.value)} value={forgotmobile} />
                    </Form.Group>

                    <Button variant="danger" type="submit">Forgot Password</Button>
                    </fieldset>
                    </Form>
                    <pre>


                        
                    </pre>
                </Col>
            </Row>
        </Container>
        </div>
    );
}


export default Login;