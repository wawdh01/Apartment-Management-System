import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import jsPDF from 'jspdf';
import "jspdf-autotable";
import { Button } from 'react-bootstrap';

function FlatsList() {
    const [flats, setFlats] = useState([]);

    async function getFlats() {
        const flatsRes = await axios.get('http://localhost:5000/flats/');
        setFlats(flatsRes.data);
    }

    useEffect(()=>{
        getFlats();
    }, []);


    function printFlats() {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";
        const marginLeft = 20;
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);
        const title = "Flat Details";
        const headers = [["EMAIL", "FLAT NUMBER"]];
        const data = flats.map(flat => [flat.email, flat.flat]);
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
        doc.text(title, marginLeft, 20);
        doc.autoTable(content);
        doc.save("flatDetails.pdf");
    }

    function renderFlats() {
        return flats.map((flat)=>{
            return(
                <tr>
                    <td>{flat.email}</td>
                    <td>{flat.flat}</td>
                </tr>
            );
        })
    }
    if (flats.length === 0)
    return(
        <div>
            <h3 style={{color: "red", textAlign:"center", marginTop:"50px"}}>There are no Flats</h3>
        </div>
    );
    else 
        return(
            <div>
                <center>
                    <Button variant="primary" onClick={printFlats} style={{marginTop:"50px"}}>Get PDF Format</Button>
                </center>
                <Table responsive striped bordered hover variant="dark" style={{marginTop: "100px"}}>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Flat Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            renderFlats()
                        }
                    </tbody>
                </Table>
            </div>
        );
}


export default FlatsList;