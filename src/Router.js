import React, {useContext} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './Components/Auth/Login';
import AuthContext from './Context/AuthContext';
import NavbarCustom from './Components/Layouts/NavbarCustom';
import Home from './Components/Layouts/HomeLayout/Home';
import Notice from './Components/Layouts/Notice/Notice';
import Parcel from './Components/Layouts/Parcel/Parcel';

function Router() {

    const {loggedIn} = useContext(AuthContext);

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
                            <Route exact  path="/register">
                                <div>Register</div>
                            </Route>
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