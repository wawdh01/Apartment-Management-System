const router = require('express').Router();

const Login = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { request } = require('express');
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');
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
        const hashPassword = password;
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
        const passwordCorrect = (password === existingUser.hashPassword) ? true:false;
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

router.get('/logintype', auth, async (req, res)=>{
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({errorMessage:"Unauthorized"});
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const _id = verified.user;
        const existingUser = await Login.findOne({_id});
        res.send(existingUser);
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
})


router.post('/resetpassword', async (req, res)=>{
    try {
        const {resetemail,oldPassword,newPassword} = req.body;
        if (!resetemail || !oldPassword || !newPassword) {
            return res.status(400).json({errorMessage: "Please enter all Required fields."});
        }
        const existingUser = await Login.findOne({email: resetemail});
        console.log(existingUser);
        if (!existingUser) {
            return res.status(401).json({errorMessage: "Email or Old password is wrong."});
        }
        const passwordCorrect = (oldPassword === existingUser.hashPassword) ? true: false;
        if (!passwordCorrect) {
            return res.status(401).json({errorMessage: "Email or Old Password is Wrong."});
        }
        const id = existingUser._id;
        const user = await Login.findByIdAndUpdate(
            {_id: id},
            {
                hashPassword: newPassword
            },
            function (err, result){
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(result);
                }
            }
        );
        console.log(user);
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
})


router.post('/forgotpassword', async(req, res)=>{
    try{
        const {forgotemail, forgotmobile} = req.body;
        if (!forgotemail || !forgotmobile) {
            return res.status(400).json({errorMessage: "Please enter all Required fields."});
        }
        const existingUser = await Login.findOne({email: forgotemail});
        if (!existingUser) {
            return res.status(401).json({errorMessage: "Email or Phone Number is wrong."});
        }
        const mbChecker = (parseInt(forgotmobile) === existingUser.mbNum) ? true:false;
        if (!mbChecker){
            return res.status(401).json({errorMessage: "Email or Phone Number is wrong."});
        }
        const password = existingUser.hashPassword;
        //console.log(password);

        //Code to send a mail is from here
        console.log(password);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            }
          });
          var mailOptions = {
            from: 'apartmentsystem130@gmail.com',
            to: existingUser.email,
            subject: 'Forgot Password Recovery',
            text: 'Dear User, \n Your password is "' + password + '". Please, Reset your password.\n\n\n\nThank You,\nApartment Management System'
          };
          console.log("Comes Here....");
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
})

module.exports = router;