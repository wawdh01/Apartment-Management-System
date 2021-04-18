import React, {useContext, useState, useEffect} from 'react';
import AuthContext from '../../Context/AuthContext';
import LogOutBtn from '../Auth/LogoutBtn';
import {Navbar, Nav} from 'react-bootstrap';
import axios from 'axios';

function NavbarCustom() {

    const {loggedIn} = useContext(AuthContext);
    const [loginType, setLoginType] = useState(null);

    async function getUser() {
        const user = await axios.get('http://localhost:5000/auth/logintype');
        setLoginType(user.data.login_type);
    }

    useEffect(()=>{
        getUser();
    });


    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="#home">Apartment Management</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav>
                {
                    loggedIn === false && (
                        <>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link eventKey={2} href="/login">Login</Nav.Link>
                        </>
                    )
                }
                {
                    loggedIn === true && (
                        <>
                            <Nav.Link href="/notice">Notice</Nav.Link>
                            <Nav.Link eventKey={2} href="/parcel">Parcel</Nav.Link>
                            <Nav.Link eventKey={3} href="/discussion">Discussion</Nav.Link>
                            <Nav.Link eventKey={4} href="/flats">Flats</Nav.Link>
                            {
                                loginType === 1 ?
                                <Nav.Link eventKey={5} href="/register">Register</Nav.Link>:
                                <></>
                            }
                            <LogOutBtn></LogOutBtn>
                        </>
                    )
                }
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarCustom;