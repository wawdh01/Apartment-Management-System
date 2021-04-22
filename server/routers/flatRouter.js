const router = require('express').Router();
const auth = require('../middleware/auth');
const Flats = require('../models/flatModel');
const Login = require('../models/userModel');

router.post('/add', auth, async(req, res)=>{
    try{
        const {email, flatNumber} = req.body;
        if (!email || !flatNumber) {
            return res.status(400).json({errorMessage: "Please enter all Required fields."});
        }
        const flat = flatNumber;
        const flatData = new Flats ({
            email,
            flat
        });
        const existingUser = await Login.findOne({email});
        const preUser = (existingUser.email === email) ? true:false;
        const existingFlat = await Flats.findOne({flat: flatNumber});
        if (existingFlat) {
            return res.status(400).json({errorMessage: "This Flat already exists."});
        }
        if (!preUser) {
            return res.status(400).json({errorMessage: "This user doesn't exists."});
        }
        const savedflatdata = await flatData.save();
        res.send(savedflatdata);
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
})

router.get('/', auth, async(req, res)=>{
    try {
        const flats = await Flats.find();
        res.json(flats);
    }
    catch(err) {
        console.error(err);
        res.status(500).send();
    }
})


router.post('/delete', auth, async(req, res)=>{
    try{
        const {email, flatNumber} = req.body;
        if (!email || !flatNumber) {
            return res.status(400).json({errorMessage: "Please enter all Required fields."});
        }
        const isDeleted = await Flats.deleteOne({flat: flatNumber});
        if (isDeleted.n == 0) {
            return res.status(400).json({errorMessage: "The Flat can not be deleted."});
        }
        res.status(200).send();
    }
    catch(e) {
        console.error(err);
        res.status(500).send();
    }
})


router.post('/getFlat', async (req, res)=>{
    try {
        const {email} = req.body;
        const flatData = await Flats.find({email:email});
        //console.log(flatData);
        res.json(flatData);
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
})
module.exports = router;