const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "faizali786313@gmail.com",
    pass: "yfbo niqy sdnq svut",
  },
});

module.exports = transporter;
// http://localhost:3000/verify-email?token=${token}