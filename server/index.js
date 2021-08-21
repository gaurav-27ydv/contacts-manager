const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const students = require("./routes/api/students");
app.use("/api/students", students);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on PORT: ${PORT}`));
