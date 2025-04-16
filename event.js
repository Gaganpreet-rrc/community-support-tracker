document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("eventForm");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Get input values
      const eventName = document.getElementById("eventName").value.trim();
      const repName = document.getElementById("repName").value.trim();
      const repEmail = document.getElementById("repEmail").value.trim();
      const role = document.getElementById("role").value;
  
      // Error elements
      const eventNameError = document.getElementById("eventNameError");
      const repNameError = document.getElementById("repNameError");
      const repEmailError = document.getElementById("repEmailError");
      const roleError = document.getElementById("roleError");
  
      // Clear previous errors
      eventNameError.textContent = "";
      repNameError.textContent = "";
      repEmailError.textContent = "";
      roleError.textContent = "";
  
      let hasError = false;
  
      if (!eventName) {
        eventNameError.textContent = "eventName is required.";
        hasError = true;
      }
  
      if (!repName) {
        repNameError.textContent = "repName is required.";
        hasError = true;
      }
  
      if (!repEmail) {
        repEmailError.textContent = "repEmail is required.";
        hasError = true;
      } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(repEmail)) {
          repEmailError.textContent = "Invalid email format.";
          hasError = true;
        }
      }
  
      if (!role) {
        roleError.textContent = "Please select a role.";
        hasError = true;
      }
  
      if (!hasError) {
        form.reset();
      }
    });
  });
  