const express = require("express");
const { userInfo } = require("os");
const User = require("../models/User");
const app = express();
const userRoute = express.Router();
var cors = require("cors");
app.use(cors());
let user = require("../models/User");
const { json } = require("body-parser");