document.addEventListener("DOMContentLoaded", () => {

    showWorkers?.();
    showAttendance?.();
    showCustomers?.();
    showOrders?.();
    showProductions?.();
    showInventory?.();
    showInvoices?.();

    loadAttendanceWorkers?.();
    loadSalaryWorkers?.();
    loadCustomerDropdown?.();

    refreshReports?.();

});