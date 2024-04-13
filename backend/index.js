const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const clientUrl = process.env.CLIENT_URL;
app.use(
  cors({
    origin: [clientUrl],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("trust proxy");
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./routes/routes"));

// Catch-all route to serve the main HTML file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
