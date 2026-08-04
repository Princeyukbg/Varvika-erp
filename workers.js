/* =====================================
   VARVIKA CREATION ERP - WORKERS.JS
=====================================*/

// ==========================
// STORAGE
// ==========================

let workers = JSON.parse(localStorage.getItem("workers")) || [];

// ==========================
// SAVE
// ==========================

function saveWorkers() {
    localStorage.setItem("workers", JSON.stringify(workers));
}

// ==========================
// ADD WORKER
// ==========================

function addWorker() {

    const id = document.getElementById("workerId").value.trim();
    const name = document.getElementById("workerName").value.trim();
    const password = document.getElementById("workerPassword").value.trim();
    const salary = Number(document.getElementById("workerSalary").value);
    const type = document.getElementById("salaryType").value;

    if (!id || !name || !password) {
        alert("Please fill all fields");
        return;
    }

    const exists = workers.find(w => w.id === id);

    if (exists) {
        alert("Worker ID already exists");
        return;
    }

    workers.push({
        id: id,
        name: name,
        password: password,
        salary: salary,
        type: type
    });

    saveWorkers();

    clearWorkerForm();

    showWorkers();

    if (typeof refreshDashboard === "function") {
        refreshDashboard();
    }

    if (typeof loadAttendanceWorkers === "function") {
        loadAttendanceWorkers();
    }

    if (typeof loadSalaryWorkers === "function") {
        loadSalaryWorkers();
    }

    alert("Worker Added Successfully");

}

// ==========================
// SHOW WORKERS
// ==========================

function showWorkers() {

    const list = document.getElementById("workerList");

    if (!list) return;

    list.innerHTML = "";

    if (workers.length === 0) {

        list.innerHTML = `
        <div class="card">
            <h3>No Workers Found</h3>
        </div>
        `;

        return;
    }

    workers.forEach((worker, index) => {

        list.innerHTML += `
        <div class="card">

            <h3>${worker.name}</h3>

            <p><b>ID :</b> ${worker.id}</p>

            <p><b>Salary :</b> ₹${worker.salary}</p>

            <p><b>Type :</b> ${worker.type}</p>

            <button onclick="editWorker(${index})">
                Edit
            </button>

            <button onclick="deleteWorker(${index})">
                Delete
            </button>

        </div>
        `;

    });

}
// ==========================
// DELETE WORKER
// ==========================
function deleteWorker(index) {

    if (!confirm("Delete this worker?")) return;

    workers.splice(index, 1);

    saveWorkers();

    showWorkers();

    if (typeof refreshDashboard === "function") {
        refreshDashboard();
    }

    if (typeof loadAttendanceWorkers === "function") {
        loadAttendanceWorkers();
    }

    if (typeof loadSalaryWorkers === "function") {
        loadSalaryWorkers();
    }

    alert("Worker Deleted Successfully");

}

// ==========================
// EDIT WORKER
// ==========================
function editWorker(index) {

    const worker = workers[index];

    document.getElementById("workerId").value = worker.id;
    document.getElementById("workerName").value = worker.name;
    document.getElementById("workerPassword").value = worker.password;
    document.getElementById("workerSalary").value = worker.salary;
    document.getElementById("salaryType").value = worker.type;

    workers.splice(index, 1);

    saveWorkers();

    showWorkers();

}

// ==========================
// SEARCH WORKER
// ==========================
function searchWorker() {

    const value = document
        .getElementById("searchWorker")
        .value
        .toLowerCase();

    document.querySelectorAll("#workerList .card")
        .forEach(card => {

            card.style.display = card.innerText
                .toLowerCase()
                .includes(value)
                ? "block"
                : "none";

        });

}

// ==========================
// CLEAR FORM
// ==========================
function clearWorkerForm() {

    document.getElementById("workerId").value = "";
    document.getElementById("workerName").value = "";
    document.getElementById("workerPassword").value = "";
    document.getElementById("workerSalary").value = "";
    document.getElementById("salaryType").selectedIndex = 0;

}

// ==========================
// LOAD
// ==========================
document.addEventListener("DOMContentLoaded", () => {

    showWorkers();

    if (typeof refreshDashboard === "function") {
        refreshDashboard();
    }

});

// ==========================
// GLOBAL FUNCTIONS
// ==========================
window.addWorker = addWorker;
window.showWorkers = showWorkers;
window.editWorker = editWorker;
window.deleteWorker = deleteWorker;
window.searchWorker = searchWorker;
