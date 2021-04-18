import React, {useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
function NoticeAdd(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function noticeadd(e) {
        e.preventDefault();
        try {
            const noticeData = {
                title,
                description
            };
            props.addNewNotice(noticeData);
            await axios.post("http://localhost:5000/notice/add", noticeData);
            alert("Noitce Added Succesfully...");
            setTitle("");
            setDescription("");
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
                    <Form onSubmit={noticeadd}>
                    <Form.Group controlId="">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Title" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                        <Form.Text className="text-muted">
                        Title of the Notice
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" onChange={(e)=>setDescription(e.target.value)} value={description} />
                        <Form.Text className="text-muted">
                        Description of the Notice
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


export default NoticeAdd;