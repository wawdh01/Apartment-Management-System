import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';
function FlatsList() {
    const [flats, setFlats] = useState([]);

    async function getFlats() {
        const flatsRes = await axios.get('http://localhost:5000/flats/');
        setFlats(flatsRes.data);
    }

    useEffect(()=>{
        getFlats();
    }, []);

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