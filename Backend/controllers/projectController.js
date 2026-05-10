import { cloudinary } from "../Config/cloudinary.js";
import Project from "../models/Project.js";

// CREATE NEW PROJECT
export const createProject = async (req, res) => {
  try {
    const { type, instructions } = req.body;
    const file = req.file;

    if (!file)
      return res.status(400).json({ success: false, message: "No file uploaded" });

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
      folder: "denyo_connect/projects",
    });

    const newProject = await Project.create({
      userId: req.user.id, 
      title: `${type} Project`,
      description: instructions,
      fileType: type,
      originalFileUrl: result.secure_url,
      status: "pending",
    });

    res.status(201).json({ success: true, project: newProject });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// FETCH USER PROJECTS (FOR THE INBOX)
export const getUserProjects = async (req, res) => {
  try {
    // req.user.id is populated by your authUser middleware
    const userId = req.user.id; 
    
    // Find all projects belonging to this user, sorted by newest first
    const projects = await Project.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ 
      success: true, 
      projects 
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};