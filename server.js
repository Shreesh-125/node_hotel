const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // this stroes data(sent by client) in req.body
require('dotenv').config();
const PORT= process.env.PORT || 3000;


app.get("/", function (req, res) {
  res.send("Welcome to our Hotel...");
});

// for person we have made routes 
// so syntax for this file will be 
const personrouter=require('./routes/personRoutes.js');
app.use('/person',personrouter);

// for menu we have made routes 
// so syntax for this file will be 
const menurouter=require('./routes/menuRoutes.js');
app.use('/menu',menurouter)


// app.get('/sign-in',(req,res)=>res.send("Sign-in Page")) practice

app.listen(PORT, () => console.log("Website Running on 3000"));

// comment added for testing purpose