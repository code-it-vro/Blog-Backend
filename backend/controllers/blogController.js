const Blog = require("../models/blog");

exports.createBlog = async (req, res) => {
  try {
    const { title, image, description } = req.body;
    const author = req.user.id; 

    const newBlog = new Blog({
      title,
      image,
      description,
      author,
    });

    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating blog", error: error.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blogs", error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedBlog)
      return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating blog", error: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog)
      return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting blog", error: error.message });
  }
};
