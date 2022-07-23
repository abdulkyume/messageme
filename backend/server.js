const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

//connextion to db
mongoose.connect('mongodb://127.0.0.1:27017/messageme').then((x)=>{
    console.log('Connected to Mongo! Db name =' + x.connections[0].name)
}).catch((err)=>{
    console.error("Error Connection Mongo " + err)
})


//settung express with port
const userRoute = require("../backend/routes/user.route");
const msgRoute = require("../backend/routes/Msg.route");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/messageme')));
app.use('/',express.static(path.join(__dirname, 'dist/messageme')));
app.use('/api', userRoute);
app.use('/api', msgRoute);

const port = process.env.port || 4000;
const server = app.listen(port, ()=>{
    console.log("Connecte to Port = "+ port);
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