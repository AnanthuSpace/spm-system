import mongoose from "mongoose";
import { generateAccessToken } from "../../config/jwtConfig.js";
import { sendMail } from "../../config/nodeMailer.js";
import Company from "../../models/company.model.js";
import Job from "../../models/jobs.model.js";
import Student from "../../models/student.model.js";
import bcrypt from "bcrypt";

const otpStore = {};

export const pongFromStudent = async (req, res, next) => {
    try {
        res.json({ message: "Pong from Student Controller" });
    } catch (error) {
        next(error);
    }
};

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await Student.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const accessToken = generateAccessToken(user._id)

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: { userData: user, accessToken: accessToken },
        });

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

        const OTP = Math.floor(100000 + Math.random() * 900000).toString();

        otpStore[email] = {
            OTP,
            userData: { fullName: name, email, password: hashedPassword }
        };

        await sendMail(email, "otp", OTP);

        console.log("otp : ", OTP)
        res.status(201).json({ success: true, message: "OTP sent to your email. Please verify to complete registration." });

    } catch (error) {
        console.error("Registration Error:", error);
        next(error);
    }
};

export const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        if (!otpStore[email]) {
            return res.status(400).json({ message: "OTP expired or invalid. Please request a new one." });
        }

        const { OTP, userData } = otpStore[email];

        if (otp !== OTP) {
            return res.status(400).json({ message: "Incorrect OTP. Please try again." });
        }

        const newStudent = new Student({
            fullName: userData.fullName,
            email: userData.email,
            password: userData.password,
        });
        await newStudent.save();

        delete otpStore[email];

        res.status(201).json({ success: true, message: "Account verified and registered successfully!" });

    } catch (error) {
        console.error("OTP Verification Error:", error);
        next(error);
    }
};

export const resendOtp = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!otpStore[email]) {
            return res.status(400).json({ message: "No existing OTP request. Please register again." });
        }

        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[email].otp = newOtp;
        otpStore[email].timestamp = Date.now();

        await sendMail(email, "otp", newOtp);

        res.status(200).json({ success: true, message: "New OTP sent to your email." });

    } catch (error) {
        console.error("Resend OTP Error:", error);
        next(error);
    }
};

export const fetchUser = async (req, res, next) => {
    try {
        const userId = req.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const user = await Student.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        next(error)
    }
}

export const JobApply = async (req, res, next) => {
    try {
        const userId = req.id;
        const { jobId } = req.body;

        console.log(jobId)
        if (!userId || !jobId) {
            return res.status(400).json({ message: "User ID and Job ID are required." });
        }

        const user = await Student.findById(userId);
        const job = await Job.findById(jobId);

        if (!user || !job) {
            return res.status(404).json({ message: "User or Job not found." });
        }

        if (user.appliedJobs.includes(jobId)) {
            return res.status(400).json({ message: "You have already applied for this job." });
        }

        user.appliedJobs.push(jobId);
        await user.save();

        job.applicants.push(userId);
        const updateJob = await job.save();

        return res.status(200).json({
            success: true,
            message: "Job application submitted successfully.",
            appliedJob: updateJob,
        });

    } catch (error) {
        console.error("Error applying for job:", error);
        next(error);
    }
};

export const fetchCompanies = async (req, res, next) => {
    try {
        const company = await Company.find({ status: "approved" }).select("-password");
        res.status(200).json({ success: true, company });
    } catch (error) {
        console.error("Error fetching user:", error);
        next(error)
    }
}

export const fetchJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find();
        res.status(200).json({ success: true, jobs });
    } catch (error) {
        console.error("Error fetching user:", error);
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const userId = req.id;
        const updateData = req.body;

        if (req.files) {
            if (req.files.resume) {
                updateData.resume = `/documents/${req.files.resume[0].filename}`;
            }
            if (req.files.certificates) {
                updateData.certificates = `/documents/${req.files.certificates[0].filename}`;
            }
        }

        console.log(updateData)
        const updatedUser = await Student.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ success: true, message: "Profile updated successfully", data: updatedUser });
    } catch (error) {
        console.error("Profile updation Error:", error);
        next(error);
    }
};

export const getAppliedJobs = async (req, res, next) => {
    try {
        const userId = req.id;
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required." });
        }

        const result = await Student.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(userId) } },  

            {
                $lookup: {
                    from: "jobs",
                    let: { appliedJobIds: "$appliedJobs" }, 
                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$_id", { $map: { input: "$$appliedJobIds", as: "id", in: { $toObjectId: "$$id" } } }] }
                            }
                        }
                    ],
                    as: "appliedJobs"
                }
            },
            {
                $project: {
                    _id: 0,
                    appliedJobs: 1,
                },
            },
        ]);

        if (!result.length) {
            return res.status(404).json({ success: false, message: "User not found or no applied jobs." });
        }

        return res.status(200).json({
            success: true,
            appliedJobs: result[0].appliedJobs, // Extract the appliedJobs array
        });

    } catch (error) {
        console.error("Error fetching applied jobs:", error);
        next(error);
    }
};