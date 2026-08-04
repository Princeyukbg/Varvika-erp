/* =====================================
   VARVIKA CREATION ERP - ATTENDANCE.JS
=====================================*/

// ==========================
// STORAGE
// ==========================

let attendance =
JSON.parse(localStorage.getItem("attendance")) || [];

// ==========================
// SAVE
// ==========================

function saveAttendance() {

    localStorage.setItem(
        "attendance",
        JSON.stringify(attendance)
    );

}

// ==========================
// MARK ATTENDANCE
// ==========================

function markAttendance() {

    const worker =
    document.getElementById("attendanceWorker").value;

    const date =
    document.getElementById("attendanceDate").value;

    const status =
    document.getElementById("attendanceStatus").value;

    const hoursInput =
    document.getElementById("workingHours");

    const overtimeInput =
    document.getElementById("overtimeHours");

    const hours =
    hoursInput ? Number(hoursInput.value) : 0;

    const overtime =
    overtimeInput ? Number(overtimeInput.value) : 0;

    if (!worker || !date) {

        alert("Please select Worker and Date");
        return;

    }

    attendance.push({

        worker,
        date,
        status,
        hours,
        overtime

    });

    saveAttendance();

    showAttendance();

    if (typeof refreshDashboard === "function") {
        refreshDashboard();
    }

    alert("Attendance Saved Successfully");

}

// ==========================
// LOAD WORKERS
// ==========================

function loadAttendanceWorkers() {

    const workers =
    JSON.parse(localStorage.getItem("workers")) || [];

    const select =
    document.getElementById("attendanceWorker");

    if (!select) return;

    select.innerHTML =
    '<option value="">Select Worker</option>';

    workers.forEach(worker => {

        select.innerHTML += `
        <option value="${worker.name}">
            ${worker.name}
        </option>
        `;

    });

}
// ==========================
// SHOW ATTENDANCE
// ==========================

function showAttendance() {

    const list = document.getElementById("attendanceList");

    if (!list) return;

    list.innerHTML = "";

    if (attendance.length === 0) {

        list.innerHTML = `
        <div class="card">
            <h3>No Attendance Found</h3>
        </div>
        `;

        updateAttendanceSummary();
        return;

    }

    attendance.forEach((a, index) => {

        list.innerHTML += `
        <div class="card">

            <h3>${a.worker}</h3>

            <p><b>Date :</b> ${a.date}</p>

            <p><b>Status :</b> ${a.status}</p>

            <p><b>Working Hours :</b> ${a.hours}</p>

            <p><b>Overtime :</b> ${a.overtime}</p>

            <button onclick="deleteAttendance(${index})">
                Delete
            </button>

        </div>
        `;

    });

    updateAttendanceSummary();

}

// ==========================
// DELETE ATTENDANCE
// ==========================

function deleteAttendance(index) {

    if (!confirm("Delete Attendance?")) return;

    attendance.splice(index, 1);

    saveAttendance();

    showAttendance();

    if (typeof refreshDashboard === "function") {
        refreshDashboard();
    }

}

// ==========================
// SUMMARY
// ==========================

function updateAttendanceSummary() {

    const present =
        document.getElementById("presentDays");

    const absent =
        document.getElementById("absentDays");

    const half =
        document.getElementById("halfDays");

    const hours =
        document.getElementById("totalHours");

    if (present) {
        present.textContent =
        attendance.filter(a => a.status === "Present").length;
    }

    if (absent) {
        absent.textContent =
        attendance.filter(a => a.status === "Absent").length;
    }

    if (half) {
        half.textContent =
        attendance.filter(a => a.status === "Half Day").length;
    }

    if (hours) {

        const total =
        attendance.reduce((sum, a) => sum + Number(a.hours || 0), 0);

        hours.textContent = total;

    }

}

// ==========================
// PRINT REPORT
// ==========================

function printAttendanceReport() {

    window.print();

}

// ==========================
// LOAD
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    loadAttendanceWorkers();

    showAttendance();

});

// ==========================
// GLOBAL FUNCTIONS
// ==========================

window.markAttendance = markAttendance;
window.showAttendance = showAttendance;
window.deleteAttendance = deleteAttendance;
window.loadAttendanceWorkers = loadAttendanceWorkers;
window.printAttendanceReport = printAttendanceReport;
