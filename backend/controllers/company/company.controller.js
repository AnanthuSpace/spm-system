import { generateAccessToken } from "../../config/jwtConfig.js";
import Company from "../../models/company.model.js";
import bcrypt from "bcrypt";
import Job from "../../models/jobs.model.js";
import Student from "../../models/student.model.js";

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

        if (company.status === "pending") {
            return res.status(403).json({ success: false, message: "Your company profile is under review. Please wait for approval." });
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

export const getCompanyProfile = async (req, res, next) => {
    try {
        const companyId = req.id
        if (!companyId) {
            return res.status(400).json({ message: "Company ID is required" });
        }
        const company = await Company.findById(companyId).select("-password");
        if (!company) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(company);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

export const updateCompany = async (req, res, next) => {
    try {
        const companyId = req.id;
        const companyData = req.body
        const existingCompany = await Company.findById(companyId);
        if (!existingCompany) {
            return res.status(404).json({ message: "Company not found" });
        }

        const updatedCompany = await Company.findByIdAndUpdate(
            companyId,
            { $set: companyData },
            { new: true, runValidators: true }
        );

        if (!updatedCompany) {
            return res.status(400).json({ message: "Failed to update company" });
        }


        res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company: updatedCompany
        });

    } catch (error) {
        console.error("Error updating company:", error);
        next(error);
    }
};

export const addJobs = async (req, res, next) => {
    try {
        const companyId = req.id;
        const jobData = req.body;
        const company = await Company.findById(companyId).select("-password");
        if (!companyId) {
            return res.status(400).json({ message: "Company ID is required" });
        }

        const newJob = new Job({
            ...jobData,
            postedBy: companyId,
            company: company.companyName
        });

        await newJob.save();

        res.status(201).json({
            success: true,
            message: "Job posted successfully",
            job: newJob,
        });

    } catch (error) {
        console.error("Error in new job:", error);
        next(error);
    }
}

export const getCompanyJobs = async (req, res, next) => {
    try {
        const companyId = req.id;

        if (!companyId) {
            return res.status(400).json({ message: "Company ID is required" });
        }

        const jobs = await Job.find({ postedBy: companyId });

        if (jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found for this company" });
        }

        res.status(200).json({
            success: true,
            count: jobs.length,
            jobs,
        });

    } catch (error) {
        console.error("Error fetching company jobs:", error);
        next(error);
    }
};

export const fetchStudents = async (req, res, next) => {
    try {
        const students = await Student.find();
        console.log(students)
        return res.status(200).json({
            success: true,
            students,
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        next(error)
    }
};