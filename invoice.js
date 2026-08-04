// ==========================
// INVOICE STORAGE
// ==========================

let invoices =
JSON.parse(localStorage.getItem("invoices")) || [];

function saveInvoices(){

    localStorage.setItem(
        "invoices",
        JSON.stringify(invoices)
    );

}

// ==========================
// AUTO INVOICE NUMBER
// ==========================

function generateInvoiceNo(){

    return "INV-" + Date.now();

}

// ==========================
// CREATE INVOICE
// ==========================

function createInvoice(){

    let customer =
    document.getElementById("invoiceCustomer").value;

    let orderNo =
    document.getElementById("invoiceOrder").value;

    let design =
    document.getElementById("invoiceDesign").value;

    let qty =
    Number(document.getElementById("invoiceQty").value);

    let rate =
    Number(document.getElementById("invoiceRate").value);

    if(customer=="" || orderNo==""){

        alert("Select Customer & Order");

        return;

    }

    let subtotal =
    qty * rate;

    let cgst =
    subtotal * 0.025;

    let sgst =
    subtotal * 0.025;

    let grandTotal =
    subtotal + cgst + sgst;

    let invoice = {

        invoiceNo:
        generateInvoiceNo(),

        date:
        new Date().toLocaleDateString(),

        customer,

        orderNo,

        design,

        qty,

        rate,

        subtotal,

        cgst,

        sgst,

        grandTotal

    };

    invoices.push(invoice);

    saveInvoices();

    showInvoices();

    showInvoicePreview(invoice);

    alert("Invoice Created");

}

// ==========================
// SHOW INVOICE
// ==========================

function showInvoices(){

    let list =
    document.getElementById("invoiceList");

    if(!list) return;

    list.innerHTML="";

    invoices.forEach((i,index)=>{

        list.innerHTML += `

        <div class="card">

        <h3>${i.invoiceNo}</h3>

        <p>Customer : ${i.customer}</p>

        <p>Order : ${i.orderNo}</p>

        <p>Total : ₹${i.grandTotal}</p>

        <button onclick="printInvoice(${index})">

        Print

        </button>

        </div>

        `;

    });

}

// ==========================
// PREVIEW
// ==========================

function showInvoicePreview(i){

document.getElementById("invoicePreview").innerHTML=`

<h2>VARVIKA CREATION</h2>

<hr>

<p><b>Invoice :</b> ${i.invoiceNo}</p>

<p><b>Date :</b> ${i.date}</p>

<p><b>Customer :</b> ${i.customer}</p>

<p><b>Order :</b> ${i.orderNo}</p>

<p><b>Design :</b> ${i.design}</p>

<p><b>Qty :</b> ${i.qty}</p>

<p><b>Rate :</b> ₹${i.rate}</p>

<hr>

<p>Subtotal : ₹${i.subtotal}</p>

<p>CGST (2.5%) : ₹${i.cgst}</p>

<p>SGST (2.5%) : ₹${i.sgst}</p>

<h3>Grand Total : ₹${i.grandTotal}</h3>

`;

}

// ==========================
// PRINT
// ==========================

function printInvoice(){

    window.print();

}

// ==========================
// LOAD
// ==========================

window.addEventListener("load",()=>{

    showInvoices();

});
// ==========================
// SEARCH INVOICE
// ==========================

function searchInvoice(){

    let text = document
        .getElementById("searchInvoice")
        .value
        .toLowerCase();

    document
        .querySelectorAll("#invoiceList .card")
        .forEach(card=>{

            card.style.display =
                card.innerText.toLowerCase().includes(text)
                ? "block"
                : "none";

        });

}

// ==========================
// DELETE INVOICE
// ==========================

function deleteInvoice(index){

    if(confirm("Delete Invoice?")){

        invoices.splice(index,1);

        saveInvoices();

        showInvoices();

    }

}

// ==========================
// EXPORT CSV
// ==========================

function exportInvoiceCSV(){

    let csv =
"Invoice No,Date,Customer,Order No,Grand Total\n";

    invoices.forEach(i=>{

        csv +=
`${i.invoiceNo},${i.date},${i.customer},${i.orderNo},${i.grandTotal}\n`;

    });

    let blob =
    new Blob([csv],{type:"text/csv"});

    let link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "Invoices.csv";

    link.click();

}

// ==========================
// WHATSAPP SHARE
// ==========================

function shareInvoice(index){

    let i = invoices[index];

    let msg =

`*VARVIKA CREATION*

Invoice : ${i.invoiceNo}

Customer : ${i.customer}

Order : ${i.orderNo}

Design : ${i.design}

Qty : ${i.qty}

Grand Total : ₹${i.grandTotal}

Thank You`;

    window.open(
        "https://wa.me/?text="+
        encodeURIComponent(msg)
    );

}

// ==========================
// EMAIL INVOICE
// ==========================

function emailInvoice(index){

    let i = invoices[index];

    let subject =
    "Invoice " + i.invoiceNo;

    let body =

`Invoice No : ${i.invoiceNo}

Customer : ${i.customer}

Order : ${i.orderNo}

Total : ₹${i.grandTotal}

Regards,

VARVIKA CREATION`;

    window.location.href =
    "mailto:?subject="+
    encodeURIComponent(subject)+
    "&body="+
    encodeURIComponent(body);

}

// ==========================
// PDF DOWNLOAD
// ==========================

function downloadInvoicePDF(){

    window.print();

}

// ==========================
// GST BILL FORMAT
// ==========================

function gstBill(index){

    let i = invoices[index];

    document.getElementById("invoicePreview").innerHTML = `

    <div style="padding:20px;border:2px solid black;">

    <h2 align="center">

    VARVIKA CREATION

    </h2>

    <hr>

    <p><b>GSTIN :</b> YOUR-GST-NUMBER</p>

    <p><b>Invoice :</b> ${i.invoiceNo}</p>

    <p><b>Date :</b> ${i.date}</p>

    <p><b>Customer :</b> ${i.customer}</p>

    <hr>

    <table
    border="1"
    width="100%"
    cellspacing="0"
    cellpadding="6">

    <tr>

    <th>Design</th>

    <th>Qty</th>

    <th>Rate</th>

    <th>Total</th>

    </tr>

    <tr>

    <td>${i.design}</td>

    <td>${i.qty}</td>

    <td>${i.rate}</td>

    <td>${i.subtotal}</td>

    </tr>

    </table>

    <br>

    <p>Subtotal :
    ₹${i.subtotal}</p>

    <p>CGST :
    ₹${i.cgst}</p>

    <p>SGST :
    ₹${i.sgst}</p>

    <h3>Grand Total :
    ₹${i.grandTotal}</h3>

    <br>

    <center>

    <b>Thank You For Your Business</b>

    </center>

    </div>

    `;

}

// ==========================
// HISTORY
// ==========================

function invoiceHistory(){

    showInvoices();

}