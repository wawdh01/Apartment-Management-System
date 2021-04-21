const router = require('express').Router();
const auth = require('../middleware/auth');
const Chat = require('../models/chatModel');

router.post('/addMessage', auth, async(req, res)=>{
    try {
        const {email, message} = req.body;
        if (!email || !message) {
            return res.status(400).json({errorMessage: "Please enter all Required fields."});
        }
        const date = Date().toString();
        const newChat = new Chat({
            email, message, date
        });
        const savedChat = await newChat.save();
        res.json(savedChat);
    }
    catch(err) {
        console.log(err);
        res.status(500).send();
    }
})

router.get('/getMessage', auth, async (req, res)=>{
    try{
        const chats = await Chat.find();
        res.json(chats);
    }
    catch(err) {
        console.log(err);
        res.status(500).send();
    }
})

router.get('/delete', async (req, res) =>{
    try {
        const chats = await Chat.remove();
        res.send(chats);
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
})

module.exports = router;

