import React, { useEffect, useState } from 'react';
import NoticeAdd from './NoticeAdd';
import NoticeList from './NoticeList';
const axios = require('axios');

function Notice () {
    const [notices, setNotices] = useState([]);
    const [loginType, setLoginType] = useState(null);

    async function getNotices() {
        const noticeRes = await axios.get('http://localhost:5000/notice/');
        setNotices(noticeRes.data);
    }


    async function getUser() {
        const user = await axios.get('http://localhost:5000/auth/logintype');
        setLoginType(user.data.login_type);
    }


    useEffect(()=>{
        getNotices();
        getUser();
    }, []);

    return(
        <div>
            { loginType === 1 ?
                <NoticeAdd></NoticeAdd> : <></>
            }
            <NoticeList notices={notices}></NoticeList>
        </div>
    );
}


export default Notice;