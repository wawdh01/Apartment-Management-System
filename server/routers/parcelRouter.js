const router = require('express').Router();
const Parcel = require('../models/parcelModel');
const auth = require('../middleware/auth');

router.post('/add', auth, async (req, res)=> {
    try {
        const {parcel_id, name, email} = req.body;
        if (!parcel_id || !name || !email) {
            return res.status(400).json({errorMessage: "Please enter all Required fields."});
        }
        const newParcel = Parcel({
            parcel_id, name, email
        });
        const savedParcel = await newParcel.save();
        res.send(savedParcel);
    }
    catch(err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get('/', auth, async (req, res)=> {
    try {
        const parcels = await Parcel.find();
        res.json(parcels);
    }
    catch(err) {
        console.error(err);
        res.status(500).send();
    }

});


module.exports = router;