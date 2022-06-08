const express = require("express");
const { userInfo } = require("os");
const User = require("../models/User");
const app = express();
const userRoute = express.Router();

let user = require("../models/User");

//add user start
userRoute.route("/signup").post((req, res, next) => {
  user.create(req.body, (error, data) => {
    console.log(data);
    console.log(req.body);
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//login check
userRoute.route("/login").post((req, res) => {
  User.find(
    {
      $and: [{ email: req.body.email }, { password: req.body.password }],
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});

//profile
userRoute.route("/profile").post((req, res) => {
  User.find(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//add friend
userRoute.route("/addfriends").post((req, res) => {
  User.find(req.body, (error, data) => {
    console.log(req.body)
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.status(200).json(data);
    }
  });
});

module.exports = userRoute;
