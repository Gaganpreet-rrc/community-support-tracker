const form = document.getElementById("volunteer-form");
  const tableBody = document.getElementById("hoursTable").querySelector("tbody");

  // Load logs on page load
  window.addEventListener("DOMContentLoaded", () => {
    const storedLogs = JSON.parse(localStorage.getItem("volunteerLogs")) || [];
    storedLogs.forEach(log => addLogToTable(log.charity, log.hours, log.date, log.rating));
  });

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const charityName = document.getElementById("charity-name").value;
    const hours = document.getElementById("hours").value;
    const date = document.getElementById("date").value;
    const rating = document.getElementById("rating").value;

    if (!charityName || !hours || !date || !rating) {
      alert("Please fill out all fields.");
      return;
    }

    addLogToTable(charityName, hours, date, rating);
    saveLogToStorage(charityName, hours, date, rating);
    form.reset();
  });

  function addLogToTable(charity, hours, date, rating) {
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
      <td>${charity}</td>
      <td>${hours}</td>
      <td>${date}</td>
      <td>${rating}</td>
      <td><button onclick="deleteLog(this)">Delete</button></td>
    `;
  }

  function saveLogToStorage(charity, hours, date, rating) {
    const logs = JSON.parse(localStorage.getItem("volunteerLogs")) || [];
    logs.push({ charity, hours, date, rating });
    localStorage.setItem("volunteerLogs", JSON.stringify(logs));
  }

  function deleteLog(button) {
    const row = button.closest("tr");
    const index = Array.from(tableBody.rows).indexOf(row);
    row.remove();

    // Remove from localStorage
    const logs = JSON.parse(localStorage.getItem("volunteerLogs")) || [];
    logs.splice(index, 1);
    localStorage.setItem("volunteerLogs", JSON.stringify(logs));
  }
