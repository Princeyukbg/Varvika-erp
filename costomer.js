// ==========================
// CUSTOMER STORAGE
// ==========================

let customers =
JSON.parse(localStorage.getItem("customers")) || [];

function saveCustomers(){
    localStorage.setItem(
        "customers",
        JSON.stringify(customers)
    );
}

function addCustomer(){

    let name =
    document.getElementById("customerName").value.trim();

    let mobile =
    document.getElementById("customerMobile").value.trim();

    let city =
    document.getElementById("customerAddress").value.trim();

    if(name==""){
        alert("Customer Name Required");
        return;
    }

    customers.push({
        id:Date.now(),
        name,
        mobile,
        city
    });

    saveCustomers();

    showCustomers();

    loadCustomerDropdown();

    document.getElementById("customerName").value="";
    document.getElementById("customerMobile").value="";
    document.getElementById("customerAddress").value="";

    alert("Customer Added");
}

function showCustomers(){

    let list =
    document.getElementById("customerList");

    if(!list) return;

    list.innerHTML="";

    customers.forEach((c,index)=>{

        list.innerHTML += `
        <div class="card">
            <h3>${c.name}</h3>
            <p>📞 ${c.mobile}</p>
            <p>🏙 ${c.city}</p>

            <button onclick="deleteCustomer(${index})">
            Delete
            </button>
        </div>`;
    });

    let count =
    document.getElementById("customersCount");

    if(count){
        count.innerHTML=customers.length;
    }
}

function deleteCustomer(index){

    if(confirm("Delete Customer?")){

        customers.splice(index,1);

        saveCustomers();

        showCustomers();

        loadCustomerDropdown();

    }

}

function loadCustomerDropdown(){

    let select =
    document.getElementById("orderCustomer");

    if(!select) return;

    select.innerHTML="";

    customers.forEach(c=>{

        select.innerHTML +=
        `<option value="${c.name}">
        ${c.name}
        </option>`;

    });

}

function searchCustomer(){

    let txt =
    document.getElementById("searchCustomer")
    .value.toLowerCase();

    document
    .querySelectorAll("#customerList .card")
    .forEach(card=>{

        card.style.display =
        card.innerText.toLowerCase().includes(txt)
        ? "block"
        : "none";

    });

}

window.addEventListener("load",()=>{

    showCustomers();

    loadCustomerDropdown();

});