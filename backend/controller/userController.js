import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        // validation
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "all feilds must be failed" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "email is not valid" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "password is not strong" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const assignRole = await Role.findOne({ role_name: "student" });
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            username,
            role: assignRole,
        });

        // await newUser.save();
        return res.status(201).json({
            user: newUser,
            message: "User registered successfully",
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// user log in Auth

export const userlogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "invalid email " });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "invalid password" });
        }

        // return res.status(201).json({ message: "login succefully", user });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRIT, {
            expiresIn: "12h",
        });
        if (token) {
            return res.json({ message: "login succefully", token });
        }
    } catch (err) {
        res.status(500).json({ message: "server error" });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        // const users = await User.find({}, "-password"); // exclude passwords
        const users = await User.find({}).populate("role");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get role info of a specific user
export const getRoleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("role");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // res.status(200).json({ role: user.role });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Update user
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
