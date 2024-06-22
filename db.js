const mongoose= require("mongoose");

// define the mongodb url
const mongoURL='mongodb://localhost:27017/hotels'

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

// get the default connection
// mongoose maintain a default connection object representing the mongoDB connection

const db= mongoose.connection;

//defining event listener for database connection 

db.on('connected',()=>console.log("connected to mongodb server"));

db.on('error',(err)=>console.log("MongoDB connection Error",err));

db.on('diconnected',()=>console.log("MongoDB disconnected"));

// Export the database connection
module.exports= db;