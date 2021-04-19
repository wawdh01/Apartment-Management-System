import React, {useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
function ParcelAdd(props) {
    const [parcel_id, setParcel_id] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [parcelErrMessage, setParcelErrMessage] = useState("");

    async function parceladd(e) {
        e.preventDefault();
        setParcelErrMessage("");
        try {
            const parcelData = {
                parcel_id,
                name,
                email
            };
            await axios.post("http://localhost:5000/parcel/add", parcelData);
            props.addNewParcel(parcelData);
            alert("Parcel Added Succesfully...\nPlease Refresh !");
        }
        catch(err) {
            setParcelErrMessage(err.response.data.errorMessage);
        }
    }


    return(
        <div style={{marginTop: "100px"}}>
        <Container fluid="md" className="mt-5">
            <Row>
                <Col>
                    <Form onSubmit={parceladd}>

                    <Form.Group controlId="">
                        <Form.Label>Parcel ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter Parcel ID" onChange={(e)=>setParcel_id(e.target.value)} value={parcel_id}/>
                        <Form.Text className="text-muted">
                        Parcel ID
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)} value={name}/>
                        <Form.Text className="text-muted">
                        Name of the receiver
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} value={email} />
                        <Form.Text className="text-muted">
                        Email of the receiver
                        </Form.Text>
                    </Form.Group>
                    <p style={{color:'red'}}>{parcelErrMessage}</p>
                    <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    );
}


export default ParcelAdd;