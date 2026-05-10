import jwt from "jsonwebtoken";

// This handles standard users
export const authUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Token failed or expired" });
    }
};

// ADD THIS: Alias authUser as authAdmin if they use the same logic, 
// or add extra logic here to check if req.user.role === 'admin'
export const authAdmin = authUser;