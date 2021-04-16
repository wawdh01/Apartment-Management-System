import React, {useContext} from 'react';
import AuthContext from '../../Context/AuthContext';
import LogOutBtn from '../Auth/LogoutBtn';
import {Navbar, Nav} from 'react-bootstrap';

function NavbarCustom() {

    const {loggedIn} = useContext(AuthContext);

    /*return(
        <div>
            {
                loggedIn === false && (
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                    </>
                )
            }
            {
                loggedIn === true && (
                    <>
                        <Link to="/notice">Notice</Link>
                        <Link to="/parcel">Parcel</Link>
                        <Link to="/register">Register</Link>
                        <LogOutBtn></LogOutBtn>
                    </>
                )
            }
        </div>
    );*/
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="#home">Apartment Management System</Navbar.Brand>
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
                            <Nav.Link eventKey={3} href="/register">Register</Nav.Link>
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