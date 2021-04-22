import React, {useState} from 'react';
import axios from 'axios';
import { Button , Table} from 'react-bootstrap';
import {HashLoader} from 'react-spinners';



function ClientMaintenance() {
    const [isGet, setIsGet] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [maintenanceFlat, setMaintenanceFlat] = useState([]);
    async function getData() {
        //setIsGet(false);
        setIsLoading(true);
        try {
            const user = await axios.get('http://localhost:5000/auth/logintype');
            getFlatData(user.data.email);
        }
        catch(e) {
            console.log(e);
        }
    }

    async function getFlatData(email) {
        console.log(email);
        try {
            const newMail = {
                email
            }
            const flat = await axios.post('http://localhost:5000/flats/getFlat', newMail);
            getMaintenanceData(flat.data);
        }
        catch(err) {
            console.log(err);
        }
    }

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    async function displayRazorpay() {
        const user = await axios.get('http://localhost:5000/auth/logintype');
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('http://localhost:5000/maintenance/razorpay', { method: 'POST' }).then((t) =>
			t.json()
		)

		console.log(data)
        console.log("open1")
		const options = {
			key:'rzp_test_RYURSE5lXYde0Z',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Maintenance Payment',
			description: 'Maintenance bill of Apartment Mangament System',
			image: '',
			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
			},
			prefill: {
				name: user.data.name,
				email: user.data.email,
				contact: '7234636727'
			}
		}
		const paymentObject = new window.Razorpay(options)
        console.log("open")
		paymentObject.open()
	}

    async function getMaintenanceData(flats) {
        try {
            const maintainen = [];
            //console.log(flat);
            for (var i = 0; i < flats.length; i++) {
                console.log(flats[i].flat);
                const flat = flats[i].flat;
                const maint = {
                    flat
                }
                const maintainFlat = await axios.post('http://localhost:5000/maintenance/history', maint);
                //console.log(maintainFlat.data);
                for (var j = 0; j < maintainFlat.data.length ; j++) {
                    maintainen.push(maintainFlat.data[j]);
                }
            }
            setMaintenanceFlat(maintainen);
            setIsGet(true);
            setIsLoading(false);
            //console.log(maintainen);
        }
        catch(err) {
            console.log(err);
        }
    }

    return(
        <div style={{marginTop: "100px", alignItems:"center"}}>
            <Button onClick={getData} variant="primary" style={{alignItems:"center"}}>Get Flat Maintenance Data</Button>
            <div style={{display:"flex", padding:"10px"}}>
                {
                    isLoading === false ?
                        isGet === true ?
                            maintenanceFlat.length === 0 ?
                                <h4 style={{color:'red'}}>There are No Flats</h4>:
                                <Table>
                                    <thead>
                                        <th>Flat</th>
                                        <th>Month</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </thead>
                                    <tbody>
                                        {
                                            maintenanceFlat.map((flat)=>{
                                                return(
                                                    <tr>
                                                        <td>{flat.flat}</td>
                                                        <td>{flat.month}</td>
                                                        <td>{flat.date}</td>
                                                        <td>
                                                            {
                                                                flat.status === 0 ?
                                                                    <Button variant="danger" onClick={displayRazorpay}>Pay</Button>:
                                                                <p style={{color:"green"}}>Paid</p>
                                                            }
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </Table>:<></>
                        :
                        <div  style={{marginTop:"18%", marginLeft:"50%"}}>
                            <HashLoader></HashLoader>
                        </div>
                }
            </div>
        </div>
    );
}

export default ClientMaintenance;