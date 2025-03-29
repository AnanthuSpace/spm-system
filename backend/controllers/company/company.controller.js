import { generateAccessToken } from "../../config/jwtConfig.js";
import Company from "../../models/company.model.js";
import bcrypt from "bcrypt";

export const pongFromCompany = async (req, res) => {
    console.log("Pong from Company Controller");
    res.json({ message: "Pong from Company Controller" });
};


export const companyRegistration = async (req, res, next) => {
    try {
        const {
            companyName,
            email,
            password,
            confirmPassword,
            address,
            industry,
            description,
            phone,
            website,
            city,
            state,
            companySize,
            foundedYear,
            type,
        } = req.body;

        if (
            !companyName ||
            !email ||
            !password ||
            !confirmPassword ||
            !address ||
            !industry ||
            !description ||
            !phone ||
            !website ||
            !city ||
            !state ||
            !companySize ||
            !foundedYear ||
            !type
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existingCompany = await Company.findOne({ email });
        if (existingCompany) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newCompany = new Company({
            companyName,
            email,
            password: hashedPassword,
            address,
            industry,
            description,
            phone,
            website,
            city,
            state,
            companySize,
            foundedYear,
            type,
            status: "pending",
        });

        const result = await newCompany.save();
        const token = generateAccessToken(result._id)
        res.status(201).json({ success: true, message: "Company registered successfully", token });
    } catch (error) {
        next(error);
    }
};

export const companyLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const company = await Company.findOne({ email });
        if (!company) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const accessToken = generateAccessToken(company._id)

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: { companyData: company, accessToken },
        });

    } catch (error) {
        next(error);
    }
};