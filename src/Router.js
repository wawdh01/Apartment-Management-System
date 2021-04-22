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
import Discussion from './Components/Layouts/Discussion/Discussion';
import DiscussionSingle from './Components/Layouts/Discussion/DiscussionSingle';
import Flats from './Components/Layouts/Flats/Flats';
import Maintenance from './Components/Layouts/Maintenance/Maintenance'

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
                            <Route exact path="/discussion">
                                <Discussion></Discussion>
                            </Route>
                            <Route path="/discussion/:id">
                                <DiscussionSingle></DiscussionSingle>
                            </Route>
                            <Route path="/flats">
                                <Flats></Flats>
                            </Route>
                            <Route path="/maintenance">
                                <Maintenance></Maintenance>
                            </Route>
                        </>
                    )
                }
            </Switch>
        </BrowserRouter>
    );
}

export default Router;