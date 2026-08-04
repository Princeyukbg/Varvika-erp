// ===============================
// VARVIKA CREATION ERP LOGIN
// ===============================

function login() {

    const type = document.getElementById("loginType").value;
    const user = document.getElementById("loginUser").value.trim();
    const pass = document.getElementById("loginPassword").value.trim();

    if (user === "" || pass === "") {
        alert("Please enter Username and Password");
        return;
    }

    // ===============================
    // OWNER LOGIN
    // ===============================

    if (type === "owner") {

        if (user === "admin" && pass === "1234") {

            sessionStorage.setItem("loginType", "owner");

            document.getElementById("loginPage").style.display = "none";
            document.getElementById("erpPage").style.display = "block";

            if (typeof showSection === "function") {
                showSection("dashboardSection");
            }

            if (typeof refreshDashboard === "function") {
                refreshDashboard();
            }

            if (typeof showWorkers === "function") {
                showWorkers();
            }

          

            return;

        } else {

            alert("Invalid Owner Username or Password");
            return;

        }

    }

    // ===============================
    // WORKER LOGIN
    // ===============================

    let workers = JSON.parse(localStorage.getItem("workers")) || [];

    let worker = workers.find(w =>
        w.id === user &&
        w.password === pass
    );

    if (!worker) {
        alert("Invalid Worker ID or Password");
        return;
    }

    sessionStorage.setItem("loginType", "worker");
    sessionStorage.setItem("workerId", worker.id);

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("erpPage").style.display = "block";

    if (typeof showSection === "function") {
        showSection("dashboardSection");
    }

    if (typeof refreshDashboard === "function") {
        refreshDashboard();
    }

    if (typeof showWorkers === "function") {
        showWorkers();
    }

    alert("Welcome " + worker.name);

}

// ===============================
// LOGOUT
// ===============================

function logout() {

    sessionStorage.clear();

    document.getElementById("erpPage").style.display = "none";
    document.getElementById("loginPage").style.display = "flex";

    document.getElementById("loginUser").value = "";
    document.getElementById("loginPassword").value = "";

}

// ===============================
// GLOBAL FUNCTIONS
// ===============================

window.login = login;
window.logout = logout;
document.getElementById("erpPage").style.display = "flex";