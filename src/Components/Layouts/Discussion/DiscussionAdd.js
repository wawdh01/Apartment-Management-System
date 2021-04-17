import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
function DiscussionAdd() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function discussionadd(e) {
        e.preventDefault();
        try {
            const discussionData = {
                email,
                name,
                title,
                description
            };
            await axios.post("http://localhost:5000/discussion/add", discussionData);
            alert("Discussion Added Succesfully...\nPlease Refresh !");
        }
        catch(err) {
            console.log(err);
        }
    }

    async function getUser() {
        const user = await axios.get('http://localhost:5000/auth/logintype');
        setName(user.data.name);
        setEmail(user.data.email);
    }

    useEffect(()=>{
        getUser();
    }, []);


    return(
        <div style={{marginTop: "100px"}}>
        <Container fluid="md" className="mt-5">
            <Row>
                <Col>
                    <Form onSubmit={discussionadd}>
                    <Form.Group controlId="">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Title" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                        <Form.Text className="text-muted">
                        Title of the Discussion
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" onChange={(e)=>setDescription(e.target.value)} value={description} />
                        <Form.Text className="text-muted">
                        Description of the Discussion
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    );
}


export default DiscussionAdd;