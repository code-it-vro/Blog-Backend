const express = require("express");
const multer = require("multer");
const { signup, login } = require("../controllers/authController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/signup", upload.single("profileImage"), signup);
router.post("/login", login);

module.exports = router;
