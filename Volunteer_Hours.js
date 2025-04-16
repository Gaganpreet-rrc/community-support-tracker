  document.getElementById("volunteer-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear previous error
    let errorDiv = document.getElementById("form-error");
    if (!errorDiv) {
      errorDiv = document.createElement("div");
      errorDiv.id = "form-error";
      errorDiv.style.color = "red";
      this.appendChild(errorDiv);
    }
    errorDiv.textContent = "";

    // Get values
    const charityName = document.getElementById("charity-name").value.trim();
    const hours = parseFloat(document.getElementById("hours").value);
    const date = document.getElementById("date").value;
    const rating = parseInt(document.getElementById("rating").value);

    // Validate
    if (charityName === "") {
      errorDiv.textContent = "Charity name is required.";
      return;
    }

    if (isNaN(hours) || hours <= 0) {
      errorDiv.textContent = "Please enter a valid number of hours.";
      return;
    }

    if (date === "") {
      errorDiv.textContent = "Date is required.";
      return;
    }

    if (isNaN(rating) || rating < 1 || rating > 5) {
      errorDiv.textContent = "Please select a rating between 1 and 5.";
      return;
    }

    // Store data
    const volunteerData = {
      charityName,
      hours,
      date,
      rating
    };

    console.log("Volunteer Data Submitted:", volunteerData);
    this.reset();
  });

