import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        about: { type: String, required: true },
        requirements: [{ type: String }],
        company: { type: String },
        location: { type: String },
        salary: { type: String },
        employmentType: { type: String, enum: ["Full-time", "Part-time", "Internship", "Contract"], required: true },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
        applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    },
    { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
