import React, { useState } from 'react';
import {Card} from 'react-bootstrap';
const axios = require('axios');


class Notice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloaded: false,
            notice: [],
        }
    }

    async componentDidMount() {
        const noticeList = [];
        //let res = await axios.get('http://localhost:5000/notice/');
        await axios.get('http://localhost:5000/notice/')
        .then((response) => {
            const data = response.data;
            this.setState({
                notice: data ,
                 isloaded: true
            });
            console.log(this.state.notice);
            console.log('Data has been received!!');
        })
        .catch(() => {
            alert('Error retrieving data!!!');
        });
    }
    render() {

        var { isLoaded, items} = this.state;
        if (!isLoaded) {
            return(
                <div style={{marginTop: "100px"}}>
                    <h1>Loading...</h1>
                </div>
            );
        }
        else {
            return(
                <div style={{marginTop: "100px"}}>
                    <h1>List Done..</h1>
                    {
                        items.map((item)=> (
                            <p>Welcome</p>
                        ))
                    }
                </div>
            );
        }
    }
}

export default Notice;