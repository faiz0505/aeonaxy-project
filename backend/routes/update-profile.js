const express = require("express");
const router = express.Router();
const connectToDatabase = require("../database/connection");
const User = require("../database/models");
router.post("/update-profile", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    // await connectToDatabase();
    // const updatedUser = await User.findOneAndUpdate(
    //   { user },
    //   {
    //     profilePic,
    //     location,
    //   }
    // );
    // if (!updatedUser) {
    //   res.status(409).json({ error: "User update failed" });
    //   return;
    // }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: `Error updating profile` }, error);
  }
});
