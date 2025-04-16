document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("eventForm");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();    
});
});

// Collect form data
    const eventName = document.getElementById("eventName").value.trim();
    const repName = document.getElementById("repName").value.trim();
    const repEmail = document.getElementById("repEmail").value.trim();
    const role = document.getElementById("role").value;

// data object    
    const formData = {
        eventName,
        repName,
        repEmail,
        role
      };
  
// Validate form fields
    if (!eventName || !repName || !repEmail || !role) {
        alert("Please fill out all fields.");
        return error;
      }
  
// Validate email format 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(repEmail)) {
        alert("Please enter a valid email address.");
        return;
    }
  
    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully!");
  
    form.reset();
