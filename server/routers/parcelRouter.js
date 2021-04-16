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


router.post('/delete', auth, async(req, res)=>{
    try {
        const {id} = req.body;
        const isDeleted = await Parcel.deleteOne({_id: id});
        if (isDeleted.n == 0) {
            return res.status(400).json({errorMessage: "The Parcel can not be deleted."});
        }
        return res.status(200);
    }
    catch (e) {
        console.error(err);
        res.status(500).send();
    }
})

module.exports = router;