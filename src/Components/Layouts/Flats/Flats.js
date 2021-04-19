import axios from 'axios';
import React, { useState , useEffect} from 'react';
import { Container , Row, Col, Form, Button} from 'react-bootstrap';
import FlatList from './FlatsList';
import {HashLoader} from 'react-spinners';


function Flats () {

    const [email, setEmail] = useState("");
    const [flatNumber, setFlatNumber] = useState("");
    const [loginType, setLoginType] = useState(null);
    const [adderrMessage, setAdderrMessage] = useState("");
    const [deleterrMessage, setdeleterrMessage] = useState("");

    const [isLoading , setIsLoading] = useState(false);

    async function addFlat(e) {
        e.preventDefault();
        setAdderrMessage("");
        try {
            const flatData = {
                email,
                flatNumber
            };
            await axios.post('http://localhost:5000/flats/add', flatData);
            alert("Flat has been Added..\nPlease Refresh.. !");
        }
        catch(err) {
            setAdderrMessage(err.response.data.errorMessage);
        }
    }

    async function deleteFlat(e) {
        e.preventDefault();
        setdeleterrMessage("");
        try {
            const flatData = {
                email,
                flatNumber
            };
            await axios.post('http://localhost:5000/flats/delete', flatData);
            alert("Flat has been Delted..\nPlease Refresh.. !");
        }
        catch(err) {
            setdeleterrMessage(err.response.data.errorMessage);
        }
    }


    async function getUser() {
        setIsLoading(true);
        const user = await axios.get('http://localhost:5000/auth/logintype');
        setIsLoading(false);
        setLoginType(user.data.login_type);
    }
    useEffect(()=>{
        getUser();
    }, []);

    if (isLoading === false)
    return(
        <div style={{marginTop: "100px"}}>
            <Container>
                <Row>
                    <Col>
                    { loginType === 1 ?
                    <Form>
                    <fieldset>
                    <legend>Flats and Owners data</legend>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Flat Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter Flat Number" onChange={(e)=>setFlatNumber(e.target.value)} value={flatNumber} />
                    </Form.Group>
                    {
                        adderrMessage === "" ? <></>: <p style={{color:'red'}}>{"Flat Add Error: " + adderrMessage}</p>
                    }
                    {
                        deleterrMessage === "" ? <></>: <p style={{color:'red'}}>{"Flat Delete Error: " + deleterrMessage}</p>
                    }
                    <Button variant="primary" type="submit" onClick={addFlat} >Add Owner to Flat</Button>
                    <Button variant="danger" type="submit" onClick={deleteFlat} style={{marginLeft: "200px"}} >Delete a Flat Owner</Button>
                    </fieldset>
                    </Form> : <></>
                    }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FlatList></FlatList>
                    </Col>
                </Row>
            </Container>
        </div>
    );
    else {
        return(
            <div>
                <div style={{marginTop: "100px", textAlign:"center"}}>
                    <h1>Apartment Management System</h1>
                </div>
                <div style={{marginTop: "15%", marginLeft:"5%", textAlign:"center"}}>
                    <HashLoader loading size="70"/>
                </div>
            </div>
        );
    }
}

export default Flats;