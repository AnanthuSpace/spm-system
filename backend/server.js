import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConnect.js";
import studentRoute from "./routes/student.routes.js";
import companyRoute from "./routes/company.routes.js";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();
connectDB();

const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/company", companyRoute);
app.use("/", studentRoute);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
