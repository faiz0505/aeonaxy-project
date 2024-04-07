const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectToDatabase = require("./database/connection");
require("dotenv").config();
const app = express();
const clientUrl = process.env.CLIENT_URL;
app.use(cors({ origin: [clientUrl] }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("./routes/register"));
app.get("/", async (req, res) => {
  await connectToDatabase();
  res.send("Welcome to the world");
});
app.get("/verify-email", (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Redirect to create profile page
    res.redirect(`/create-profile?email=${decoded.email}`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Invalid token" });
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
