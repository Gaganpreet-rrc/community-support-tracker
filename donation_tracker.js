document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("donation");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const charityName = document.getElementById('charity-name').value.trim();
        const donationAmount = document.getElementById('charity-amount').value;
        const donationDate = document.getElementById('charity-donation-date').value;
        const donorComment = document.getElementById('donor-message').value.trim();

        console.log(charityName);
        console.log(donationAmount);
        console.log(donationDate);
        console.log(donorComment);

        const nameError = document.getElementById("name-error");
        const amountError = document.getElementById("amount-error");
        const dateError = document.getElementById("date-error");
        const messageError = document.getElementById("message-error");

        // Clear previous errors
        nameError.textContent = "";
        amountError.textContent = "";
        dateError.textContent = "";
        messageError.textContent = "";

        let isValid = true;

        // Validation checks with custom error messages
        if (charityName === "") {
            nameError.textContent = "Charity name is required.";
            isValid = false;
        }

        if (donationAmount === "") {
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
                charityName,
                donationAmount: parseFloat(donationAmount),
                donationDate,
                donorComment

            };

            console.log("Donation Addedss:", donationData);
            form.reset();
        }
    });
});
