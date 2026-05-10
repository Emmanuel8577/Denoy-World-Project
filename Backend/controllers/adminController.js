import Project from "../models/Project.js";
import User from "../models/User.js";
import Message from "../models/Message.js";

// @desc    Get all projects for admin view
// @route   GET /api/admin/all-projects
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users and populate their projects so you can see them in the dashboard
    const users = await User.find({}).populate("projects").select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not fetch users",
    });
  }
};

// @desc    Update project status (Pending -> Processing)
// @route   PATCH /api/admin/status/:id
export const updateProjectStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    // Only an admin (Emmanuel) should see these
    const messages = await Message.find().sort("-createdAt");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
