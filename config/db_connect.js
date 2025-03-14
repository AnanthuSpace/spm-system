const mongoose = require("mongoose")

const dbconnect = mongoose.connect(process.env.CONNECT)
dbconnect
    .then(() => console.log("DB Connected"))
    .catch((err) => console.error("DB Connection Error:", err.message));