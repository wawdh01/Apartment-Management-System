import React, { useEffect, useState } from 'react';
import ParcelAdd from './ParcelAdd';
import ParcelList from './ParcelList';
const axios = require('axios');

function Parcel () {
    const [parcels, setParcels] = useState([]);
    const [loginType, setLoginType] = useState(null);

    async function getParcels() {
        const parcelRes = await axios.get('http://localhost:5000/parcel/');
        setParcels(parcelRes.data);
        //console.log(parcels);
    }

    async function getUser() {
        const user = await axios.get('http://localhost:5000/auth/logintype');
        setLoginType(user.data.login_type);
    }

    useEffect(()=>{
        getParcels();
        getUser();
    }, []);

    return(
        <div>
            { loginType === 1 ?
                <ParcelAdd></ParcelAdd>: <></>
            }
            <ParcelList parcels={parcels}></ParcelList>
        </div>
    );
}


export default Parcel;