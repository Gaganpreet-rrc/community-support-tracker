document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("donation");
    const tableBody = document.querySelector("#donationTable tbody");
    const totalDisplay = document.getElementById("total-amount");

    let donations = JSON.parse(localStorage.getItem("donations")) || [];

    donations.forEach(addDonationToTable);
    updateTotal();

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const charityName = document.getElementById('charity-name').value.trim();
        const donationAmount = document.getElementById('charity-amount').value;
        const donationDate = document.getElementById('charity-donation-date').value;
        const donorComment = document.getElementById('donor-message').value.trim();

        const nameError = document.getElementById("name-error");
        const amountError = document.getElementById("amount-error");
        const dateError = document.getElementById("date-error");
        const messageError = document.getElementById("message-error");


        nameError.textContent = "";
        amountError.textContent = "";
        dateError.textContent = "";
        messageError.textContent = "";

        let isValid = true;

        if (charityName === "") {
            nameError.textContent = "Charity name is required.";
            isValid = false;
        }

        if (donationAmount === "" || parseFloat(donationAmount) <= 0) {
            amountError.textContent = "Enter a valid donation amount greater than 0.";
            isValid = false;
        }

        if (donationDate === "") {
            dateError.textContent = "Donation date is required.";
            isValid = false;
        }

        if (donorComment === "") {
            messageError.textContent = "Donation message is required.";
            isValid = false;
        }

        if (isValid) {
            const donationData = {
                id: Date.now(),
                charityName,
                donationAmount: parseFloat(donationAmount),
                donationDate,
                donorComment
            };

            donations.push(donationData);
            localStorage.setItem("donations", JSON.stringify(donations));

            addDonationToTable(donationData);
            updateTotal();
            form.reset();
        }
    });

    function addDonationToTable(donation) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${donation.charityName}</td>
            <td>$${donation.donationAmount.toFixed(2)}</td>
            <td>${donation.donationDate}</td>
            <td>${donation.donorComment}</td>
            <td><button class="delete-btn" data-id="${donation.id}">Delete</button></td>
        `;

        tableBody.appendChild(row);
    }

    tableBody.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-btn")) {
            const id = parseInt(e.target.getAttribute("data-id"));
            donations = donations.filter(d => d.id !== id);
            localStorage.setItem("donations", JSON.stringify(donations));
            e.target.closest("tr").remove();
            updateTotal();
        }
    });

    function updateTotal() {
        const total = donations.reduce((sum, d) => sum + d.donationAmount, 0);
        totalDisplay.textContent = total.toFixed(2);
    }
});
