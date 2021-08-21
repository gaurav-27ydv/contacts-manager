const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
require("dotenv").config();

//GET STUDENTS
router.get("/", async (req, res) => {
  console.log("Display Students");
  const students = await loadStudents();
  res.render("index.ejs", {
    students: await students.find({}).toArray(),
  });
});

//ADD STUDENTS

router.get("/add", async (req, res) => {
  console.log("Add Students");
  res.render("add.ejs");
});

router.post("/", async (req, res) => {
  console.log("Students Added");
  const students = await loadStudents();
  await students.insertOne({
    enroll: req.body.enroll,
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
  });
  res.redirect("/api/students/");
  res.end();
});

//DELETE STUDENTS
router.get("/delete/:id", async (req, res) => {
  console.log("Student Removed");
  const students = await loadStudents();
  await students.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
  res.redirect("/api/students/");
  res.end();
});

//UPDATE STUDENTS
router.get("/updateStudent/:id", async (req, res) => {
  console.log("Move to Update Student");
  const students = await loadStudents();
  let oldStudent = await students
    .find({
      _id: new mongodb.ObjectId(req.params.id),
    })
    .toArray();
  res.render("update.ejs", { student: oldStudent[0] });
  res.end();
});

router.post("/update/:id", async (req, res) => {
  console.log("Student Updated");
  const students = await loadStudents();
  let oldStudent = await students
    .find({
      _id: new mongodb.ObjectId(req.params.id),
    })
    .toArray();
  let newStudent = {
    $set: { ...req.body },
  };
  var myQuery = { _id: new mongodb.ObjectId(req.params.id) };
  await students.updateOne(myQuery, newStudent);
  res.redirect("/api/students/");
  res.end();
});

async function loadStudents() {
  const client = await mongodb.MongoClient.connect(process.env.URL, {
    useNewUrlParser: true,
  });

  return client.db("StudentDB").collection("students");
}

module.exports = router;
