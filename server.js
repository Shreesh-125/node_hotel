const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // this stroes data(sent by client) in req.body


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

app.listen(3000, () => console.log("Website Running on 3000"));
