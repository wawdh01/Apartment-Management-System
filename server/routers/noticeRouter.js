const router = require('express').Router();
const Notice = require('../models/noticeModel');
const auth = require('../middleware/auth');

router.post("/add", auth, async(req, res)=> {
    try {
        const {title, description} = req.body;
        if (!title || !description) {
            return res.status(400).json({errorMessage: "Please enter all Required fields."});
        }
        if (title.length < 5) {
            return res.status(400).json({errorMessage: "Please enter more than 5 Characters in title."});
        }
        if (description.length < 10) {
            return res.status(400).json({errorMessage: "Please enter more than 10 Characters in description."});
        }
        const date = Date().toString();
        const newNotice = new Notice({
            title, description, date
        });

        const savedNotice = await newNotice.save();
        res.json(savedNotice);
    }
    catch(err) {
        console.error(err);
        res.status(500).send();
    }

});

router.get('/', auth, async (req, res)=> {
    try {
        const notices = await Notice.find();
        res.json(notices);
    }
    catch(err) {
        console.error(err);
        res.status(500).send();
    }

});

router.post('/delete', auth, async(req, res)=>{
    try {
        const {id} = req.body;
        const isDeleted = await Notice.deleteOne({_id: id});
        if (isDeleted.n == 0) {
            return res.status(400).json({errorMessage: "The Notice can not be deleted."});
        }
        return res.status(200);
    }
    catch (e) {
        console.error(err);
        res.status(500).send();
    }
})

module.exports = router;