import {} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Replyadd from './ReplyAdd';
import Displayreply from './DisplayReply';


function DiscussionSingle() {
    const [discussiontitle, setDiscussiontitle] = useState("");
    const [discussiondescription, setDiscussiondescription] = useState("");
    const [discussionreply, setDiscussionreply] = useState([]);
    const uri = window.location.href;
    const result = uri.split('/');
    const id = result[result.length - 1];
    const getDiscussion = {
        id
    }

    async function getDiscussionSingle() {
        const data = await axios.post('http://localhost:5000/discussion/single', getDiscussion);
        setDiscussiontitle(data.data.title);
        setDiscussiondescription(data.data.description);
        setDiscussionreply(data.data.reply);
    }

    useEffect(()=>{
        getDiscussionSingle();
    });

    return(
        <div>
            <div style={{margin: "100px", border:"2px solid black", borderRadius: "10px", padding: "10px"}}>
                <h3>{discussiontitle}</h3>
                <hr/>
                <h5>{discussiondescription}</h5>
            </div>
            <Replyadd id={id}></Replyadd>
            <Displayreply replies={discussionreply}></Displayreply>
        </div>

    );
}

export default DiscussionSingle;