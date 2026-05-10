import express from 'express';
import multer from 'multer';
import { createProject, getUserProjects } from '../controllers/projectController.js';
import { authUser } from '../middleware/auth.js';

const projectRouter = express.Router();
const upload = multer({ dest: 'uploads/' }); 

// POST: /api/projects/upload
projectRouter.post('/upload', authUser, upload.single('file'), createProject);

// GET: /api/projects/user-projects (THIS WAS MISSING)
projectRouter.get('/user-projects', authUser, getUserProjects);

export default projectRouter;