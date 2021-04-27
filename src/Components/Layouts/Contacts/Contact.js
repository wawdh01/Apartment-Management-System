import React, { useEffect, useState } from 'react';
import ContactAdd from './ContactAdd';
import ContactList from './ContactList';
import {HashLoader} from 'react-spinners';
const axios = require('axios');

function Contact (props) {
    const [contacts, setContacts] = useState([]);
    const [loginType, setLoginType] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function getContacts() {
        const contactsRes = await axios.get('http://localhost:5000/contact/');
        setContacts(contactsRes.data);
    }


    async function getUser() {
        setIsLoading(true);
        const user = await axios.get('http://localhost:5000/auth/logintype');
        setIsLoading(false);
        setLoginType(user.data.login_type);
    }

    function newContact(contact) {
        setContacts((prevNotes) => {
            return [...prevNotes, contact];
          });
    }

    useEffect(()=>{
        getContacts();
        getUser();
    }, []);

    if (isLoading === false)
    return(
        <div>
            { (loginType === 1 || loginType === 4) ?
                <ContactAdd addNewContact={newContact}></ContactAdd> : <></>
            }
            <ContactList contacts={contacts}></ContactList>
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


export default Contact;