const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware.js");
const {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController.js");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", authMiddleware, upload.single("image"), createBlog);
router.get("/", getBlogs);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
