import React, { useEffect, useState } from 'react';
import DiscussionAdd from './DiscussionAdd';
import DiscussionList from './DiscussionList';
import {HashLoader} from 'react-spinners';
const axios = require('axios');

function Discussion () {
    const [discussion, setDiscussion] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function getDiscussions() {
        setIsLoading(true);
        const discussionRes = await axios.get('http://localhost:5000/discussion/');
        setIsLoading(false);
        setDiscussion(discussionRes.data);
    }


    useEffect(()=>{
        getDiscussions();
    }, []);

    if (isLoading === false)
    return(
        <div>
            <DiscussionAdd></DiscussionAdd>
            <DiscussionList discussions={discussion}></DiscussionList>
        </div>
    );
    else {
        return(
            <div>
                <div style={{marginTop: "100px", textAlign:"center"}}>
                    <h1>Apartment Management System</h1>
                </div>
                <div style={{marginTop: "15%", marginLeft:"5%", textAlign:"center"}}>
                    <HashLoader loading size="70"/>
                </div>
            </div>
        );
    }
}


export default Discussion;