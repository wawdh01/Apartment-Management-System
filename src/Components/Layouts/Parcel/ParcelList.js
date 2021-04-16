import React, { useEffect } from 'react';
import {Card, Spinner, Button} from 'react-bootstrap';
import axios from 'axios';
import parcelPic from './parcel.jpg';
function ParcelList({parcels}) {
    async function deleteParcel(id) {
        try {
            console.log(id);
            const deleteParcelData = {id};
            await axios.post("http://localhost:5000/parcel/delete", deleteParcelData);
            alert("Notice Deleted Succesfully...\nPlease Refresh !")
        }
        catch(e) {
            console.log(e);
        }
    }


    function renderParcels() {
        return parcels.map((parcel)=> {
            return(
                <Card border="dark" style={{padding: "20px", margin: "20px", borderRadius: "10px", borderWidth: "2px", boxShadow: "2px 2px blue", width: "400px"}}>
                    <Card.Img variant="top" src={parcelPic} />
                    <Card.Header><Card.Title>{parcel.parcel_id}</Card.Title></Card.Header>
                    <Card.Body style={{ width: '18rem', marginRight: "10px"}}>
                        <Card.Subtitle className="mb-2 text-muted">{parcel.email}</Card.Subtitle>
                        <Card.Text>{parcel.name}</Card.Text>
                        <Button variant="danger" onClick={()=>deleteParcel(parcel._id)}>Delete this Parcel</Button>
                    </Card.Body>
                </Card>
            );
        })
    }

    return(
        <div style={{marginTop: "100px", margin: "20px", padding: "20px", display: "flex", flexWrap: "wrap", flexBasis: "content"}}>
            
            {
                renderParcels()
            }
            
        </div>
    );
}

export default ParcelList;