import React, { useEffect, useState } from 'react';
import ParcelAdd from './ParcelAdd';
import ParcelList from './ParcelList';
import {HashLoader} from 'react-spinners';
const axios = require('axios');

function Parcel (props) {
    const [parcels, setParcels] = useState([]);
    const [loginType, setLoginType] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function getParcels() {
        const parcelRes = await axios.get('http://localhost:5000/parcel/');
        setParcels(parcelRes.data);
        //console.log(parcels);
    }

    async function getUser() {
        setIsLoading(true);
        const user = await axios.get('http://localhost:5000/auth/logintype');
        setIsLoading(false);
        setLoginType(user.data.login_type);
    }

    function newParcel(parcel) {
        setParcels((prevNotes) => {
            return [...prevNotes, parcel];
          });
    }

    useEffect(()=>{
        getParcels();
        getUser();
    }, []);

    if (isLoading === false)
    return(
        <div>
            { loginType === 1 ?
                <ParcelAdd addNewParcel={newParcel}></ParcelAdd>: <></>
            }
            <ParcelList parcels={parcels}></ParcelList>
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


export default Parcel;