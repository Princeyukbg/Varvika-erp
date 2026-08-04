// ==========================
// ORDERS STORAGE
// ==========================

let orders = JSON.parse(localStorage.getItem("orders")) || [];

function saveOrders() {
    localStorage.setItem("orders", JSON.stringify(orders));
}

// ==========================
// ADD ORDER
// ==========================

function addOrder() {

    let orderNo = document.getElementById("orderNo").value.trim();
    let customer = document.getElementById("orderCustomer").value;
    let design = document.getElementById("orderDesign").value.trim();
    let qty = Number(document.getElementById("orderQty").value);
    let rate = Number(document.getElementById("orderRate").value);
    let status = document.getElementById("orderStatus").value;

    if (orderNo === "" || design === "") {
        alert("Enter Order No & Design");
        return;
    }

    let total = qty * rate;

    orders.push({
        orderNo,
        customer,
        design,
        qty,
        rate,
        total,
        status,
        date: new Date().toLocaleDateString()
    });

    saveOrders();
    showOrders();
    clearOrderForm();

    alert("Order Added Successfully");
}

// ==========================
// SHOW ORDERS
// ==========================

function showOrders() {

    let list = document.getElementById("orderList");

    if (!list) return;

    list.innerHTML = "";

    let pending = 0;
    let completed = 0;

    orders.forEach((o, index) => {

        if (o.status === "Pending") pending++;
        if (o.status === "Completed") completed++;

        list.innerHTML += `
        <div class="card">

        <h3>Order : ${o.orderNo}</h3>

        <p><b>Customer :</b> ${o.customer}</p>

        <p><b>Design :</b> ${o.design}</p>

        <p><b>Qty :</b> ${o.qty}</p>

        <p><b>Rate :</b> ₹${o.rate}</p>

        <p><b>Total :</b> ₹${o.total}</p>

        <p><b>Status :</b> ${o.status}</p>

        <button onclick="deleteOrder(${index})">
        Delete
        </button>

        </div>
        `;
    });

    document.getElementById("ordersCount").innerHTML = orders.length;
    document.getElementById("pendingOrders").innerHTML = pending;
    document.getElementById("completedOrders").innerHTML = completed;
}

// ==========================
// DELETE ORDER
// ==========================

function deleteOrder(index) {

    if (confirm("Delete Order ?")) {

        orders.splice(index, 1);

        saveOrders();

        showOrders();

    }

}

// ==========================
// CLEAR FORM
// ==========================

function clearOrderForm() {

    document.getElementById("orderNo").value = "";
    document.getElementById("orderDesign").value = "";
    document.getElementById("orderQty").value = "";
    document.getElementById("orderRate").value = "";

}

// ==========================
// LOAD
// ==========================

window.addEventListener("load", () => {

    showOrders();

});
// ==========================
// EDIT ORDER
// ==========================

function editOrder(index){

    let o = orders[index];

    document.getElementById("orderNo").value = o.orderNo;
    document.getElementById("orderCustomer").value = o.customer;
    document.getElementById("orderDesign").value = o.design;
    document.getElementById("orderQty").value = o.qty;
    document.getElementById("orderRate").value = o.rate;
    document.getElementById("orderStatus").value = o.status;

    orders.splice(index,1);

    saveOrders();

    showOrders();

}

// ==========================
// SEARCH ORDER
// ==========================

function searchOrder(){

    let search =
    document.getElementById("searchOrder")
    .value.toLowerCase();

    document
    .querySelectorAll("#orderList .card")
    .forEach(card=>{

        if(card.innerText.toLowerCase().includes(search)){
            card.style.display="block";
        }else{
            card.style.display="none";
        }

    });

}

// ==========================
// ORDER REPORT
// ==========================

function orderReport(){

    let totalSales = 0;
    let pending = 0;
    let completed = 0;

    orders.forEach(o=>{

        totalSales += o.total;

        if(o.status==="Pending"){
            pending++;
        }

        if(o.status==="Completed"){
            completed++;
        }

    });

    document.getElementById("orderReport").innerHTML = `
    <h3>Order Summary</h3>

    <p><b>Total Orders :</b> ${orders.length}</p>

    <p><b>Pending :</b> ${pending}</p>

    <p><b>Completed :</b> ${completed}</p>

    <p><b>Total Value :</b> ₹${totalSales}</p>
    `;

}

// ==========================
// EXPORT CSV
// ==========================

function exportOrders(){

    let csv =
    "Order No,Customer,Design,Qty,Rate,Total,Status\n";

    orders.forEach(o=>{

        csv +=
`${o.orderNo},${o.customer},${o.design},${o.qty},${o.rate},${o.total},${o.status}\n`;

    });

    let blob =
    new Blob([csv],{type:"text/csv"});

    let link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "orders.csv";

    link.click();

}

// ==========================
// PRINT REPORT
// ==========================

function printOrders(){

    window.print();

}

// ==========================
// WHATSAPP SHARE
// ==========================

function shareOrder(index){

    let o = orders[index];

    let msg =
`Order No: ${o.orderNo}
Customer: ${o.customer}
Design: ${o.design}
Qty: ${o.qty}
Rate: ₹${o.rate}
Total: ₹${o.total}
Status: ${o.status}`;

    window.open(
        "https://wa.me/?text="+
        encodeURIComponent(msg)
    );

}