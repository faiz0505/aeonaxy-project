const jwt = require("jsonwebtoken");
const User = require("../database/models");
const connectToDatabase = require("../database/connection");
const fetchToken = (req, res) => {
  const token = req.cookies.token;
  const decodedToken = jwt.decode(token);
  res.status(200).json({ user: decodedToken, token: token });
};
exports.fetchToken = fetchToken;

const verifyEmailByToken = (req, res) => {
  // Verification endpoint
  const { token } = req.body;

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res
        .status(400)
        .send("Invalid or expired verification link." + err);
    }
    await connectToDatabase();
    const user = await User.findOneAndUpdate(
      { email: decoded.email },
      { $set: { isVerified: true } },
      { new: true }
    );
    const updateToken = jwt.sign(
      {
        email: user.email,
        isVerified: user.isVerified,
        profile: user.profilePic,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res
      .status(200)
      .cookie("token", updateToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "none",
      })
      .json({ success: true });
  });
};
exports.verifyEmailByToken = verifyEmailByToken;

const removeCookie = (req, res) => {
  return res.status(200).clearCookie().json({ success: true });
};
exports.removeCookie = removeCookie;
