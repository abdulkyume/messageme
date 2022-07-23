const express = require("express");
const { userInfo } = require("os");
const Msg = require("../models/Msg");
const app = express();
const msgRoute = express.Router();
var cors = require("cors");
app.use(cors());
let Msg = require("../models/Msg");
const { json } = require("body-parser");

//showmsg
msgRoute.route("/addfriends/profile/:id").get((req, res, next) => {
    Msg.find({ _id: req.params.id }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  });