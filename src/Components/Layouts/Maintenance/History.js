import React, { useEffect, useState } from 'react';
import {Card, Button} from 'react-bootstrap';
import axios from 'axios';
import ReactTable from "react-table";   

function History(props) {
    function renderEntries() {
        // const columns = [{  
        //     Header: 'Flat Number',  
        //     accessor: 'flat_num'  
        //    },{  
        //    Header: 'Month',  
        //    accessor: 'month'  
        //    },{  
        //     Header: 'Date',  
        //     accessor: 'date'  
        //    },{  
        //     Header: 'Payment Status',  
        //     accessor: 'status'  
        //    }]  
        return(
            <div>
               
            </div>
        );
        
    }
    return(
        <div style={{marginTop: "100px", marginRight: "20px", padding: "20px"}}>
                    {
                        renderEntries()
                    }
        </div>
    );
}

export default History;