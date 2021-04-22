import React, {useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';

function FlatDisplay() {
    const [getFlats, setGetFlats] = useState([]);

    async function sendEmail() {
        try {
            await axios.get('http://localhost:5000/maintenance/sendEmail');
        }
        catch(err){
            console.log(err);
        }
    }

    async function getMaintenance() {
        try {
            const flats = await axios.get('http://localhost:5000/maintenance/');
            setGetFlats(flats.data);
            console.log(getFlats);
        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <div style={{marginTop:"30px", textAlign:"center"}}>
            <Button onClick={getMaintenance} variant="primary">Get Maintenance Data of All Flats</Button>
            <Button onClick={sendEmail} variant="danger">Send Email</Button>
            <div style={{margin:"10px"}}>
                <Table responsive striped bordered hover variant="dark" style={{marginTop: "100px"}}>
                    <thead>
                        <tr>
                            <th>Flat</th>
                            <th>Month</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        getFlats.map((flat, index)=>{
                            return(
                                <tr>
                                    <td>{flat.flat}</td>
                                    <td>{flat.month}</td>
                                    <td>{flat.date}</td>
                                    {
                                        flat.status === 0 ?
                                        <td style={{color:"red"}}>Unpaid</td>:
                                        <td style={{color:"green"}}>Paid</td>
                                    }
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default FlatDisplay;