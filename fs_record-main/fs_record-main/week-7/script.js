// ==========================================
// ADD STUDENT
// ==========================================

document
    .getElementById("studentForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const student = {

            name: document.getElementById("name").value,

            age: document.getElementById("age").value,

            course: document.getElementById("course").value,

            email: document.getElementById("email").value

        };


        const response = await fetch("/students", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(student)

        });


        const data = await response.json();


        alert(data.message);


        if (response.ok) {

            document
                .getElementById("studentForm")
                .reset();

            getStudents();

        }

    });



// ==========================================
// GET ALL STUDENTS
// ==========================================

async function getStudents() {

    const response =
        await fetch("/students");

    const students =
        await response.json();


    const studentList =
        document.getElementById("studentList");


    studentList.innerHTML = "";


    students.forEach(function(student) {

        const div =
            document.createElement("div");

        div.className = "student";


        div.innerHTML = `

            <h3>${student.name}</h3>

            <p>
                <strong>ID:</strong>
                ${student.id}
            </p>

            <p>
                <strong>Age:</strong>
                ${student.age}
            </p>

            <p>
                <strong>Course:</strong>
                ${student.course}
            </p>

            <p>
                <strong>Email:</strong>
                ${student.email}
            </p>

            <button onclick="deleteStudent(${student.id})">
                Delete
            </button>

        `;


        studentList.appendChild(div);

    });

}



// ==========================================
// SEARCH STUDENTS
// ==========================================

async function searchStudents() {

    const course =
        document
            .getElementById("searchCourse")
            .value;


    if (course.trim() === "") {

        alert("Please enter a course");

        return;

    }


    const response =
        await fetch(
            `/search?course=${encodeURIComponent(course)}`
        );


    const students =
        await response.json();


    const result =
        document.getElementById("searchResult");


    result.innerHTML = "";


    if (students.length === 0) {

        result.innerHTML =
            "<p>No students found.</p>";

        return;

    }


    students.forEach(function(student) {

        const div =
            document.createElement("div");

        div.className = "student";


        div.innerHTML = `

            <h3>${student.name}</h3>

            <p>
                Course: ${student.course}
            </p>

            <p>
                Email: ${student.email}
            </p>

        `;


        result.appendChild(div);

    });

}



// ==========================================
// DELETE STUDENT
// ==========================================

async function deleteStudent(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this student?");


    if (!confirmDelete) {

        return;

    }


    const response =
        await fetch(`/students/${id}`, {

            method: "DELETE"

        });


    const data =
        await response.json();


    alert(data.message);


    getStudents();

}



// ==========================================
// SYSTEM INFORMATION
// ==========================================

async function getSystemInfo() {

    const response =
        await fetch("/system");


    const data =
        await response.json();


    document
        .getElementById("systemResult")
        .textContent =
        JSON.stringify(data, null, 2);

}



// ==========================================
// DNS INFORMATION
// ==========================================

async function getDNSInfo() {

    const response =
        await fetch("/dns");


    const data =
        await response.json();


    document
        .getElementById("dnsResult")
        .textContent =
        JSON.stringify(data, null, 2);

}
