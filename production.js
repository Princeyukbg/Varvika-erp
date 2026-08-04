// ==========================
// PRODUCTION STORAGE
// ==========================

let productions =
JSON.parse(localStorage.getItem("productions")) || [];

function saveProductions() {
    localStorage.setItem(
        "productions",
        JSON.stringify(productions)
    );
}

// ==========================
// ADD PRODUCTION
// ==========================

function addProduction() {

    let orderNo =
    document.getElementById("productionOrder").value;

    let worker =
    document.getElementById("productionWorker").value;

    let machine =
    document.getElementById("machineNo").value;

    let design =
    document.getElementById("productionDesign").value;

    let qty =
    Number(document.getElementById("productionQty").value);

    let date =
    document.getElementById("productionDate").value;

    if (!orderNo || !worker || qty <= 0) {
        alert("Please fill all required fields");
        return;
    }

    productions.push({
        id: Date.now(),
        orderNo,
        worker,
        machine,
        design,
        qty,
        date,
        status: "Running"
    });

    saveProductions();

    showProductions();

    clearProductionForm();

    alert("Production Saved");

}

// ==========================
// SHOW PRODUCTION
// ==========================

function showProductions() {

    let list =
    document.getElementById("productionList");

    if (!list) return;

    list.innerHTML = "";

    productions.forEach((p,index)=>{

        list.innerHTML += `

        <div class="card">

        <h3>${p.orderNo}</h3>

        <p><b>Worker :</b> ${p.worker}</p>

        <p><b>Machine :</b> ${p.machine}</p>

        <p><b>Design :</b> ${p.design}</p>

        <p><b>Qty :</b> ${p.qty}</p>

        <p><b>Date :</b> ${p.date}</p>

        <p><b>Status :</b> ${p.status}</p>

        <button onclick="completeProduction(${index})">
        Complete
        </button>

        <button onclick="deleteProduction(${index})">
        Delete
        </button>

        </div>

        `;

    });

    let total =
    document.getElementById("productionCount");

    if(total){

        total.innerHTML =
        productions.length;

    }

}

// ==========================
// COMPLETE
// ==========================

function completeProduction(index){

    productions[index].status =
    "Completed";

    saveProductions();

    showProductions();

}

// ==========================
// DELETE
// ==========================

function deleteProduction(index){

    if(confirm("Delete Production?")){

        productions.splice(index,1);

        saveProductions();

        showProductions();

    }

}

// ==========================
// CLEAR FORM
// ==========================

function clearProductionForm(){

    document.getElementById("productionQty").value="";

    document.getElementById("productionDesign").value="";

}

// ==========================
// LOAD
// ==========================

window.addEventListener("load",()=>{

    showProductions();

});
// ==========================
// EDIT PRODUCTION
// ==========================

function editProduction(index){

    let p = productions[index];

    document.getElementById("productionOrder").value = p.orderNo;
    document.getElementById("productionWorker").value = p.worker;
    document.getElementById("machineNo").value = p.machine;
    document.getElementById("productionDesign").value = p.design;
    document.getElementById("productionQty").value = p.qty;
    document.getElementById("productionDate").value = p.date;

    productions.splice(index,1);

    saveProductions();

    showProductions();

}

// ==========================
// SEARCH PRODUCTION
// ==========================

function searchProduction(){

    let text = document
        .getElementById("searchProduction")
        .value
        .toLowerCase();

    document
        .querySelectorAll("#productionList .card")
        .forEach(card=>{

            card.style.display =
                card.innerText.toLowerCase().includes(text)
                ? "block"
                : "none";

        });

}

// ==========================
// MACHINE REPORT
// ==========================

function machineReport(){

    let report = {};

    productions.forEach(p=>{

        if(!report[p.machine]){
            report[p.machine]=0;
        }

        report[p.machine]+=p.qty;

    });

    let html="<h3>Machine Report</h3>";

    for(let machine in report){

        html += `
        <p>
        <b>${machine}</b> :
        ${report[machine]} pcs
        </p>
        `;

    }

    document.getElementById("machineReport").innerHTML=html;

}

// ==========================
// WORKER REPORT
// ==========================

function workerProductionReport(){

    let report={};

    productions.forEach(p=>{

        if(!report[p.worker]){
            report[p.worker]=0;
        }

        report[p.worker]+=p.qty;

    });

    let html="<h3>Worker Report</h3>";

    for(let worker in report){

        html+=`
        <p>
        <b>${worker}</b> :
        ${report[worker]} pcs
        </p>
        `;

    }

    document.getElementById("workerProductionReport").innerHTML=html;

}

// ==========================
// DAILY REPORT
// ==========================

function dailyProductionReport(){

    let report={};

    productions.forEach(p=>{

        if(!report[p.date]){
            report[p.date]=0;
        }

        report[p.date]+=p.qty;

    });

    let html="<h3>Daily Production</h3>";

    for(let day in report){

        html+=`
        <p>
        ${day} : ${report[day]} pcs
        </p>
        `;

    }

    document.getElementById("dailyProductionReport").innerHTML=html;

}

// ==========================
// EXPORT CSV
// ==========================

function exportProductionCSV(){

    let csv =
"Order,Worker,Machine,Design,Qty,Date,Status\n";

    productions.forEach(p=>{

        csv +=
`${p.orderNo},${p.worker},${p.machine},${p.design},${p.qty},${p.date},${p.status}\n`;

    });

    let blob =
    new Blob([csv],{type:"text/csv"});

    let link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "production.csv";

    link.click();

}

// ==========================
// PRINT
// ==========================

function printProduction(){

    window.print();

}