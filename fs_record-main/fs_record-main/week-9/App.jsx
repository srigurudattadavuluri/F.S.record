import { useState } from "react";

function App() {
  const [page, setPage] = useState("home");
  const [student, setStudent] = useState(null);

  const [form, setForm] = useState({
    name: "",
    age: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    course: "",
    address: ""
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (form.mobile.length !== 10 || !/^[0-9]+$/.test(form.mobile)) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (form.password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    setStudent(form);
    setMessage("Registration successful!");

    setTimeout(() => {
      setPage("dashboard");
      setMessage("");
    }, 800);
  }

  function logout() {
    setStudent(null);
    setForm({
      name: "",
      age: "",
      dob: "",
      gender: "",
      email: "",
      mobile: "",
      username: "",
      password: "",
      course: "",
      address: ""
    });
    setPage("home");
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">🎓 StudentMS</div>

        <nav>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("register")}>Register</button>
          {student && (
            <button onClick={() => setPage("dashboard")}>Dashboard</button>
          )}
          {student && (
            <button className="logout-nav" onClick={logout}>Logout</button>
          )}
        </nav>
      </header>

      {page === "home" && (
        <Home setPage={setPage} />
      )}

      {page === "register" && (
        <Register
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          message={message}
          setPage={setPage}
        />
      )}

      {page === "dashboard" && student && (
        <Dashboard student={student} logout={logout} />
      )}

      <footer>
        <p>© 2026 Student Management System | React JSX Project</p>
      </footer>
    </div>
  );
}

function Home({ setPage }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="tagline">REACT • JSX • MODERN UI</p>
          <h1>Student Management System</h1>
          <p>
            A modern React-based student management interface where students
            can register and view their personal academic information.
          </p>

          <div className="buttons">
            <button className="primary" onClick={() => setPage("register")}>
              Register Now
            </button>
            <button className="secondary" onClick={() => setPage("register")}>
              Get Started
            </button>
          </div>
        </div>

        <div className="hero-card">
          <div className="big-icon">🎓</div>
          <h2>Student Portal</h2>
          <p>Simple, clean and responsive React interface.</p>
        </div>
      </section>

      <section className="features">
        <h2>Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <span>📝</span>
            <h3>Registration</h3>
            <p>Complete student registration form with validation.</p>
          </div>

          <div className="feature-card">
            <span>⚛️</span>
            <h3>React UI</h3>
            <p>Built using React components and JSX.</p>
          </div>

          <div className="feature-card">
            <span>📊</span>
            <h3>Dashboard</h3>
            <p>View registered student details in a clean dashboard.</p>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>About This Project</h2>
        <p>
          This project demonstrates how React and JSX can be used to develop
          a real-world user interface. It contains reusable components,
          state management, event handling and form validation.
        </p>
      </section>
    </main>
  );
}

function Register({
  form,
  handleChange,
  handleSubmit,
  message,
  setPage
}) {
  return (
    <main className="form-page">
      <div className="form-container">
        <h1>Student Registration</h1>
        <p className="subtitle">
          Create your student profile by entering the details below.
        </p>

        {message && <div className="message">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            <div className="field">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="field">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                min="1"
                max="100"
                placeholder="Enter age"
                required
              />
            </div>

            <div className="field">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                required
              />
            </div>

            <div className="field">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                required
              />
            </div>

            <div className="field">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Choose username"
                required
              />
            </div>

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                required
              />
            </div>

            <div className="field">
              <label>Course</label>
              <select
                name="course"
                value={form.course}
                onChange={handleChange}
                required
              >
                <option value="">Select course</option>
                <option>B.Tech - CSE</option>
                <option>B.Tech - ECE</option>
                <option>B.Tech - EEE</option>
                <option>B.Tech - IT</option>
                <option>B.Tech - Mechanical</option>
                <option>B.Tech - Civil</option>
              </select>
            </div>

            <div className="field full">
              <label>Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your address"
                rows="4"
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            Create Student Profile
          </button>
        </form>

        <button className="back-button" onClick={() => setPage("home")}>
          ← Back to Home
        </button>
      </div>
    </main>
  );
}

function Dashboard({ student, logout }) {
  return (
    <main className="dashboard">
      <section className="dashboard-header">
        <div>
          <p className="tagline">STUDENT DASHBOARD</p>
          <h1>Welcome, {student.name}! 👋</h1>
          <p>Your registered student information is displayed below.</p>
        </div>

        <div className="dashboard-icon">🎓</div>
      </section>

      <section className="profile">
        <h2>Student Profile</h2>

        <div className="profile-grid">
          <Info title="Full Name" value={student.name} />
          <Info title="Age" value={student.age} />
          <Info title="Date of Birth" value={student.dob} />
          <Info title="Gender" value={student.gender} />
          <Info title="Email" value={student.email} />
          <Info title="Mobile" value={student.mobile} />
          <Info title="Username" value={student.username} />
          <Info title="Course" value={student.course} />
          <Info title="Address" value={student.address} full />
        </div>

        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </section>
    </main>
  );
}

function Info({ title, value, full }) {
  return (
    <div className={`info ${full ? "full" : ""}`}>
      <small>{title}</small>
      <strong>{value}</strong>
    </div>
  );
}

export default App;
