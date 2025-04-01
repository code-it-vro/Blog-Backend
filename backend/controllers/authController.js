const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    // destructuring the email and password from the body and checking for existing user if not then string the password after hashing and using salt round 10 times 
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      profileImage: req.file ? req.file.path : null,
    });

    await user.save();

    // if everyhting is fine then send the token after signing the jwt 

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ message: "User created successfully", token, user });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // we will check the stored password and the provided pasword that user has entered using the inbuilt bcrupt method compare 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
