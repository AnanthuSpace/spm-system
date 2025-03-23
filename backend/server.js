const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const nocache = require("nocache");
require("./config/db_connect");
const studentRoute = require("./routes/student.routes");
const companyRoute = require("./routes/company.routes");
const path = require('path');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(nocache());

app.use("/company", companyRoute);
app.use("/", studentRoute);

app.use(notFoundHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
