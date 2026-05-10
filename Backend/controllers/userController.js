import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new user
// @route   POST /api/user/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate user
// @route   POST /api/user/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check for Hardcoded Admin in .env
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            return res.status(200).json({
                _id: "admin-id-placeholder",
                name: "Ufedo Baba-Onoja", 
                email: process.env.ADMIN_EMAIL,
                role: "admin",
                token: generateToken("admin-id-placeholder") 
            });
        }

        // 2. Normal Database login
        const user = await User.findOne({ email });

        // CRITICAL FIX: You were missing the logic below, causing the "Processing" hang
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            // If user doesn't exist or password wrong, send 401
            res.status(401).json({ message: "Invalid email or password" });
        }

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/user/profile
export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
};