const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");

//connextion to db
mongoose.connect("mongodb://127.0.0.1:27017/messageme").then((x) => {
  console.log("Connected to Mongo! Database Name: " + x.connect[0].name);
}).catch((err)=>{
    console.log("Error Connection Mongo: "+ err.reason);
});


//settung express with port
const userRoute = require("../backend/routes/user.route");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/messageme')));
app.use('/',express.static(path.join(__dirname, 'dist/messageme')));
app.use('/api', userRoute);

const port = process.env.port || 4000;
const server = app.listen(port, ()=>{
    Console.log("Connecte to Port = "+ port);
});

app.use((req, res, next)=>{
    next(createError(404));
});

app.use((err,req,res,next)=>{
    console.error(err.messsage);
    if(!err.statusCode){
        err.statusCode = 500;
    }
    res.status(err.statusCode).send(err.messsage);
});