document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("volunteer-form");
    const tableBody = document.querySelector("#hoursTable tbody");
    const totalDisplay = document.getElementById("total-hours");

    let logs = JSON.parse(localStorage.getItem("volunteerLogs")) || [];

    logs.forEach(addLogToTable);
    updateTotal();

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const charity = document.getElementById("charity-name").value.trim();
        const hours = document.getElementById("hours").value;
        const date = document.getElementById("date").value;
        const rating = document.getElementById("rating").value;

        if (!charity || !hours || !date || !rating) {
            console.log("Please fill out all fields.");
            return;
        }

        const log = {
            id: Date.now(),
            charity,
            hours: parseFloat(hours),
            date,
            rating
        };

        logs.push(log);
        localStorage.setItem("volunteerLogs", JSON.stringify(logs));

        addLogToTable(log);
        updateTotal();
        form.reset();
    });

    function addLogToTable(log) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${log.charity}</td>
            <td>${log.hours}</td>
            <td>${log.date}</td>
            <td>${log.rating}</td>
            <td><button class="delete-btn" data-id="${log.id}">Delete</button></td>`;

        tableBody.appendChild(row);
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
    tableBody.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-btn")) {
            const id = parseInt(e.target.getAttribute("data-id"));
            logs = logs.filter(log => log.id !== id);
            localStorage.setItem("volunteerLogs", JSON.stringify(logs));
            e.target.closest("tr").remove();
            updateTotal();
        }
    });

    function updateTotal() {
        const total = logs.reduce((sum, log) => sum + log.hours, 0);
        totalDisplay.textContent = total.toFixed(1);
    }
});
