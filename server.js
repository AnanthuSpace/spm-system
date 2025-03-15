const express = require('express');
const dotenv = require("dotenv")
dotenv.config()
const cors = require('cors');
const nocache = require("nocache")
require("./config/db_connect")
const studentRoute = require("./routes/student.routes")
const companyRoute = require("./routes/company.routes")
const app = express();

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(nocache())


app.use("/", studentRoute)
app.use("/company", companyRoute)


app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello, Express Backend!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
