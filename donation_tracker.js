const formNode = document.querySelector("#donation");

formNode.addEventListener("submit", eventObject => {
    // by default submit refresh the page

    eventObject.preventDefault();

    const charityName = document.getElementById('charity-name').value.trim();
    const donationAmount = document.getElementById('charity-amount').value;
    const donationDate = document.getElementById('charity-donation-date').value;
    const donorComment = document.getElementById('donor-message').value.trim();

    console.log(charityName);
    console.log(donationAmount);
    console.log(donationDate);
    console.log(donorComment);

    if () {

    }

});
