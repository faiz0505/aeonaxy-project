const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const connectToDatabase = require("../database/connection");
const User = require("../database/models");
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "faizali786313@gmail.com", // your Gmail email address
    pass: "yfbo niqy sdnq svut", // your Gmail password
  },
});
const JWT_SECRET = "your_secret_key";
router.post("/register", async (req, res) => {
  const { name, username, email, password } = req.body;
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
  await connectToDatabase();
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(401).json({ message: "User already exists" });
    return;
  }
  // Email body
  const mailOptions = {
    from: "faizali786313@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Click on the link to verify your email: http://localhost:3000/verify-email?token=${token}`,
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
      res
        .status(200)
        .json({
          message: "Verification email sent successfully",
          user: newUser,
        });
    }
  });
});

module.exports = router;
