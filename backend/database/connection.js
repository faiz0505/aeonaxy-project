const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const uri = `mongodb+srv://${username}:${password}@cluster0.ucoabty.mongodb.net/?retryWrites=true&w=majority`;

    await mongoose.connect(uri);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToDatabase;
