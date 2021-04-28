import React, { useEffect, useState } from 'react';
import {Button, Image} from 'react-bootstrap';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import axios from 'axios';
import contactImg from './imp_contact.png';

function ContactList({contacts}) {
    const [loginType, setLoginType] = useState(null);

    async function deleteContact(id) {
        try {
            console.log(id);
            const deleteContactData = {id};
            await axios.post("http://localhost:5000/contact/delete", deleteContactData);
            alert("Contact Deleted Succesfully...\nPlease Refresh !")
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

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    function renderContacts() {
        return contacts.map((contact)=> {
            const flipD = (getRandomInt(1,100) % 2 === 0 ) ? "horizontal":"vertical";
            return(
                <div style={{alignItems:"center", margin:"20px"}}>
                <Flippy flipOnHover={true} flipDirection={flipD} style={{ width: '400px', height: '200px' }}>
                    <FrontSide style={{backgroundColor: 'yellow'}}>
                    <div style={{display:"flex"}}>
                        <div style={{marginRight:"10px", marginTop:"20px"}}>
                            <Image src={contactImg}></Image>
                        </div>
                        <div style={{marginLeft:"20px", marginTop:"8%"}}>
                            <h2 style={{textAlign:"center"}}><b>{contact.name}</b></h2>
                            <hr></hr>
                            <p style={{textAlign:"center"}}><i>{contact.role}</i></p>
                        </div>
                    </div>
                    </FrontSide>
                    <BackSide style={{ backgroundColor: 'green'}}>
                    <p style={{textAlign:"center"}}>{contact.address}</p>
                    <hr></hr>
                    <p style={{textAlign:"center"}}>{contact.contact}</p>
                    </BackSide>
                </Flippy>
                {
                    loginType === 1 ?
                        <Button variant="danger" onClick={()=>deleteContact(contact._id)} style={{marginLeft:"170px", marginTop:"10px"}}>Delete</Button>:
                        <></>
                }
                </div>
            );
        })
    }
    return(
        <div style={{marginTop: "1px", marginRight: "20px", padding: "20px"}}>
            <h3 style={{color:"black", marginTop:"100px", textAlign:"center"}}>{"There are " + contacts.length + " Contacts"}</h3>
            <ul style={{padding: "10px", boxShadow: "2px 2px solid black", display:"flex", flexWrap:"wrap"}}>
            {
                renderContacts()
            }
            </ul>
        </div>
    );
}

export default ContactList;