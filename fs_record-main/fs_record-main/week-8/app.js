const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const usersFile = path.join(__dirname, "users.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

function readUsers() {
    try {
        if (!fs.existsSync(usersFile)) {
            fs.writeFileSync(usersFile, "[]");
        }
        const data = fs.readFileSync(usersFile, "utf8");
        return JSON.parse(data || "[]");
    } catch (error) {
        console.error("Error reading users.json:", error);
        return [];
    }
}

function writeUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.post("/register", (req, res) => {
    const { name, age, dob, gender, email, mobile, username, password, address, course } = req.body;

    if (!name || !age || !dob || !gender || !email || !mobile || !username || !password || !address || !course) {
        return res.status(400).json({
            success: false,
            message: "Please fill in all fields."
        });
    }

    const users = readUsers();

    const existingUser = users.find(
        user => user.username.toLowerCase() === username.toLowerCase() ||
                user.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "Username or email is already registered."
        });
    }

    const newUser = {
        id: Date.now(),
        name,
        age,
        dob,
        gender,
        email,
        mobile,
        username,
        password,
        address,
        course
    };

    users.push(newUser);
    writeUsers(users);

    res.json({
        success: true,
        message: "Registration successful! You can now login."
    });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Username/email and password are required."
        });
    }

    const users = readUsers();

    const user = users.find(
        item =>
            (item.username.toLowerCase() === username.toLowerCase() ||
             item.email.toLowerCase() === username.toLowerCase()) &&
            item.password === password
    );

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid username/email or password."
        });
    }

    const safeUser = { ...user };
    delete safeUser.password;

    res.json({
        success: true,
        message: "Login successful!",
        user: safeUser
    });
});

app.listen(PORT, () => {
    console.log(`Student Management System running at http://localhost:${PORT}`);
});
