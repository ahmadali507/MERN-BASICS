const express = require('express'); 
const path = require('path'); 
const mongoose = require('mongoose'); 
const cookieParser = require('cookie-parser'); 
const register = require('./auth/Register')
const cors = require('cors')
const SignIn = require('./auth/SignIn')
const port = 3000; 
const app = express();
app.use(cors());
app.use(cookieParser()); 
app.use(express.json()); 
app.use(express.urlencoded({extended : true})); 



app.use( register, SignIn); 
app.listen(3000, (req, res) =>{
    console.log(`Server is running on port ${port}`); 
})


mongoose.connect('mongodb://localhost:27017/').
then(() =>{
    console.log("Database connected")
}).catch(() =>{
    console.log("database not connected to the system")
})





