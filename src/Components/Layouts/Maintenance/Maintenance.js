import React, { useState} from 'react';
import axios from 'axios';
import {Form, Button} from 'react-bootstrap';
import FlatDisplay from './FlatDisplay';


function Maintenance() {
    const [getmonth, setGetMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [errMessage, setErrMessage] = useState("");

    async function addMaintenance(e) {
        e.preventDefault();
        try {
            const month = getmonth + " " + year;
            const newMaintenance = {
                month
            }
            await axios.post('http://localhost:5000/maintenance/add', newMaintenance);
            alert("Maintenance of Specified Month is Added.. !");
        }
        catch(err) {
            setErrMessage(err.response.data.errorMessage);
        }
    }
        return(
            <div style={{marginTop:"100px"}}>
                    <Form style={{display:"flex"}} onSubmit={addMaintenance} >
                        <Form.Group style={{ marginLeft:"10%", marginRight:"10%"}}>
                            <Form.Label>Select a Month</Form.Label>
                            <select onChange={(e)=>setGetMonth(e.target.value)} value={getmonth} style={{borderRadius: "5px"}}>
                                <option value="Jan" selected >January</option>
                                <option value="Feb">February</option>
                                <option value="Mar" >March</option>
                                <option value="Apr" >April</option>
                                <option value="May">May</option>
                                <option value="Jun" >June</option>
                                <option value="Jul" >July</option>
                                <option value="Aug">August</option>
                                <option value="Sep" >September</option>
                                <option value="Oct" >October</option>
                                <option value="Nov">November</option>
                                <option value="Dec" >December</option>
                            </select>
                        </Form.Group>
                        <Form.Group style={{marginRight:"20%"}}>
                            <Form.Label>Select a Year</Form.Label>
                            <select onChange={(e)=>setYear(e.target.value)} value={year} style={{borderRadius: "5px"}}>
                                <option value="2020" selected>2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                                <option value="2031">2031</option>
                                <option value="2032">2032</option>
                                <option value="2033">2033</option>
                                <option value="2034">2034</option>
                                <option value="2035">2035</option>
                                <option value="2036">2036</option>
                                <option value="2037">2037</option>
                                <option value="2038">2038</option>
                                <option value="2039">2039</option>
                                <option value="2040">2040</option>
                                <option value="2041">2041</option>
                                <option value="2042">2042</option>
                                <option value="2043">2043</option>
                                <option value="2044">2044</option>
                                <option value="2045">2045</option>
                                <option value="2046">2046</option>
                                <option value="2047">2047</option>
                                <option value="2048">2048</option>
                                <option value="2049">2049</option>
                                <option value="2050">2050</option>
                            </select>
                        </Form.Group>
                        <Button variant="success" type="submit" style={{height:"30px"}}>Add the Maintennace</Button>
                    </Form>
                <h4 style={{color:'red', textAlign:'center'}}>{errMessage}</h4>
                <div>
                    <FlatDisplay></FlatDisplay>
                </div>
            </div>
        );
}

export default Maintenance;