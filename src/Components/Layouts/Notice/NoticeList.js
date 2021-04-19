import React, { useEffect, useState } from 'react';
import {Card, Button} from 'react-bootstrap';
import axios from 'axios';


function NoticeList({notices}) {
    const [loginType, setLoginType] = useState(null);

    async function deleteNotice(id) {
        try {
            console.log(id);
            const deleteNoticeData = {id};
            await axios.post("http://localhost:5000/notice/delete", deleteNoticeData);
            alert("Notice Deleted Succesfully...\nPlease Refresh !")
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


    function renderNotices() {
        return notices.map((notice)=> {
            return(
                <Card border="dark" style={{padding: "20px", margin: "15px", borderRadius: "10px", borderWidth: "2px", boxShadow: "2px 2px yellow"}}>
                    <Card.Header><Card.Title>{notice.title}</Card.Title></Card.Header>
                    <Card.Body style={{ marginRight: "10px"}}>
                        <Card.Subtitle className="mb-2 text-muted">{notice.date}</Card.Subtitle>
                        <Card.Text>{notice.description}</Card.Text>
                        {
                            loginType === 1 ?
                                <Button variant="danger" onClick={()=>deleteNotice(notice._id)}>Delete this Notice</Button>:
                                <></>
                        }
                    </Card.Body>
                </Card>
            );
        })
    }

    return(
        <div style={{marginTop: "100px", marginRight: "20px", padding: "20px"}}>
            <ul style={{padding: "10px", boxShadow: "2px 2px solid black"}}>
            {
                renderNotices()
            }
            </ul>
        </div>
    );
}

export default NoticeList;