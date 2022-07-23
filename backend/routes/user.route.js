const express = require("express");
const { userInfo } = require("os");
const User = require("../models/User");
const app = express();
const userRoute = express.Router();
var cors = require("cors");
app.use(cors());
let user = require("../models/User");
const { json } = require("body-parser");

//add user start
userRoute.route("/signup").post((req, res, next) => {
  user.create(req.body, (error, data) => {
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

//addfriend profile
userRoute.route("/addfriends/profile/:id").get((req, res, next) => {
  User.find({ _id: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//add friend profile
userRoute.route("/addfriends").post((req, res) => {
  User.find({ email: req.body.term }, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.status(200).json(data);
    }
  });
});

//add friend
userRoute.route("/addfriends/profile/:id").put((req, res, next) => {
  User.updateOne(
    { _id: req.params.id },
    { $push: { friendsreqs: [req.body.data] } },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.status(200).json(data);
      }
    }
  );
});

userRoute.route("/friendrequest").post((req, res, next) => {
  User.find(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

userRoute.route("/friendrequests").post((req, res, next) => {
  User.find({ _id: { $in: req.body } }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//accept friend
userRoute.route("/friendrequest/:profile/:fdid").get((req, res, next) => {
  User.updateOne(
    { email: req.params.profile },
    { $push: { friends: [req.params.fdid] } },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.status(200).json(data);
      }
    }
  );
});

//delete after accept
userRoute.route("/dafriendrequest/:profile/:fdid").get((req, res, next) => {
  User.updateOne(
    { email: req.params.profile },
    { $pullAll: { friendsreqs: [req.params.fdid] } },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.status(200).json(data);
      }
    }
  );
});


//delete req
userRoute.route("/dfriendrequest/:profile/:fdid").get((req, res, next) => {
  User.updateOne(
    { email: req.params.profile },
    { $pullAll: { friendsreqs: [req.params.fdid] } },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.status(200).json(data);
      }
    }
  );
});


//get friends
userRoute.route("/gfriends/").post((req, res) => {
  User.find(req.body , (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.status(200).json(data);
    }
  });
});

userRoute.route("/friends").post((req, res, next) => {
  User.find({ _id: { $in: req.body } }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = userRoute;
