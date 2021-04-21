import React from 'react';
import {Card} from 'react-bootstrap';

function Displayreply({replies}) {
    //console.log(replies);

    function renderReplies() {
        if (replies.length === 0)
        return(
            <h3 style={{color:"black", textAlign:"center"}}>{"There are " + replies.length + " Replies"}</h3>
        );
        else
            return replies.map((reply)=> {
                return(
                    <Card border="dark" style={{padding: "20px", margin: "15px", borderRadius: "10px", borderWidth: "2px", boxShadow: "2px 2px yellow"}}>
                        <Card.Header><Card.Title>{reply.name}</Card.Title></Card.Header>
                        <Card.Body style={{ marginRight: "10px"}}>
                            <Card.Text>{reply.replyText}</Card.Text>
                        </Card.Body>
                    </Card>
                );
            })
    }
    return(
        <div style={{marginTop: "100px", marginRight: "20px", padding: "20px"}}>
            <ul style={{padding: "10px", boxShadow: "2px 2px solid black"}}>
            {
                renderReplies()
            }
            </ul>
        </div>
    );
}

export default Displayreply;