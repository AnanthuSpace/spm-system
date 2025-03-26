import { sendMail } from "../../config/nodeMailer.js";
import Student from "../../models/student.model.js"; // ✅ Correct import
import bcrypt from "bcrypt";

export const pongFromStudent = async (req, res, next) => {
    try {
        res.json({ message: "Pong from Student Controller" });
    } catch (error) {
        next(error);
    }
};

export const renderHome = async (req, res, next) => {
    try {
        res.json({ message: "Welcome to the Home Page" });
    } catch (error) {
        next(error);
    }
};

export const renderLogin = async (req, res, next) => {
    try {
        res.json({ message: "Login Page" });
    } catch (error) {
        next(error);
    }
};

export const userRegistration = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: "Email already registered!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const newStudent = new Student({
            userName: name,
            email,
            password: hashedPassword,
            otp,
        });

        const userData = await newStudent.save();

        await sendMail(email, "otp", otp);

        res.status(201).json({ message: "User registered successfully. OTP sent to email.", Student: userData });

    } catch (error) {
        console.error("Registration Error:", error);
        next(error);
    }
};
