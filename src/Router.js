import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './Components/Auth/Login';
import AuthContext from './Context/AuthContext';
import NavbarCustom from './Components/Layouts/NavbarCustom';
import Home from './Components/Layouts/HomeLayout/Home';
import Notice from './Components/Layouts/Notice/Notice';
import Parcel from './Components/Layouts/Parcel/Parcel';
import Register from './Components/Auth/Register';
import axios from 'axios';

function Router() {

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
        <BrowserRouter>
            <NavbarCustom></NavbarCustom>
            <Switch>
                {
                    loggedIn === false && (
                        <>
                            <Route exact  path="/">
                                <Home></Home>
                            </Route>
                            <Route exact  path="/login">
                                <Login></Login>
                            </Route>
                        </>
                    )
                }
                {
                    loggedIn === true && (
                        <>
                            <Route exact  path="/">
                                <Home></Home>
                            </Route>
                            { 
                                loginType === 1 ?
                                    <Route exact  path="/register">
                                        <Register></Register>
                                    </Route> :
                                    <></>
                            }
                            <Route exact  path="/notice">
                                <Notice></Notice>
                            </Route>
                            <Route exact  path="/parcel">
                                <Parcel></Parcel>
                            </Route>
                        </>
                    )
                }
            </Switch>
        </BrowserRouter>
    );
}

export default Router;