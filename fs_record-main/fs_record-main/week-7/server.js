const express = require("express");
const fs = require("fs");
const os = require("os");
const dns = require("dns");

const app = express();

const PORT = 3000;
const DATA_FILE = "students.json";

// Middleware to read JSON request bodies
app.use(express.json());

// Serve static files from public folder
app.use(express.static("public"));

// Function to read students from JSON file
function readStudents() {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
}

// Function to save students to JSON file
function saveStudents(students) {
    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(students, null, 2)
    );
}

// Home route
app.get("/", (req, res) => {
    res.send(`
        <h1>Student Course Management System</h1>
        <p>Welcome to the application!</p>
        <p>Use /students to view all students.</p>
    `);
});

// 1. GET /students
// Display all students
app.get("/students", (req, res) => {
    const students = readStudents();

    res.json(students);
});

// 2. GET /students/:id
// Display one student using URL parameter
app.get("/students/:id", (req, res) => {
    const students = readStudents();

    const studentId = Number(req.params.id);

    const student = students.find(
        (s) => s.id === studentId
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

// 3. GET /search?course=Node.js
// Search students using query parameter
app.get("/search", (req, res) => {
    const students = readStudents();

    const course = req.query.course;

    if (!course) {
        return res.status(400).json({
            message: "Please provide a course"
        });
    }

    const result = students.filter(
        (s) => s.course.toLowerCase() === course.toLowerCase()
    );

    res.json(result);
});

// 4. GET /system
// Display system information using os module
app.get("/system", (req, res) => {
    res.json({
        operatingSystem: os.platform(),
        architecture: os.arch(),
        hostname: os.hostname(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        cpuCount: os.cpus().length,
        uptime: os.uptime()
    });
});

// 5. GET /dns
// Resolve a domain name using dns module
app.get("/dns", (req, res) => {
    const domain = "google.com";

    dns.lookup(domain, (error, address, family) => {
        if (error) {
            return res.status(500).json({
                message: "DNS lookup failed",
                error: error.message
            });
        }

        res.json({
            domain: domain,
            ipAddress: address,
            ipVersion: family
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
