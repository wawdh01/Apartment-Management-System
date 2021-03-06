import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';


const AuthContext = createContext();
function AuthContextProvider(props) {

    const [loggedIn, setloggedIn] = useState(undefined);

    async function getLoggedIn() {
        const loggedInRes = await axios.get('http://localhost:5000/auth/loggedIn');
        setloggedIn(loggedInRes.data);
    }

    useEffect(()=>{
        getLoggedIn();
    }, [loggedIn]);
    return(
        <AuthContext.Provider value={{loggedIn, getLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export {AuthContextProvider};
export default AuthContext;
