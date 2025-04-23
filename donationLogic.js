function validateDonationForm(charityName, donationAmount, donationDate, donorComment) {
    const errors = { charityName: "", donationAmount: "", donationDate: "", donorComment: "" };
    let isValid = true;

    if (charityName.trim() === "") {
        errors.charityName = "Charity name is required.";
        isValid = false;
    }

    const amount = parseFloat(donationAmount);
    if (isNaN(amount) || amount <= 0) {
        errors.donationAmount = "Enter a valid donation amount greater than 0.";
        isValid = false;
    }

    if (donationDate.trim() === "") {
        errors.donationDate = "Donation date is required.";
        isValid = false;
    }

    if (donorComment.trim() === "") {
        errors.donorComment = "Donation message is required.";
        isValid = false;
    }

    return { isValid, errors };
}


function processDonationData(charityName, donationAmount, donationDate, donorComment) {
    return {
        charityName: charityName.trim(),
        donationAmount: parseFloat(donationAmount),
        donationDate,
        donorComment: donorComment.trim()
    };
}

function setupForm() {
    const form = document.getElementById("donation");
    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameEl = document.getElementById("charity-name");
        const amountEl = document.getElementById("charity-amount");
        const dateEl = document.getElementById("charity-donation-date");
        const commentEl = document.getElementById("donor-message");

        const nameError = document.getElementById("name-error");
        const amountError = document.getElementById("amount-error");
        const dateError = document.getElementById("date-error");
        const messageError = document.getElementById("message-error");


        nameError.textContent = "";
        amountError.textContent = "";
        dateError.textContent = "";
        messageError.textContent = "";

        const { isValid, errors } = validateDonationForm(
            nameEl.value,
            amountEl.value,
            dateEl.value,
            commentEl.value
        );

        if (!isValid) {
            nameError.textContent = errors.charityName;
            amountError.textContent = errors.donationAmount;
            dateError.textContent = errors.donationDate;
            messageError.textContent = errors.donorComment;
            return;
        }

        const data = processDonationData(
            nameEl.value,
            amountEl.value,
            dateEl.value,
            commentEl.value
        );
        console.log("Donation Added:", data);
        form.reset();
    });
}

function updateTotal(donations) {
    return donations.reduce((sum, d) => sum + d.donationAmount, 0);
}

function deleteDonationById(donations, idToDelete) {
    return donations.filter(donation => donation.id !== idToDelete);
}

module.exports = {
    updateTotal,
    deleteDonationById,
    validateDonationForm,
    processDonationData,
    setupForm
};
