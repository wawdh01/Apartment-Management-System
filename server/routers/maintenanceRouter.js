const router = require('express').Router();
const Flats = require('../models/flatModel');
const Maintenance = require('../models/maintenanceModel');
const auth = require('../middleware/auth');
//const { find, update } = require('../models/flatModel');
const shortid = require('shortid')
const Razorpay = require('razorpay')

const razorpay = new Razorpay({
	key_id: 'rzp_test_RYURSE5lXYde0Z',
	key_secret: 'G7BV55Jd9cLh2p0wYTWodIdh'
})

router.post('/history', async(req,res) => {
    try {
        const flat = req.body["flat"];
        const payments = await Maintenance.find({ flat: flat }); //{ flat: flat }
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
        const date = "faslk";
        const status = 0;
        if (!month) {
            return res.status(400).json({errorMessage: "Please enter month."});
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
    try {
        const secret = razorpay.key_secret;
        const body = req.body.order_id + "|" + req.body.payment_id;        
        //console.log(req.body)

        const crypto = require('crypto')
        const shasum = crypto.createHmac('sha256', secret)
        shasum.update(JSON.stringify(body))
        const digest = shasum.digest('hex')
        //console.log(digest, req.headers['x-razorpay-signature'])

        if (digest === req.body.signature) {
            console.log('request is legit')
            // require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
            /* Update database & send mail */
            res.status(200).send();
        } else {
            // malicious response, 
            res.status(502).send();
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).send();
    }
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
        const email = req.body["email"];
        const flats = await Flats.find({email: email});
        //console.log(flats);
        res.json(flats);
    }
    catch(e) {
        console.log(e)
        res.status(500).send();
    }
})

module.exports = router;