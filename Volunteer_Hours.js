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

        const nameError = document.getElementById("error-charity");
        const hoursError = document.getElementById("error-hours");
        const dateError = document.getElementById("error-date");
        const ratingError = document.getElementById("error-rating");

        nameError.textContent = "";
        hoursError.textContent = "";
        dateError.textContent = "";
        ratingError.textContent = "";

        let isValid = true;

        if (charity === "") {
            nameError.textContent = "Charity name is required.";
            console.log("Validation Error: Charity name is empty");
            isValid = false;
        }

        if (hours === "" || parseFloat(hours) <= 0) {
            hoursError.textContent = "Enter valid hours greater than 0.";
            console.log("Validation Error: Hours missing or invalid");
            isValid = false;
        }

        if (date === "") {
            dateError.textContent = "Date is required.";
            console.log("Validation Error: Date is empty");
            isValid = false;
        }

        if (rating === "") {
            ratingError.textContent = "Rating is required.";
            console.log("Validation Error: Rating not selected");
            isValid = false;
        }

        if (isValid) {
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
            console.log("Form submitted successfully", log);
        } else {
            console.log("Form has errors. Fix them before submitting.");
        }
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

    tableBody.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-btn")) {
            const id = parseInt(e.target.getAttribute("data-id"));
            logs = logs.filter(log => log.id !== id);
            localStorage.setItem("volunteerLogs", JSON.stringify(logs));
            e.target.closest("tr").remove();
            updateTotal();
            console.log(`Log with ID ${id} deleted`);
        }
    });

    function updateTotal() {
        const total = logs.reduce((sum, log) => sum + log.hours, 0);
        totalDisplay.textContent = total.toFixed(1);
        console.log("Updated total hours:", total.toFixed(1));
    }
});