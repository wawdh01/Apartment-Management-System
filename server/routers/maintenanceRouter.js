const router = require('express').Router();
const Flats = require('../models/flatModel');
const Maintenance = require('../models/maintenanceModel');
const auth = require('../middleware/auth');
const { find } = require('../models/flatModel');

router.get('/history/:flat', async(req,res) => {
    try {
        const payments = await Maintenance.find(flat_num: flat);
        res.json(payments); 
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
})

router.post('/add', async(req,res) => {
    try {
        const month = req.body;
        const date = "";
        const status = 0;
        if (!month) {
            return res.status(400).json({errorMessage: "Please enter month."});
        }
        for (var flat in Flats.find()) {
            const newEntry = Entry({
                flat, date, month, status
            });
            const savedEntry = await newEntry.save();
            //res.send(savedEntry);
        }
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
})

router.post('/update', async(req,res) => {
    try {
        const {flat, month, status} = req.body.params;
        const findEntry = await Maintenance.find({ flat_num: flat, month: month });
        if (!findEntry) {
            return res.status(400).json({errorMessage: "Entry for given month not found."});
        }
        findEntry.date = (new Date()).toLocaleDateString();
        findEntry.status = status;
        findEntry.save().then(entry => {
            //res.json();
            console.log("Entry updated");
            })
    } 
    catch (e) {
        console.log(e);
        res.status(500).send();
    }
})

module.exports = router;