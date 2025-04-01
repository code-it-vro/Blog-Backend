const express = require("express");
const dotenv = require("dotenv");
const app = express();
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const connectDB = require("./config/db");

dotenv.config();

app.use(express.json());
app.use('/uploads', express.static('uploads'));
connectDB();

app.use("/api/auth",authRoutes);
app.use("/api/blogs",blogRoutes);
app.get("/", (req, res) => res.send("Your backend is running"));

const PORT  = process.env.PORT || 3000;
app.listen(PORT , ()=> console.log(`Server is running on port ${PORT}`));