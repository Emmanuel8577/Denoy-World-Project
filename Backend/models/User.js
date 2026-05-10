import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Please add a name"] 
    },
    email: { 
        type: String, 
        required: [true, "Please add an email"], 
        unique: true,
        match: [/.+\@.+\..+/, "Please use a valid email address"]
    },
    password: { 
        type: String, 
        required: [true, "Please add a password"],
        minlength: 6
    },
    role: { 
        type: String, 
        enum: ["user", "admin"], 
        default: "user" 
    },
    // ADD THIS FIELD TO FIX THE 500 ERROR
    projects: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Project" 
    }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;