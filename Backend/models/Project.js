import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String }, // User's specific instructions
    fileType: { type: String, enum: ["image", "video", "audio", "document"] },
    originalFileUrl: { type: String, required: true },
    targetLanguages: [String],
    status: { type: String, default: "pending", enum: ["pending", "processing", "completed"] },
    translatedFileUrl: { type: String }
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);