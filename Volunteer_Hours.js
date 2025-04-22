document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("volunteer-form");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
    // Get input values
    const charityName = document.getElementById("charity-name").value.trim();
    const hoursValue = document.getElementById("hours").value;
    const date = document.getElementById("date").value;
    const ratingValue = document.getElementById("rating").value;
  
    // Error elements
    const charityNameError = document.getElementById("error-charity");
    const hoursError = document.getElementById("error-hours");
    const dateError = document.getElementById("error-date");
    const ratingError = document.getElementById("error-rating");
  
    // Clear previous errors
    charityNameError.textContent = "";
    hoursError.textContent = "";
    dateError.textContent = "";
    ratingError.textContent = "";
  
    let hasError = false;
  
    // Validate Charity Name
    if (charityName === "") {
        charityNameError.textContent = "Charity name is required.";
        hasError = true;
    }
  
    // Validate Hours
    const hours = parseFloat(hoursValue);
    if (hoursValue === "") {
        hoursError.textContent = "Hours are required.";
        hasError = true;
    } else if (isNaN(hours) || hours <= 0) {
        hoursError.textContent = "Please enter a valid number greater than 0.";
        hasError = true;
    }
  
    // Validate Date
    if (date === "") {
        dateError.textContent = "Date is required.";
        hasError = true;
    }
  
    // Validate Rating
    const rating = parseInt(ratingValue);
    if (ratingValue === "") {
        ratingError.textContent = "Rating is required.";
        hasError = true;
    } else if (isNaN(rating) || rating < 1 || rating > 5) {
        ratingError.textContent = "Rating must be between 1 and 5.";
        hasError = true;
    }
  
    // Submit data if no errors
    if (!hasError) {
        const volunteerData = {
          charityName,
          hours,
          date,
          rating
        };
        console.log("Volunteer Data Submitted:", volunteerData);
        form.reset();
    }
    });
  });
  
