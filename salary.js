/* =====================================
   VARVIKA CREATION ERP - SALARY.JS
=====================================*/

// ==========================
// CALCULATE SALARY
// ==========================

function calculateSalary() {

    const workers =
        JSON.parse(localStorage.getItem("workers")) || [];

    const attendance =
        JSON.parse(localStorage.getItem("attendance")) || [];

    const workerName =
        document.getElementById("salaryWorker")?.value;

    const pieces =
        Number(document.getElementById("piecesMade")?.value || 0);

    const overtimeRate =
        Number(document.getElementById("overtimeRate")?.value || 0);

    if (!workerName) {
        alert("Please Select Worker");
        return;
    }

    const worker =
        workers.find(w => w.name === workerName);

    if (!worker) {
        alert("Worker Not Found");
        return;
    }

    const records =
        attendance.filter(a => a.worker === workerName);

    const present =
        records.filter(r => r.status === "Present").length;

    const totalHours =
        records.reduce((t, r) => t + Number(r.hours || 0), 0);

    const overtimeHours =
        records.reduce((t, r) => t + Number(r.overtime || 0), 0);

    let salary = 0;

    // Salary Type
    if (worker.type === "Daily") {

        salary = present * Number(worker.salary);

    } else if (worker.type === "Monthly") {

        salary = Number(worker.salary);

    } else if (worker.type === "Piece") {

        salary = pieces * Number(worker.salary);

    }

    const overtime =
        overtimeHours * overtimeRate;

    const total =
        salary + overtime;

    // Result
    const result =
        document.getElementById("salaryResult");

    if (result) {

        result.innerHTML = `
        <div class="card">
            <h2>Total Salary : ₹${total}</h2>
            <p>Present Days : ${present}</p>
            <p>Total Hours : ${totalHours}</p>
            <p>Overtime : ${overtimeHours}</p>
            <p>Basic Salary : ₹${salary}</p>
            <p>Overtime Amount : ₹${overtime}</p>
        </div>
        `;

    }

    const hours =
        document.getElementById("salaryHours");

    if (hours) {
        hours.textContent = totalHours;
    }

    const ot =
        document.getElementById("salaryOvertime");

    if (ot) {
        ot.textContent = overtimeHours;
    }

}
// ==========================
// MONTHLY SALARY REPORT
// ==========================

function calculateMonthlySalary() {

    calculateSalary();

    const report =
        document.getElementById("monthlySalaryReport");

    const result =
        document.getElementById("salaryResult");

    if (report && result) {

        report.innerHTML = result.innerHTML;

    }

}

// ==========================
// FINAL SALARY
// ==========================

function calculateFinalSalary() {

    calculateSalary();

    alert("Final Salary Generated Successfully");

}

// ==========================
// SALARY SLIP
// ==========================

function generateSalarySlip() {

    window.print();

}

// ==========================
// PRINT REPORT
// ==========================

function printSalaryReport() {

    window.print();

}

// ==========================
// SAVE ADJUSTMENT
// ==========================

function saveAdjustment() {

    const advance =
        Number(document.getElementById("advanceAmount")?.value || 0);

    const bonus =
        Number(document.getElementById("bonusAmount")?.value || 0);

    const fine =
        Number(document.getElementById("fineAmount")?.value || 0);

    const advanceBox =
        document.getElementById("salaryAdvance");

    const bonusBox =
        document.getElementById("salaryBonus");

    const fineBox =
        document.getElementById("salaryFine");

    if (advanceBox) advanceBox.textContent = "₹" + advance;
    if (bonusBox) bonusBox.textContent = "₹" + bonus;
    if (fineBox) fineBox.textContent = "₹" + fine;

    alert("Adjustment Saved");

}

// ==========================
// LOAD WORKERS
// ==========================

function loadSalaryWorkers() {

    const workers =
        JSON.parse(localStorage.getItem("workers")) || [];

    const select =
        document.getElementById("salaryWorker");

    const select2 =
        document.getElementById("salaryWorkerAdvance");

    if (select) {

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

    if (select2) {

        select2.innerHTML =
            '<option value="">Select Worker</option>';

        workers.forEach(worker => {

            select2.innerHTML += `
            <option value="${worker.name}">
                ${worker.name}
            </option>
            `;

        });

    }

}

// ==========================
// LOAD
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    loadSalaryWorkers();

});

// ==========================
// GLOBAL FUNCTIONS
// ==========================

window.calculateSalary = calculateSalary;
window.calculateMonthlySalary = calculateMonthlySalary;
window.calculateFinalSalary = calculateFinalSalary;
window.generateSalarySlip = generateSalarySlip;
window.printSalaryReport = printSalaryReport;
window.saveAdjustment = saveAdjustment;
window.loadSalaryWorkers = loadSalaryWorkers;
