import React, {useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
function NoticeAdd(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [noticeErrMessage, setNoticeErrMessage] = useState("");

    async function noticeadd(e) {
        e.preventDefault();
        setNoticeErrMessage("");
        try {
            const noticeData = {
                title,
                description
            };
            await axios.post("http://localhost:5000/notice/add", noticeData);
            props.addNewNotice(noticeData);
            alert("Noitce Added Succesfully...");
            setTitle("");
            setDescription("");
        }
        catch(err) {
            setNoticeErrMessage(err.response.data.errorMessage);
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
                    <p style={{color: 'red'}}>{noticeErrMessage}</p>
                    <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    );
}


export default NoticeAdd;