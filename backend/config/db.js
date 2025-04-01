const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  // initaly was trying to directly connect the database but was facing problem so changed it as a function and passed it to the main server file for maintained connection 
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
