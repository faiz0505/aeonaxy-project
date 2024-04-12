const express = require("express");
const {
  register,
  updateUser,
  signin,
  fetchUserData,
} = require("../controllers/user.contollers");
const {
  fetchToken,
  verifyEmailByToken,
  removeCookie,
} = require("../controllers/cookie.controller");
const router = express.Router();
router.post("/register", register);
router.post("/update-profile", updateUser);
router.get("/fetch-token", fetchToken);
router.post("/verify-token", verifyEmailByToken);
router.post("/sign-in", signin);
router.post("/logout", removeCookie);
router.post("/fetch-user", fetchUserData);
module.exports = router;
