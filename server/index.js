const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
	origin: ["http://localhost:3000"],
	credentials: true,
}));

app.listen(PORT, ()=>console.log(`The server is started at PORT : ${PORT}`));

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MDB_CONNECT,{useNewUrlParser: true, useUnifiedTopology: true}, (err)=> {
    if(err) return console.error(err);
    console.log('Connected to MongoDB');
})


//use Router

app.use("/auth", require('./routers/userRouter'));
app.use("/notice", require('./routers/noticeRouter'));
app.use("/parcel", require('./routers/parcelRouter'));
