import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/students";

const initialForm = {
  name: "",
  email: "",
  password: "",
  gender: "",
  country: "",
  languages: []
};

const languageOptions = [
  "English",
  "Telugu",
  "Hindi",
  "Tamil",
  "Kannada",
  "Malayalam"
];

function App() {
  const [form, setForm] = useState(initialForm);
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      setLoading(true);
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to retrieve students.");
      }

      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError("Cannot connect to backend. Make sure the server and MongoDB are running.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  function handleLanguageChange(e) {
    const { value, checked } = e.target;

    setForm((previous) => ({
      ...previous,
      languages: checked
        ? [...previous.languages, value]
        : previous.languages.filter((language) => language !== value)
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (form.languages.length === 0) {
      setError("Please select at least one language.");
      return;
    }

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Operation failed.");
      }

      setMessage(result.message);
      resetForm();
      fetchStudents();
    } catch (err) {
      setError(err.message);
    }
  }

  function editStudent(student) {
    setEditingId(student._id);

    setForm({
      name: student.name,
      email: student.email,
      password: student.password,
      gender: student.gender,
      country: student.country,
      languages: student.languages
    });

    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteStudent(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Delete failed.");
      }

      setMessage(result.message);
      setError("");
      fetchStudents();

      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err.message);
    }
  }

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  function handleReset() {
    resetForm();
    setMessage("");
    setError("");
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="mini-title">MERN MINI PROJECT</p>
          <h1>🎓 Student Registration</h1>
        </div>
        <div className="stack">MongoDB • Express • React • Node</div>
      </header>

      <main className="container">
        <section className="form-card">
          <div className="section-title">
            <div>
              <h2>{editingId ? "Edit Student" : "Register Student"}</h2>
              <p>
                {editingId
                  ? "Update the selected student details."
                  : "Enter student details to register a new record."}
              </p>
            </div>
          </div>

          {message && <div className="success">{message}</div>}
          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  required
                />
              </div>

              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
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
                  placeholder="Enter password"
                  required
                />
              </div>

              <div className="field">
                <label>Country</label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select country</option>
                  <option>India</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Japan</option>
                </select>
              </div>

              <div className="field">
                <label>Gender</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={form.gender === "Male"}
                      onChange={handleChange}
                    />
                    Male
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={form.gender === "Female"}
                      onChange={handleChange}
                    />
                    Female
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={form.gender === "Other"}
                      onChange={handleChange}
                    />
                    Other
                  </label>
                </div>
              </div>

              <div className="field">
                <label>Languages</label>
                <div className="checkbox-group">
                  {languageOptions.map((language) => (
                    <label key={language}>
                      <input
                        type="checkbox"
                        value={language}
                        checked={form.languages.includes(language)}
                        onChange={handleLanguageChange}
                      />
                      {language}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="button-row">
              <button className="register-btn" type="submit">
                {editingId ? "Update Student" : "Register"}
              </button>

              <button
                className="reset-btn"
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>

              {editingId && (
                <button
                  className="cancel-btn"
                  type="button"
                  onClick={handleReset}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="table-card">
          <div className="table-header">
            <div>
              <h2>Registered Students</h2>
              <p>Student records retrieved from MongoDB.</p>
            </div>
            <span className="count">{students.length} Records</span>
          </div>

          {loading ? (
            <div className="empty">Loading students...</div>
          ) : students.length === 0 ? (
            <div className="empty">
              No students registered yet.
            </div>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Country</th>
                    <th>Languages</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.gender}</td>
                      <td>{student.country}</td>
                      <td>{student.languages.join(", ")}</td>
                      <td>
                        <div className="actions">
                          <button
                            className="edit-btn"
                            onClick={() => editStudent(student)}
                          >
                            Edit
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() => deleteStudent(student._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <footer>
        <p>MERN Student Registration CRUD Application</p>
      </footer>
    </div>
  );
}

export default App;
