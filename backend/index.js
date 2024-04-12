const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
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
app.use(require("./routes/routes"));
app.get("/", (req, res) => {
  res.send("server is live");
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
