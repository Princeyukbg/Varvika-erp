/* ======================================
   VARVIKA CREATION ERP - APP.JS
======================================*/

// ===============================
// SHOW SECTION
// ===============================
function showSection(id) {

    document.querySelectorAll(".section").forEach(section => {
        section.style.display = "none";
    });

    const page = document.getElementById(id);

    if (page) {
        page.style.display = "block";
    }

}

// ===============================
// SIDEBAR TOGGLE
// ===============================
function toggleMenu() {

    const sidebar = document.querySelector(".sidebar");

    if (!sidebar) return;

    if (window.innerWidth <= 768) {

        if (
            sidebar.style.display === "" ||
            sidebar.style.display === "none"
        ) {

            sidebar.style.display = "block";

        } else {

            sidebar.style.display = "none";

        }

    }

}

// ===============================
// DARK MODE
// ===============================
function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode")
    );

}

// ===============================
// LOAD THEME
// ===============================
function loadTheme() {

    if (localStorage.getItem("darkMode") === "true") {

        document.body.classList.add("dark-mode");

    }

}

// ===============================
// REFRESH DASHBOARD
// ===============================
function refreshDashboard() {

    const workers =
        JSON.parse(localStorage.getItem("workers")) || [];

    const customers =
        JSON.parse(localStorage.getItem("customers")) || [];

    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    const productions =
        JSON.parse(localStorage.getItem("productions")) || [];

    const inventory =
        JSON.parse(localStorage.getItem("inventory")) || [];

    if (document.getElementById("workersCount"))
        document.getElementById("workersCount").textContent = workers.length;

    if (document.getElementById("customersCount"))
        document.getElementById("customersCount").textContent = customers.length;

    if (document.getElementById("ordersCount"))
        document.getElementById("ordersCount").textContent = orders.length;

    if (document.getElementById("productionCount"))
        document.getElementById("productionCount").textContent = productions.length;

    if (document.getElementById("inventoryCount"))
        document.getElementById("inventoryCount").textContent = inventory.length;

    if (document.getElementById("reportWorkers"))
        document.getElementById("reportWorkers").textContent = workers.length;

    if (document.getElementById("reportCustomers"))
        document.getElementById("reportCustomers").textContent = customers.length;

    if (document.getElementById("reportOrders"))
        document.getElementById("reportOrders").textContent = orders.length;

    if (document.getElementById("reportProduction"))
        document.getElementById("reportProduction").textContent = productions.length;

    if (document.getElementById("reportInventory"))
        document.getElementById("reportInventory").textContent = inventory.length;

}

// ===============================
// LOAD APPLICATION
// ===============================
document.addEventListener("DOMContentLoaded", function () {

    loadTheme();

    if (typeof showWorkers === "function") {
        showWorkers();
    }

    if (typeof showAttendance === "function") {
        showAttendance();
    }

    if (typeof showCustomers === "function") {
        showCustomers();
    }

    if (typeof showOrders === "function") {
        showOrders();
    }

    if (typeof showProduction === "function") {
        showProductions();
    }

    if (typeof showInventory === "function") {
        showInventory();
    }

    if (typeof showInvoice === "function") {
        showInvoice();
    }

    if (typeof loadAttendanceWorkers === "function") {
        loadAttendanceWorkers();
    }

    if (typeof loadSalaryWorkers === "function") {
        loadSalaryWorkers();
    }

    if (typeof loadCustomerDropdown === "function") {
        loadCustomerDropdown();
    }

    refreshDashboard();

});

// ===============================
// AUTO REFRESH
// ===============================
setInterval(function () {

    if (sessionStorage.getItem("loginType")) {

        refreshDashboard();

    }

}, 5000);

// ===============================
// GLOBAL FUNCTIONS
// ===============================
window.showSection = showSection;
window.toggleMenu = toggleMenu;
window.toggleDarkMode = toggleDarkMode;
window.refreshDashboard = refreshDashboard;