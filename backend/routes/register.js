const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const connectToDatabase = require("../database/connection");
const User = require("../database/models");
const router = express.Router();
const transporter = require("../utils");
const JWT_SECRET = "your_secret_key";

router.post("/register", async (req, res) => {
  const { name, username, email, password } = req.body;
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
  await connectToDatabase();
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(401).json({ message: "Email already registered" });
    return;
  }
  const userNameExist = await User.findOne({ username });
  if (userNameExist) {
    res.status(401).json({ message: "Username has already been taken" });
    return;
  }
  const mailOptions = {
    from: "faizali786313@gmail.com",
    to: email,
    subject: "Email Verification",
    html: `<p>Dribble</p><h1>Signup to Dribble</h1><p>Click the button below to signup</p><button><a href="http://localhost:3000/verify-email?token=${token}">Signup to Dribble</a></button>`,
  };

  // Send email
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to send verification email" });
    } else {
      console.log("Email sent: " + info.response);
      const newUser = await User.create({
        name,
        username,
        email,
        password,
        isVerified: false,
      });

      res.status(201).json({
        message: "Verification email sent successfully",
        user: newUser,
      });
    }
  });
});

module.exports = router;
