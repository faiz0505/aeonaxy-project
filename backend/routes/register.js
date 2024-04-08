const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const connectToDatabase = require("../database/connection");
const User = require("../database/models");
const router = express.Router();
const transporter = require("../utils");
const JWT_SECRET = "your_secret_key";

router.post("/register", );

module.exports = router;
