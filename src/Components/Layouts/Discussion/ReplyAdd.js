import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';


function Replyadd({id}) {
    const [replyText, setReplyText] = useState("");
    const [name, setName] = useState("");
    const [replyAddErr, setReplyAddErr] = useState("");

    async function getUser() {
        const user = await axios.get('http://localhost:5000/auth/logintype');
        setName(user.data.name);
    }


    useEffect(()=>{
        getUser();
    }, []);

    async function replyadd(e) {
        e.preventDefault();
        setReplyAddErr("");
        try {
            const replyData = {
                id,
                name,
                replyText
            };
            await axios.post("http://localhost:5000/discussion/addreply", replyData);
        }
        catch(err) {
            setReplyAddErr(err.response.data.errorMessage);
        }
    }
    return(
        <div style={{marginTop: "100px"}}>
            <Container fluid="md" className="mt-5">
                <Row>
                    <Col>
                        <Form onSubmit={replyadd}>
                        <Form.Group controlId="">
                            <Form.Label>Reply Message</Form.Label>
                            <Form.Control type="text" placeholder="Enter Reply Message" onChange={(e)=>setReplyText(e.target.value)} value={replyText}/>
                            <Form.Text className="text-muted">
                            You can Discuss Here....
                            </Form.Text>
                        </Form.Group>
                        <p style={{color: 'red'}}>{replyAddErr}</p>
                        <Button variant="primary" type="submit">Reply to this Discussion</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Replyadd;