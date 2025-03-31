import { generateAccessToken } from "../../config/jwtConfig.js";
import { sendMail } from "../../config/nodeMailer.js";
import Company from "../../models/company.model.js";
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

export const getCompany = async (req, res, next) => {
    try {
        const approvedCompanies = await Company.find({ status: "approved" }).select("-password");
        res.status(200).json({ success: true, approvedCompanies });
    } catch (error) {
        console.error("Error fetching approved companies:", error);
        next(error);
    }
};

export const getPendingCompany = async (req, res, next) => {
    try {
        const pendingCompanies = await Company.find({ status: "pending" }).select("-password");
        res.status(200).json({ success: true, pendingCompanies });
    } catch (error) {
        console.error("Error fetching approved companies:", error);
        next(error);
    }
};

export const companyVerification = async (req, res, next) => {
    try {
        const { companyId, status, reason } = req.body;

        // Validate status input
        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status. Allowed values: 'approved' or 'rejected'." });
        }

        // Find the company
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ success: false, message: "Company not found." });
        }

        // Handle rejection
        if (status === "rejected") {
            await sendMail(company.email, status, "", reason);
            await Company.findByIdAndDelete(companyId); // Delete the company
            return res.status(200).json({
                success: true,
                message: "Company has been rejected and removed.",
            });
        }

        // Handle approval
        const updatedCompany = await Company.findByIdAndUpdate(
            companyId,
            { status },
            { new: true }
        );

        await sendMail(company.email, status);

        res.status(200).json({
            success: true,
            message: `Company has been ${status}.`,
            company: updatedCompany,
        });

    } catch (error) {
        console.error("Error fetching approved companies:", error);
        next(error);
    }
}