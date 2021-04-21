import React, { useEffect, useState } from 'react';
import {Card, Button} from 'react-bootstrap';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

function DiscussionList({discussions, history}) {
    const [loginType, setLoginType] = useState(null);

    /*const handleClick = () => {
        history.push(`/discussion/${discussions._i}`);
    }*/


    async function deleteDiscussion(id) {
        try {
            console.log(id);
            const deleteDiscussionData = {id};
            await axios.post("http://localhost:5000/discussion/delete", deleteDiscussionData);
            alert("Discussion Deleted Succesfully...\nPlease Refresh !")
        }
        catch(e) {
            console.log(e);
        }
    }

    async function getUser() {
        const user = await axios.get('http://localhost:5000/auth/logintype');
        setLoginType(user.data.login_type);
    }

    useEffect(()=>{
        getUser();
    }, []);


    function renderDiscussion() {
        return discussions.map((discussion)=> {
            return(
                <Card border="dark" style={{padding: "20px", margin: "15px", borderRadius: "10px", borderWidth: "2px", boxShadow: "2px 2px yellow"}}>
                    <Card.Header><Card.Title>{discussion.title}</Card.Title></Card.Header>
                    <Card.Body style={{ marginRight: "10px"}}>
                        <Card.Subtitle className="mb-2 text-muted">{"Last Updated : " + discussion.updatedAt + "\nCreated By : " + discussion.name + " (" + discussion.email + ")"}</Card.Subtitle>
                        <Card.Text>{discussion.description}</Card.Text>
                        <Button variant="success" onClick={() => {history.push(`/discussion/${discussion._id}`)}}>See the Replies</Button>
                        <pre>

                        </pre>
                        {
                            loginType === 1 ?
                                <Button variant="danger" onClick={()=>deleteDiscussion(discussion._id)}>Delete this Discussion</Button>:
                                <></>
                        }
                    </Card.Body>
                </Card>
            );
        })
    }
    if (discussions.length === 0)
    return(
        <div>
            <h3 style={{color:"red", marginTop:"100px", textAlign:"center"}}>There are No Discussions</h3>
        </div>
    );
    else
        return(
            <div style={{marginTop: "100px", marginRight: "20px", padding: "20px"}}>
                <ul style={{padding: "10px", boxShadow: "2px 2px solid black"}}>
                {
                    renderDiscussion()
                }
                </ul>
            </div>
        );
}

export default withRouter(DiscussionList);