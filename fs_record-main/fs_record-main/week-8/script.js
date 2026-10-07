document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const logoutBtn = document.getElementById("logoutBtn");

    if (registerForm) {
        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData.entries());
            const message = document.getElementById("registerMessage");

            if (data.mobile.length !== 10 || !/^[0-9]+$/.test(data.mobile)) {
                showMessage(message, "Please enter a valid 10-digit mobile number.", "error");
                return;
            }

            try {
                const response = await fetch("/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    showMessage(message, result.message, "success");
                    registerForm.reset();

                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 1500);
                } else {
                    showMessage(message, result.message, "error");
                }
            } catch (error) {
                showMessage(message, "Unable to connect to the server.", "error");
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());
            const message = document.getElementById("loginMessage");

            try {
                const response = await fetch("/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    sessionStorage.setItem("student", JSON.stringify(result.user));
                    window.location.href = "/dashboard";
                } else {
                    showMessage(message, result.message, "error");
                }
            } catch (error) {
                showMessage(message, "Unable to connect to the server.", "error");
            }
        });
    }

    if (logoutBtn) {
        const student = getStudent();

        if (!student) {
            window.location.href = "/login";
            return;
        }

        displayStudent(student);

        logoutBtn.addEventListener("click", () => {
            sessionStorage.removeItem("student");
            window.location.href = "/login";
        });
    }
});

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `message ${type}`;
}

function getStudent() {
    try {
        return JSON.parse(sessionStorage.getItem("student"));
    } catch (error) {
        return null;
    }
}

function displayStudent(student) {
    const fields = {
        studentName: student.name,
        profileName: student.name,
        profileAge: student.age,
        profileDob: student.dob,
        profileGender: student.gender,
        profileEmail: student.email,
        profileMobile: student.mobile,
        profileUsername: student.username,
        profileCourse: student.course,
        profileAddress: student.address
    };

    Object.keys(fields).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = fields[id];
        }
    });
}
