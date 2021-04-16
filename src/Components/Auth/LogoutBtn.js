import axios from 'axios';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../../Context/AuthContext';
import {Button} from 'react-bootstrap';


function LogOutBtn() {

    const {getLoggedIn} = useContext(AuthContext);

    const history = useHistory();
    async function logout() {
        await axios.get("http://localhost:5000/auth/logout");
        await getLoggedIn();
        history.push("/login");
    }

    return (
        <Button variant="outline-danger" onClick={logout}>
            LogOut
        </Button>
    );
}

export default LogOutBtn;