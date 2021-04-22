import React, { useEffect , useState} from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import axios from 'axios';

function Payment({parcels}) {
    function getFlats() {
        // const user = await axios.get('http://localhost:5000/auth/logintype');
        // const req = {email: user["email"]}
        // const flats = await axios.post("http://localhost:5000/maintenance/getflats", req);
        // return flat nums in <option> TODO
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
			name: 'Donation',   // Receiving organization name
			description: 'Thank you for nothing. Please give us some money',
			image: '',  // Receiving organization logo
			handler: function (response) {
                /* Called on getting response from razorpay after making payment */
                if (!response.error) {
                     /* 1. Make post request to "/verification" with 'data'
                        2. Response from backend will be success/error(signature verification failure) code
                        3. Show alert message accordingly */
                    const data = {
                        payment_id: response.razorpay_payment_id,
                        order_id: response.razorpay_order_id,
                        signature: response.razorpay_signature,
                        flat: "",   // fill actual data
                        month: ""
                    }
                }
                else {
                    // alert error message
                    console.log(response.error.code + ":" + response.error.description);
                }
               
                
			},
			prefill: {
				name: 'xyz',    // not displayed
				email: 'sdfdsjfh2@ndsfdf.com',
				contact: '9899999999'
			}
		}
		const paymentObject = new window.Razorpay(options)
        console.log("open")
		paymentObject.open()
	}
    return(
        <div style={{marginTop: "100px"}}>      
        <Container fluid="md" className="mt-5">
            <Row>
                <Col>
                    <Form>
                    <Form.Group controlId="">
                        <Form.Label>Flat Number</Form.Label>
                        <Form.Control type="text" placeholder="select flat">
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="">
                        <Form.Label>Month</Form.Label>
                        <Form.Control as="select">
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="">
                        <Form.Label>Year</Form.Label>
                        <Form.Control as="select">
                            <option>2010</option>
                            <option>2011</option>
                            <option>2012</option>
                            <option>2013</option>
                            <option>2014</option>
                            <option>2015</option>
                            <option>2016</option>
                            <option>2017</option>
                            <option>2018</option>
                            <option>2019</option>
                            <option>2020</option>
                            <option>2021</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                            <option>2026</option>
                            <option>2027</option>
                            <option>2028</option>
                            <option>2029</option>
                            <option>2030</option>
                            <option>2031</option>
                            <option>2032</option>
                            <option>2033</option>
                            <option>2034</option>
                            <option>2035</option>
                            <option>2036</option>
                            <option>2037</option>
                            <option>2038</option>
                            <option>2039</option>
                            <option>2040</option>
                            <option>2041</option>
                            <option>2042</option>
                            <option>2043</option>
                            <option>2044</option>
                            <option>2045</option>
                            <option>2046</option>
                            <option>2047</option>
                            <option>2048</option>
                            <option>2049</option>
                            <option>2050</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={displayRazorpay}>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default Payment;