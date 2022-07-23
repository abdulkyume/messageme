const express = require("express");
const Msg = require("../models/Msg");
const app = express();
const msgRoute = express.Router();
var cors = require("cors");
app.use(cors());

//showmsg
msgRoute.route("/messages").post((req, res, next) => {
    Msg.find({ email: req.body }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        console.log(data)
        res.json(data);
      }
    });
  });

  module.exports = msgRoute;