import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String },
        cityState: { type: String },
        highestQualification: { type: String },
        university: { type: String },
        graduationYear: { type: Number },
        cgpaOrPercentage: { type: String },
        skills: [{ type: String }],
        certificates: [{ type: String }],
        resume: { type: String },
        appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    },
    { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
