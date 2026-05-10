import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
// IMPORTANT: Ensure the path and case match your folder exactly
import User from './src/models/User.js'; 

dotenv.config();

const seedAdmin = async () => {
    try {
        // Ensure your .env has MONGO_URI
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing in .env file");
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB...");

        const adminEmail = 'denyoglobal100@gmail.com';
        const adminExists = await User.findOne({ email: adminEmail });

        if (adminExists) {
            console.log(`Admin with email ${adminEmail} already exists!`);
            // Optional: Update existing user to admin role if they aren't already
            if (adminExists.role !== 'admin') {
                adminExists.role = 'admin';
                await adminExists.save();
                console.log("Existing user promoted to Admin.");
            }
            process.exit();
        }

        const hashedPassword = await bcrypt.hash('AdminPassword123!', 10);

        const newAdmin = new User({
            name: 'Ufedo Baba-Onoja',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin' // Matches your schema enum ["user", "admin"]
        });

        await newAdmin.save();
        console.log("--- Success ---");
        console.log("Admin Email: admin@denyoworld.com");
        console.log("Admin Password: AdminPassword123!");
        process.exit();

    } catch (error) {
        console.error("Critical Seeding Error:", error.message);
        process.exit(1);
    }
};

seedAdmin();