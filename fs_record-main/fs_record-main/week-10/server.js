const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Student = require("./models/Student");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/studentdb";

app.use(cors());
app.use(express.json());

// GET /students - Retrieve all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve students." });
  }
});

// POST /students - Create a student
app.post("/students", async (req, res) => {
  try {
    const { name, email, password, gender, country, languages } = req.body;

    if (!name || !email || !password || !gender || !country ||
        !Array.isArray(languages) || languages.length === 0) {
      return res.status(400).json({
        message: "Please provide all required student details."
      });
    }

    const student = new Student({
      name,
      email,
      password,
      gender,
      country,
      languages
    });

    const savedStudent = await student.save();

    res.status(201).json({
      message: "Registration successful",
      student: savedStudent
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register student." });
  }
});

// PUT /students/:id - Update a student
app.put("/students/:id", async (req, res) => {
  try {
    const { name, email, password, gender, country, languages } = req.body;

    if (!name || !email || !password || !gender || !country ||
        !Array.isArray(languages) || languages.length === 0) {
      return res.status(400).json({
        message: "Please provide all required student details."
      });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        password,
        gender,
        country,
        languages
      },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.json({
      message: "Student updated successfully",
      student: updatedStudent
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update student." });
  }
});

// DELETE /students/:id - Delete a student
app.delete("/students/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.json({
      message: "Student deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete student." });
  }
});

app.get("/", (req, res) => {
  res.send("Student Registration API is running.");
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB: studentdb");
    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
