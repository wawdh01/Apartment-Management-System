import React, { useEffect, useState } from 'react';
import ParcelAdd from './ParcelAdd';
import ParcelList from './ParcelList';
const axios = require('axios');

function Parcel () {
    const [parcels, setParcels] = useState([]);

    async function getParcels() {
        const parcelRes = await axios.get('http://localhost:5000/parcel/');
        setParcels(parcelRes.data);
        console.log(parcels);
    }

    useEffect(()=>{
        getParcels();
    }, []);

    return(
        <div>
            <ParcelAdd></ParcelAdd>
            <ParcelList parcels={parcels}></ParcelList>
        </div>
    );
}


export default Parcel;