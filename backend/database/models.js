const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  porfilePic: String,
  imagekey: String,
  location: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
});

// Create a model from the schema
const User = mongoose.models.users || mongoose.model("users", userSchema);

module.exports = User;
