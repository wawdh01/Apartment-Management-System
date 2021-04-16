import React, { useEffect, useState } from 'react';
import NoticeAdd from './NoticeAdd';
import NoticeList from './NoticeList';
const axios = require('axios');

function Notice () {
    const [notices, setNotices] = useState([]);

    async function getNotices() {
        const noticeRes = await axios.get('http://localhost:5000/notice/');
        setNotices(noticeRes.data);
    }

    useEffect(()=>{
        getNotices();
    }, []);

    return(
        <div>
            <NoticeAdd></NoticeAdd>
            <NoticeList notices={notices}></NoticeList>
        </div>
    );
}


export default Notice;