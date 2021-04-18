import axios from 'axios';
import React, { useState , useEffect} from 'react';
import { Container , Row, Col, Form, Button} from 'react-bootstrap';
import FlatList from './FlatsList';


function Flats () {

    const [email, setEmail] = useState("");
    const [flatNumber, setFlatNumber] = useState("");
    const [loginType, setLoginType] = useState(null);

    async function addFlat(e) {
        e.preventDefault();
        const flatData = {
            email,
            flatNumber
        };
        await axios.post('http://localhost:5000/flats/add', flatData);
        alert("Flat has been Added..\nPlease Refresh.. !");
    }

    async function deleteFlat(e) {
        e.preventDefault();
        const flatData = {
            email,
            flatNumber
        };
        await axios.post('http://localhost:5000/flats/delete', flatData);
        alert("Flat has been Delted..\nPlease Refresh.. !");
    }


    async function getUser() {
        const user = await axios.get('http://localhost:5000/auth/logintype');
        setLoginType(user.data.login_type);
    }
    useEffect(()=>{
        getUser();
    }, []);
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
}

export default Flats;