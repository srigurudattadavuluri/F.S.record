# Mini Web Application - Student Management System

A beginner-friendly mini web application developed using:

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- JSON as a simple database

## Features

1. Landing/Home page
2. Student registration
3. Registration data stored permanently in `users.json`
4. Login using username or email and password
5. Login validation through Express.js
6. Student dashboard
7. Logout
8. Client-side validation and user-friendly messages

## Project Structure

```text
MiniWebApplication/
├── app.js
├── users.json
├── package.json
├── README.md
└── public/
    ├── index.html
    ├── register.html
    ├── login.html
    ├── dashboard.html
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

## How to Run

### 1. Install Node.js

Make sure Node.js is installed.

Check:

```bash
node --version
npm --version
```

### 2. Open the project folder

Open a terminal inside the `MiniWebApplication` folder.

### 3. Install Express

```bash
npm install
```

### 4. Start the server

```bash
npm start
```

### 5. Open in browser

Visit:

```text
http://localhost:3000
```

## Application Flow

```text
Home
  |
  +---- Register ----> POST /register ----> users.json
  |
  +---- Login -------> POST /login -------> Validate users.json
                                             |
                                      +------+------+
                                      |             |
                                    Valid         Invalid
                                      |             |
                                  Dashboard       Error
                                      |
                                    Logout
                                      |
                                    Login
```

## Important Note

This project stores passwords as plain text because the assignment specifically asks for a simple JSON file database. In a real production application, passwords should never be stored this way; password hashing and proper authentication/session management should be used.
