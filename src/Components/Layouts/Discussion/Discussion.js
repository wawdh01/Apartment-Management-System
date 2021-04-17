import React, { useEffect, useState } from 'react';
import DiscussionAdd from './DiscussionAdd';
import DiscussionList from './DiscussionList';
const axios = require('axios');

function Discussion () {
    const [discussion, setDiscussion] = useState([]);

    async function getDiscussions() {
        const discussionRes = await axios.get('http://localhost:5000/discussion/');
        setDiscussion(discussionRes.data);
    }


    useEffect(()=>{
        getDiscussions();
    }, []);

    return(
        <div>
            <DiscussionAdd></DiscussionAdd>
            <DiscussionList discussions={discussion}></DiscussionList>
        </div>
    );
}


export default Discussion;