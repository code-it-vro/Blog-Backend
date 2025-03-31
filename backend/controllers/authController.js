const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    // extracting or destructuring email and password from the request body and hashing the password before saving it
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 5);

    const user = new User({
      email,
      password: hashedPassword,
      profileImage: req.file ? req.file.path : null,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
};

exports.login = async (req, res) => {
  try {
    // extracting or destructuring email and password from the request body and checking if the user exists and if the password is correct we will sign a jwt token and return it
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};
