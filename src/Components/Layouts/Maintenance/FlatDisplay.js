import React, {useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import jsPDF from 'jspdf';
import "jspdf-autotable";

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

    function printMaintenance() {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";
        const marginLeft = 20;
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);
        const title = "ALL Maintenace Report";
        const headers = [["FLAT", "MONTH", "DATE", "STATUS"]];
        const data = getFlats.map(flat => [flat.flat, flat.month, flat.date, flat.status === 0 ? "UNPAID":"PAID"]);
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
        doc.text(title, marginLeft, 20);
        doc.autoTable(content);
        doc.save("AllMaintenance_report.pdf");
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
            <center>
            <Button onClick={getMaintenance} variant="primary" style={{marginRight:"20px"}}>Get Maintenance Data of All Flats</Button>
            <Button onClick={sendEmail} variant="danger">Send Email</Button>
            </center>
            <div style={{margin:"10px"}}>
                <div>
                <Button variant="primary" onClick={printMaintenance}>Print Maintenance Status</Button>
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
        </div>
    );
}

export default FlatDisplay;