import React, {useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
function ContactAdd(props) {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [contactErrMessage, setContactErrMessage] = useState("");

    async function contactadd(e) {
        e.preventDefault();
        setContactErrMessage("");
        try {
            const contactData = {
                name,
                role,
                address,
                contact
            };
            await axios.post("http://localhost:5000/contact/add", contactData);
            props.addNewContact(contactData);
            alert("Contact Added Succesfully...");
            setName("");
            setRole("");
            setAddress("");
            setContact("");
        }
        catch(err) {
            setContactErrMessage(err.response.data.errorMessage);
        }
    }

    return( 
        <div style={{marginTop: "100px"}}>
        <Container fluid="md" className="mt-5">
            <Row>
                <Col>
                    <Form onSubmit={contactadd}>
                    <Form.Group controlId="">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)} value={name}/>
                        <Form.Text className="text-muted">
                        Name of the Person
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="">
                        <Form.Label>Role</Form.Label>
                        <Form.Control type="text" placeholder="Enter Role" onChange={(e)=>setRole(e.target.value)} value={role} />
                        <Form.Text className="text-muted">
                        Role of the Person
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter Address" onChange={(e)=>setAddress(e.target.value)} value={address} />
                        <Form.Text className="text-muted">
                        Address of the Person
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type="text" placeholder="Enter Contact Number" onChange={(e)=>setContact(e.target.value)} value={contact} />
                        <Form.Text className="text-muted">
                        Contact of the person
                        </Form.Text>
                    </Form.Group>
                    <p style={{color: 'red'}}>{contactErrMessage}</p>
                    <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    );
}


export default ContactAdd;