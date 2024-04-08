const express = require("express");
const { register, updateUser } = require("../controllers/user.contollers");
const router = express.Router();
router.post("/register", register);
router.post("/update-profile", updateUser);
module.exports = router;
