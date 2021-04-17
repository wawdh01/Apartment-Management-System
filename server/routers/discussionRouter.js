const router = require('express').Router();
const auth = require('../middleware/auth');
const Discussion = require('../models/discussionModel');

router.post('/add', auth, async(req, res)=> {
    try{
        const {email, name, title, description} = req.body;
        if (!email || !name || !title || !description) {
            return res.status(400).json({errorMessage: "Please enter all Required fields."});
        }
        if (title.length < 5) {
            return res.status(400).json({errorMessage: "Enter Title more than 5 characters."});
        }
        if (description.length < 10) {
            return res.status(400).json({errorMessage: "Enter Description more than 10 characters."});
        }

        const newDiscussion = new Discussion({
            email, name, title, description
        });

        const savedDisussion = await newDiscussion.save();
        res.send(savedDisussion);
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
})


router.get('/', auth, async(req, res)=> {
    try {
        const discussions = await Discussion.find();
        res.json(discussions);
    }
    catch(err) {
        console.error(err);
        res.status(500).send();
    }

});

router.post('/single',auth, async(req, res)=>{
    const {id} = req.body;
    try{
        const existingDiscussion = await Discussion.findOne({_id: id});
        res.send(existingDiscussion);
    }
    catch(e) {
        console.error(e);
        res.status(500).send();
    }
})

router.post('/addreply', auth, async(req, res)=>{
    try {
        const {id, name, replyText} = req.body;
        const replyBody = {
            name, 
            replyText
        }
        if (!id || !name || !replyText) {
            return res.status(400).json({errorMessage: "Please enter all Required fields."});
        }
        await Discussion.findByIdAndUpdate(
            {_id: id},
            {$addToSet:{reply: replyBody}},
            function (err, result){
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(result);
                }
            }
        );
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
});

router.post('/delete', auth, async(req, res)=>{
    try {
        const {id} = req.body;
        const isDeleted = await Discussion.deleteOne({_id: id});
        if (isDeleted.n == 0) {
            return res.status(400).json({errorMessage: "The Discussion can not be deleted."});
        }
        //return res.status(200);
    }
    catch (e) {
        console.error(err);
        res.status(500).send();
    }
})


module.exports = router;