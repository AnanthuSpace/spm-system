import { generateAccessToken } from "../../config/jwtConfig.js";
import Student from "../../models/student.model.js";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (email !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const accessToken = generateAccessToken(email)
        res.status(200).json({ success: true, message: "Login successful", accessToken });
    } catch (error) {
        console.log(error)
        next(error)
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await Student.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        next(error);
    }
};
