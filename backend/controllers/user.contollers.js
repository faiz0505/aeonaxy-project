const jwt = require("jsonwebtoken");
const connectToDatabase = require("../database/connection");
const User = require("../database/models");
const transporter = require("../utils");
const clientUrl = process.env.CLIENT_URL;
const register = async (req, res) => {
  const { name, username, email, password } = req.body;
  const token = jwt.sign({ email, isVarified: false }, process.env.JWT_SECRET, {
    expiresIn: "7d",
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
    html: `<p>Dribble</p><h1>Signup to Dribble</h1><p>Click the button below to signup</p><a href="${clientUrl}/verify-token?token=${token}"><button style="background:#3630a3;color:white;padding:4px 2px;">Signup to Dribble</button></a>`,
  };

  // Send email
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      res.status(401).json({ error: "Failed to send verification email" });
    } else {
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
          maxAge: 7 * 24 * 60 * 60 * 1000,
          secure: true,
          overwrite: true,
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
  const { type, imageUrl, imageId, location, role, newEmail } = req.body;
  const token = req.cookies.token;
  const { email } = jwt.decode(token);
  await connectToDatabase();
  if (type === "createProfile") {
    const updateUser = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          profilePic: imageUrl,
          imageId,
          location,
        },
      },
      { new: true }
    );
    const updateToken = jwt.sign(
      {
        email: updateUser.email,
        isVerified: updateUser.isVerified,
        profile: updateUser.profilePic,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    if (!updateToken) {
      return res
        .status(400)
        .json({ message: "An error has occurred updating the token." });
    }
    res
      .status(200)
      .cookie("token", updateToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
        overwrite: true,
      })
      .json({ success: true });
  } else if (type === "changeEmail") {
    const updateUser = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          email: newEmail,
        },
      },
      { new: true }
    );
    const updateToken = jwt.sign(
      {
        email: updateUser.email,
        isVerified: updateUser.isVerified,
        profile: updateUser.profilePic,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const mailOptions = {
      from: "faizali786313@gmail.com",
      to: updateUser.email,
      subject: "Email Verification",
      html: `<p>Dribble</p><h1>Signup to Dribble</h1><p>Click the button below to signup</p><a href="${clientUrl}/verify-token?token=${updateToken}"><button style="background:#3630a3;color:white;padding:4px 2px;">Signup to Dribble</button></a>`,
    };

    transporter.sendMail(mailOptions, async (err, info) => {
      if (err) {
        res.status(400).json({ error: "Email not sent! please try again" });
        return;
      }
      res
        .status(200)
        .cookie("token", updateToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          secure: true,
          overwrite: true,
        })
        .json({ success: true, message: updateUser });
    });
  } else {
    const updateUser = await User.findOneAndUpdate(
      { email },
      { $set: { role } },
      { new: true }
    );
    if (!updateUser) {
      res.status(400).json({
        message: "user not found or error occurred while updating profile",
      });
      return;
    }
    res.status(200).send({ success: true, data: updateUser });
  }
};
exports.updateUser = updateUser;

const signin = async (req, res) => {
  const { user } = req.body;
  try {
    await connectToDatabase();
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "user not found! please register" });
    }
    if (user.password !== existingUser.password) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      {
        email: user.email,
        isVerified: existingUser.isVerified,
        profile: existingUser.profilePic,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
        overwrite: true,
      })
      .json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
exports.signin = signin;

const fetchUserData = async (req, res, next) => {
  const { user } = req.body;
  try {
    await connectToDatabase();
    const fethedUser = await User.findOne({ email: user });
    res.status(200).json({ user: fethedUser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
exports.fetchUserData = fetchUserData;
