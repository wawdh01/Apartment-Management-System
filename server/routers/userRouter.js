const router = require('express').Router();

const Login = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//mongodb+srv://gaurav:SE7375107@apartment.cxqxa.mongodb.net/dev?retryWrites=true&w=majority
//register
router.post("/", async (req, res)=> {
    try {
        const {email, name, mbNum, password, passwordVerify, login_type} = req.body;
        if (!email || !name || !mbNum || !password || !passwordVerify || !login_type) {
            return res.status(400).json({errorMessage: "Please enter all Required fields."});
        }
        if (password.length < 6) {
            return res.status(400).json({errorMessage: "Please enter a password more than 6 characters."});
        }
        if (password != passwordVerify) {
            return res.status(400).json({errorMessage: "password and passwordVerify doesn't Match."});
        }
        const existingUser = await Login.findOne({email});
        if (existingUser) {
            return res.status(400).json({errorMessage: "This Email already exists."});
        }

        //hasing the password
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        //add a new user
        const newUser = new Login({
            email, name, mbNum, hashPassword, login_type
        });

        const savedUser = await newUser.save();


        //log the user in
        const token = jwt.sign({
            user: savedUser._id,
        }, process.env.JWT_SECRET);
        //console.log(token);
        //send a token in HTTP-cookie only
        res.cookie("token", token, {
            httpOnly: true,
        }).send();
    }
    catch(err) {
        console.error(err);
        res.status(500).send();
    }
});

//login
router.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;
        //validate

        if (!email || !password) {
            return res.status(400).json({errorMessage: "Please enter all Required fields."});
        }
        const existingUser = await Login.findOne({email});
        //console.log(existingUser);
        //const existingUser = await Login.find({email});
        if (!existingUser) {
            return res.status(401).json({errorMessage: "Email or Password is Wrong."});
        }
        const passwordCorrect = await bcrypt.compare(password, existingUser.hashPassword);
        if (!passwordCorrect) {
            return res.status(401).json({errorMessage: "Email or Password is Wrong."});
        }

        //Sign in the user
        const token = jwt.sign({
            user : existingUser._id,
        }, process.env.JWT_SECRET);

        //send a token in HTTP-cookie only
        res.cookie("token", token, {
            httpOnly: true,
        }).send();

    }
    catch(err) {
        console.error(err);
        res.status(500).send();
    }
})


router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    }).send();
});



router.get("/loggedIn", (req, res)=> {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json(false);
        }

        jwt.verify(token, process.env.JWT_SECRET);
        res.send(true);
    }
    catch (err) {
        console.err(err);
        res.json(false);
    }
});


module.exports = router;