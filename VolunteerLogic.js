function renderVolunteerTable() {
    const data = JSON.parse(localStorage.getItem("volunteerData")) || [];
    const table = document.getElementById("volunteer-table");
    table.innerHTML = "";
    data.forEach(entry => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.charityName}</td>
        <td>${entry.hours}</td>
        <td>${entry.date}</td>
        <td>${entry.rating}</td>
      `;
      table.appendChild(row);
    });
  
    const total = calculateTotalHours(data);
    const totalEl = document.getElementById("total-hours");
    if (totalEl) {
      totalEl.textContent = `Total Hours: ${total}`;
    }
  }
  
  function loadVolunteerData() {
    renderVolunteerTable();
  }
  
  function calculateTotalHours(data) {
    return data.reduce((sum, entry) => sum + Number(entry.hours), 0);
  }
  
  function deleteVolunteerEntry(index) {
    const data = JSON.parse(localStorage.getItem("volunteerData")) || [];
    data.splice(index, 1);
    localStorage.setItem("volunteerData", JSON.stringify(data));
    renderVolunteerTable();
  }
  
  function updateTotal(logs, totalDisplay) {
    const total = logs.reduce((sum, log) => sum + log.hours, 0);
    totalDisplay.textContent = total.toFixed(1);
  }
  
  function deleteLogRecord(id) {
    const logs = JSON.parse(localStorage.getItem("volunteerLogs")) || [];
    const newLogs = logs.filter(log => log.id !== id);
    localStorage.setItem("volunteerLogs", JSON.stringify(newLogs));
    const row = document.querySelector(`tr[data-id="${id}"]`);
    if (row) row.remove();
  }
  
  function displayVolunteerLogs() {
    const logs = JSON.parse(localStorage.getItem("volunteerLogs")) || [];
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    logs.forEach(log => {
      const row = document.createElement("tr");
      row.setAttribute("data-id", log.id);
      row.innerHTML = `
        <td>${log.charity}</td>
        <td>${log.hours}</td>
        <td>${log.date}</td>
        <td>${log.rating}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  module.exports = {
    renderVolunteerTable,
    loadVolunteerData,
    calculateTotalHours,
    deleteVolunteerEntry,
    updateTotal,
    deleteLogRecord,
    displayVolunteerLogs
  };
  