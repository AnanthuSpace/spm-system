import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        companyName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        industry: { type: String, required: true },
        website: { type: String, required: true },
        description: { type: String, required: true },
        companySize: { type: String, required: true },
        foundedYear: { type: Number, required: true },
        type: { type: String, required: true, enum: ["Public", "Private", "Startup", "Other"] },
        status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
        jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    },
    { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);
export default Company;
