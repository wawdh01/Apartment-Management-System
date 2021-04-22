const router = require('express').Router();
const Flats = require('../models/flatModel');
const Maintenance = require('../models/maintenanceModel');
const auth = require('../middleware/auth');
//const { find, update } = require('../models/flatModel');
const shortid = require('shortid')
const Razorpay = require('razorpay')
const nodemailer = require('nodemailer');

const razorpay = new Razorpay({
	key_id: 'rzp_test_RYURSE5lXYde0Z',
	key_secret: 'G7BV55Jd9cLh2p0wYTWodIdh'
})

router.get('/', async(req, res)=>{
    try{
        const maintenances = await Maintenance.find();
        res.json(maintenances);
    }
    catch(err){
        console.log(e);
        res.status(500).send();
    }
})

router.post('/history', async(req,res) => {
    try {
        const {flat} = req.body;
        console.log(flat);
        const payments = await Maintenance.find({flat: flat}); //{ flat: flat }
        console.log(payments);
        res.json(payments);
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
})

router.post('/add', async(req,res) => {
    try {
        const {month} = req.body;
        console.log(month);
        const date = "-";
        const status = 0;
        if (!month) {
            return res.status(400).json({errorMessage: "Please enter month."});
        }
        const existingMonth = await Maintenance.findOne({month: month});
        console.log(existingMonth);
        if (existingMonth) {
            return res.status(400).json({errorMessage: "The maintenance of this payment is already added."});
        }
        const flats = await Flats.find();
        for (i=0; i<flats.length; i++) {
            const flat = flats[i].flat;
            const newEntry = new Maintenance({
                flat, month, date, status
            });
            const savedEntry = await newEntry.save();
        }
        //res.send(savedEntry);
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
})

// not tested
router.post('/update', async(req,res) => {
    try {
        const {flat, month, status} = req.body;
        //console.log(flat, month, status);
        const filter = { flat: flat, month: month };
        // const findEntry = await Maintenance.find(filter);
        // if (!findEntry) {
        //     return res.status(400).json({errorMessage: "Entry for given month not found."});
        // }
        // findEntry.date = (new Date()).toLocaleDateString();
        // findEntry.status = status;
        // findEntry.save().then(entry => {
        //     //res.json();
        //     console.log("Entry updated");
        //     })
        const updateDoc = {
            $set: {
              date: (new Date()).toLocaleDateString(),
              status: status
            }
          };
        const options = { upsert: true };
        const result = Maintenance.updateOne(filter, updateDoc, options);
        //console.log(result);
        const findEntry = await Maintenance.find(filter);
        console.log(findEntry);
    } 
    catch (e) {
        console.log(e);
        res.status(500).send();
    }
})

router.post('/verification', (req, res) => {
	// do a validation
	const secret = '12345678'

	console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})

router.post('/razorpay', async (req, res) => {
	const payment_capture = 1
	const amount = 1
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		//console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (e) {
		console.log(e)
        res.status(500).send();
	}
})

router.post('/getflats', async (req, res) => {
    try{
        const {email} = req.body;
        console.log(req.body);
        const flats = await Flats.find({email: email});
        //console.log(flats);
        res.json(flats);
    }
    catch(e) {
        console.log(e)
        res.status(500).send();
    }
})


router.get('/sendEmail', async (req, res)=>{
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            }
        });
        const flats = await Flats.find();
        for (i=0; i<flats.length; i++) {
            const flat = flats[i].flat;
            const email = flats[i].email;
            const mainte = await Maintenance.find({flat:flat, status: 0});
            for (j = 0; j < mainte.length; j++) {
                var mailOptions = {
                    from: 'apartmentsystem130@gmail.com',
                    to: email,
                    subject: 'Maintenance Payment Unpaid',
                    text: 'Dear User, \n Your Maintenance bill of ' + mainte[j].month + ' of flat ' + mainte[j].flat +' is unpaid.\n\n\n\nThank You,\nApartment Management System'
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                });
            }
        }
    }
    catch(err) {
        console.log(e)
        res.status(500).send();
    }
})

module.exports = router;
