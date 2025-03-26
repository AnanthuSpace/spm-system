import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        otp: { type: String },
        phone: { type: String },
        education: [
            {
                institution: String,
                degree: String,
                fieldOfStudy: String,
                startYear: Number,
                endYear: Number,
            },
        ],
        skills: [{ type: String }],
        resume: { type: String },
        appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
