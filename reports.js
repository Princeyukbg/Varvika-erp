// ==========================
// REPORTS
// ==========================

function loadDashboardReport() {

    let workers =
        JSON.parse(localStorage.getItem("workers")) || [];

    let customers =
        JSON.parse(localStorage.getItem("customers")) || [];

    let orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    let productions =
        JSON.parse(localStorage.getItem("productions")) || [];

    let inventory =
        JSON.parse(localStorage.getItem("inventory")) || [];

    let attendance =
        JSON.parse(localStorage.getItem("attendance")) || [];

    // Dashboard Count
    document.getElementById("reportWorkers").innerHTML =
        workers.length;

    document.getElementById("reportCustomers").innerHTML =
        customers.length;

    document.getElementById("reportOrders").innerHTML =
        orders.length;

    document.getElementById("reportProduction").innerHTML =
        productions.length;

    document.getElementById("reportInventory").innerHTML =
        inventory.length;

    document.getElementById("reportAttendance").innerHTML =
        attendance.length;

}

// ==========================
// SALES REPORT
// ==========================

function salesReport(){

    let orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    let total = 0;

    orders.forEach(o=>{

        total += Number(o.total);

    });

    document.getElementById("salesReport").innerHTML =

    "<h3>Total Sales : ₹"+total+"</h3>";

}

// ==========================
// PRODUCTION REPORT
// ==========================

function productionSummary(){

    let productions =
        JSON.parse(localStorage.getItem("productions")) || [];

    let qty = 0;

    productions.forEach(p=>{

        qty += Number(p.qty);

    });

    document.getElementById("productionSummary").innerHTML =

    "<h3>Total Production : "+qty+" pcs</h3>";

}

// ==========================
// INVENTORY REPORT
// ==========================

function inventorySummary(){

    let inventory =
        JSON.parse(localStorage.getItem("inventory")) || [];

    let qty = 0;

    inventory.forEach(i=>{

        qty += Number(i.qty);

    });

    document.getElementById("inventorySummary").innerHTML =

    "<h3>Total Stock : "+qty+"</h3>";

}

// ==========================
// PRINT
// ==========================

function printReport(){

    window.print();

}

// ==========================
// LOAD
// ==========================

window.addEventListener("load",()=>{

    loadDashboardReport();

    salesReport();

    productionSummary();

    inventorySummary();

});// ==========================
// MONTHLY SALES REPORT
// ==========================

function monthlySalesReport() {

    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];

    let report = {};

    orders.forEach(order => {

        let month =
        order.date.substring(3,10);

        if (!report[month]) {
            report[month] = 0;
        }

        report[month] += Number(order.total);

    });

    let html = "<h3>Monthly Sales Report</h3>";

    for (let month in report) {

        html += `
        <p>
        <b>${month}</b> :
        ₹${report[month]}
        </p>`;

    }

    document.getElementById("monthlySalesReport").innerHTML = html;

}

// ==========================
// CUSTOMER REPORT
// ==========================

function customerReport(){

    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];

    let report = {};

    orders.forEach(order=>{

        if(!report[order.customer]){
            report[order.customer]=0;
        }

        report[order.customer]+=Number(order.total);

    });

    let html="<h3>Customer Sales</h3>";

    for(let customer in report){

        html += `
        <p>
        <b>${customer}</b> :
        ₹${report[customer]}
        </p>`;

    }

    document.getElementById("customerReport").innerHTML = html;

}

// ==========================
// WORKER REPORT
// ==========================

function workerReport(){

    let attendance =
    JSON.parse(localStorage.getItem("attendance")) || [];

    let report = {};

    attendance.forEach(a=>{

        if(a.status==="Present"){

            if(!report[a.worker]){
                report[a.worker]=0;
            }

            report[a.worker]++;

        }

    });

    let html="<h3>Worker Attendance</h3>";

    for(let worker in report){

        html += `
        <p>
        <b>${worker}</b> :
        ${report[worker]} Days
        </p>`;

    }

    document.getElementById("workerReport").innerHTML = html;

}

// ==========================
// EXPORT REPORT CSV
// ==========================

function exportReportCSV(){

    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];

    let csv =
"Order No,Customer,Total,Status\n";

    orders.forEach(o=>{

        csv +=
`${o.orderNo},${o.customer},${o.total},${o.status}\n`;

    });

    let blob =
    new Blob([csv],{
        type:"text/csv"
    });

    let link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "reports.csv";

    link.click();

}

// ==========================
// REFRESH DASHBOARD
// ==========================

function refreshReports(){

    loadDashboardReport();

    salesReport();

    productionSummary();

    inventorySummary();

    monthlySalesReport();

    customerReport();

    workerReport();

}

// ==========================
// AUTO LOAD
// ==========================

window.addEventListener("load",()=>{

    refreshReports();

});