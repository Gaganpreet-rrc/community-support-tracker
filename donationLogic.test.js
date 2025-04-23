// donationLogic.test.js

const {
    updateTotal,
    deleteDonationById,
    validateDonationForm,
    processDonationData,
    setupForm
} = require('./donationLogic');



beforeEach(() => {
    document.body.innerHTML = `
      <form id="donation">
        <input type="text" id="charity-name" />
        <input type="number" id="charity-amount" />
        <input type="date" id="charity-donation-date" />
        <textarea id="donor-message"></textarea>
        <button type="submit">Submit</button>
      </form>
      <div id="name-error"></div>
      <div id="amount-error"></div>
      <div id="date-error"></div>
      <div id="message-error"></div>
    `;


    setupForm();


    console.log = jest.fn();
});


test("Submitting the form updates the temporary data object correctly", () => {
    // Arrange
    document.getElementById("charity-name").value = "Charity X";
    document.getElementById("charity-amount").value = "100";
    document.getElementById("charity-donation-date").value = "2025-04-16";
    document.getElementById("donor-message").value = "Great cause!";

    // Act
    document.getElementById("donation").dispatchEvent(new Event("submit"));

    // Assert
    expect(console.log).toHaveBeenCalledWith("Donation Added:", {
        charityName: "Charity X",
        donationAmount: 100,
        donationDate: "2025-04-16",
        donorComment: "Great cause!"
    });
});

test("Submitting with incomplete data shows error messages", () => {
    // Arrange
    document.getElementById("charity-name").value = "";
    document.getElementById("charity-amount").value = "100";
    document.getElementById("charity-donation-date").value = "";
    document.getElementById("donor-message").value = "Great cause!";

    // Act
    document.getElementById("donation").dispatchEvent(new Event("submit"));

    // Assert
    expect(document.getElementById("name-error").textContent).toBe(
        "Charity name is required."
    );
    expect(document.getElementById("date-error").textContent).toBe(
        "Donation date is required."
    );
});



test("validateDonationForm returns errors for all empty fields", () => {
    const { isValid, errors } = validateDonationForm("", "", "", "");
    expect(isValid).toBe(false);
    expect(errors.charityName).toBe("Charity name is required.");
    expect(errors.donationAmount).toBe(
        "Enter a valid donation amount greater than 0."
    );
    expect(errors.donationDate).toBe("Donation date is required.");
    expect(errors.donorComment).toBe("Donation message is required.");
});

test("validateDonationForm flags invalid donation amounts", () => {
    ["-5", "abc"].forEach((amt) => {
        const { isValid, errors } = validateDonationForm(
            "Charity",
            amt,
            "2025-04-16",
            "Nice work"
        );
        expect(isValid).toBe(false);
        expect(errors.donationAmount).toBe(
            "Enter a valid donation amount greater than 0."
        );
    });
});

test("processDonationData returns trimmed and parsed data", () => {
    const data = processDonationData(
        "  Red Cross charity  ",
        "100",
        "2025-04-15",
        "  Good job! "
    );
    expect(data).toEqual({
        charityName: "Red Cross charity",
        donationAmount: 100,
        donationDate: "2025-04-15",
        donorComment: "Good job!"
    });
});



describe('Donation Tracker Functions', () => {
    const donations = [
        { id: 1, donationAmount: 20 },
        { id: 2, donationAmount: 30 },
        { id: 3, donationAmount: 50 }
    ];

    test('calculates total donation amount correctly', () => {
        expect(updateTotal(donations)).toBe(100);
    });

    test('deleting a record updates the donation list', () => {
        const updated = deleteDonationById(donations, 2);
        expect(updated).toHaveLength(2);
        expect(updated.find(d => d.id === 2)).toBeUndefined();
    });

    test('total amount updates correctly after deletion', () => {
        const updated = deleteDonationById(donations, 2);
        expect(updateTotal(updated)).toBe(70);
    });
});

