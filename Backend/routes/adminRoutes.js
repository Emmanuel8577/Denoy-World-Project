import express from 'express';
import Project from '../models/Project.js';
import User from '../models/User.js';
import { authAdmin } from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import { v2 as cloudinary } from 'cloudinary';

const adminRouter = express.Router();

// 1. Fetch All Projects (For Dashboard View)
adminRouter.get('/all-projects', authAdmin, async (req, res) => {
    try {
        const projects = await Project.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
        res.json({ success: true, projects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 2. Fetch All Users + Their Projects (For User Management View)
adminRouter.get('/all-users', authAdmin, async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password').lean();
        const allProjects = await Project.find({}).lean();

        const usersWithProjects = users.map(user => ({
            ...user,
            projects: allProjects.filter(p => p.userId && p.userId.toString() === user._id.toString())
        }));

        res.json({ success: true, users: usersWithProjects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 3. Deliver Asset Logic (Upload completed file)
adminRouter.post('/upload-completed', authAdmin, upload.single('file'), async (req, res) => {
    try {
        const { projectId } = req.body;
        if (!req.file) return res.status(400).json({ success: false, message: "No file provided" });

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "auto",
            folder: "denyo_world/completed_works"
        });

        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            { 
                translatedFileUrl: result.secure_url, 
                status: "completed",
                completedAt: Date.now() 
            },
            { new: true } 
        ).populate('userId', 'name email');

        res.json({ 
            success: true, 
            project: updatedProject, 
            message: "File delivered successfully" 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default adminRouter;