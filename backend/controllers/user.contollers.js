const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const connectToDatabase = require("../database/connection");
const User = require("../database/models");
const transporter = require("../utils");
const { response } = require("express");

const register = async (req, res) => {
  const { name, username, email, password } = req.body;
  const token = jwt.sign({ email, isVarified: false }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
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
    html: `<p>Dribble</p><h1>Signup to Dribble</h1><p>Click the button below to signup</p><button style="background:#3630a3;color:white;padding:"4px,2px";"><a href="http://localhost:3000/verify-email?token=${token}">Signup to Dribble</a></button>`,
  };

  // Send email
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log(error);
      res.status(401).json({ error: "Failed to send verification email" });
    } else {
      console.log("Email sent: " + info.response);
      const newUser = await User.create({
        name,
        username,
        email,
        password,
        profilePic: "",
        imageId: "",
        location: "",
        role: "",
        isVerified: false,
      });
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
  const { type, imageUrl, imageId, location, role } = req.body;
  const token = req.cookies.token;
  const { email } = jwt.decode(token);
  let updateUser;
  await connectToDatabase();
  if (type === "createProfile") {
    updateUser = await User.updateMany(
      { email },
      {
        profilePic: imageUrl,
        imageId,
        location,
      }
    );
  } else {
    updateUser = await User.updateOne(
      { email },
      {
        role,
      }
    );
  }
  if (!updateUser) {
    res.status(400).json({
      message: "user not found or error occurred while updating profile",
    });
    return;
  }
  res.status(200).send({ success: true, data: updateUser });
};
exports.updateUser = updateUser;
