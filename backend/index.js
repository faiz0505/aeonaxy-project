const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectToDatabase = require("./database/connection");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const clientUrl = process.env.CLIENT_URL;
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});
app.use(cors({ origin: [clientUrl, "http://localhost"], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("./routes/register"));
app.post("/", (req, res) => {
  const { name } = req.body;
  res
    .cookie("token", name, {
      httpOnly: true,
      sameSite: "none",
    })
    .send(JSON.stringify({ name }));
});
app.get("/get-cookie", (req, res) => {
  const cookie = req.cookies.token;
  console.log(cookie);
  res.send(cookie);
});
app.get("/verify-email", (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Invalid token" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
