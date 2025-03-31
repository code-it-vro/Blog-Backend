const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB is now Connected"))
  .catch((err) => console.log("Some error in connecting to MongoDB:", err));

module.exports = mongoose;
