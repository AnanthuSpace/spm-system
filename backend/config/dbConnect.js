const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.LOCAL_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB Connected");
    } catch (err) {
        console.error("DB Connection Error:", err.message);
        process.exit(1);
    }
};

connectDB();

module.exports = mongoose;
