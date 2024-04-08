const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const connectToDatabase = require("../database/connection");
const User = require("../database/models");
const transporter = require("../utils");

const register = async (req, res) => {
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
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });
      if (!token) {
        res
          .status(400)
          .json({ message: "error occurred while generating token" });
      }
      res
        .status(201)
        .cookie("token", token, {
          httpOnly: true,
        })
        .json({
          message: "Verification email sent successfully",
          user: newUser,
        });
    }
  });
};
exports.register = register;

const updateUser = async (req, res) => {
  const { imageUrl, imageKey, location } = req.body;
  const token = req.cookies.token;
  const { userId } = jwt.decode(token);
  await connectToDatabase();
  const updateUser = await User.findByIdAndUpdate(userId, {
    profilePic: imageUrl,
    imageKey,
    location,
  });

  res.status(200).send({ success: true });
};
exports.updateUser = updateUser;
