const router = require('express').Router();
const Contact = require('../models/contactModel');
const auth = require('../middleware/auth');

router.post("/add", auth, async(req, res)=> {
    try {
        const {name, role, address, contact} = req.body;
        if (!name || !role || !address || !contact) {
            return res.status(400).json({errorMessage: "Please enter all Required fields."});
        }
        const newContact = new Contact({
            name, role, address, contact
        });

        const savedContact = await newContact.save();
        res.json(savedContact);
    }
    catch(err) {
        console.error(err);
        res.status(500).send();
    }

});

router.get('/', auth, async (req, res)=> {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    }
    catch(err) {
        console.error(err);
        res.status(500).send();
    }

});

router.post('/delete', auth, async(req, res)=>{
    try {
        const {id} = req.body;
        const isDeleted = await Contact.deleteOne({_id: id});
        if (isDeleted.n == 0) {
            return res.status(400).json({errorMessage: "The Contact can not be deleted."});
        }
        return res.json(req.body);
    }
    catch (e) {
        console.error(err);
        res.status(500).send();
    }
})

module.exports = router;