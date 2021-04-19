import React, { useEffect, useState } from 'react';
import NoticeAdd from './NoticeAdd';
import NoticeList from './NoticeList';
import {HashLoader} from 'react-spinners';
const axios = require('axios');

function Notice (props) {
    const [notices, setNotices] = useState([]);
    const [loginType, setLoginType] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function getNotices() {
        const noticeRes = await axios.get('http://localhost:5000/notice/');
        setNotices(noticeRes.data);
    }


    async function getUser() {
        setIsLoading(true);
        const user = await axios.get('http://localhost:5000/auth/logintype');
        setIsLoading(false);
        setLoginType(user.data.login_type);
    }

    function newNotice(notice) {
        setNotices((prevNotes) => {
            return [...prevNotes, notice];
          });
    }

    useEffect(()=>{
        getNotices();
        getUser();
    }, []);

    if (isLoading === false)
    return(
        <div>
            { loginType === 1 ?
                <NoticeAdd addNewNotice={newNotice}></NoticeAdd> : <></>
            }
            <NoticeList notices={notices}></NoticeList>
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


export default Notice;