# MERN Mini Project - Student Registration CRUD Application

## Aim
Student Registration CRUD application using MongoDB, Express.js, React.js and Node.js.

## Technologies
- React.js
- Node.js
- Express.js
- MongoDB
- Mongoose
- Fetch API

## Project Structure

```text
MERN_Student_Registration_CRUD/
├── README.md
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env.example
│   └── models/
│       └── Student.js
└── frontend/
    ├── package.json
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        └── App.css
```

## MongoDB

The application uses:

- Database: `studentdb`
- Collection: `students`

By default, the backend connects to:

```text
mongodb://127.0.0.1:27017/studentdb
```

Make sure MongoDB is running before starting the backend.

## Run Backend

Open a terminal:

```bash
cd backend
npm install
npm start
```

Backend runs at:

```text
http://localhost:5000
```

## Run Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend normally runs at:

```text
http://localhost:5173
```

## REST APIs

| Method | URL | Purpose |
|---|---|---|
| GET | `/students` | Retrieve all students |
| POST | `/students` | Register student |
| PUT | `/students/:id` | Update student |
| DELETE | `/students/:id` | Delete student |

## CRUD Workflow

Create:
Form → POST → Express → Mongoose → MongoDB

Read:
GET → Express → MongoDB → React table

Update:
Edit → form populated → PUT → MongoDB → refresh table

Delete:
Delete → DELETE → MongoDB → refresh table

## Note

The password field is included because it is required by the lab task. In a real application, passwords should be hashed using a password-hashing library such as bcrypt and should never be stored as plain text.
