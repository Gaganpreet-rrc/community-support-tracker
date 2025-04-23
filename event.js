document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("eventForm");
  const table = document.querySelector("#signupTable tbody");
  const summary = document.getElementById("summary");

  let signups = JSON.parse(localStorage.getItem("signups")) || [];

  function saveSignups() {
    localStorage.setItem("signups", JSON.stringify(signups));
  }

  function updateTable() {
    table.innerHTML = "";
    signups.forEach((signup, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${signup.event}</td>
        <td>${signup.name}</td>
        <td>${signup.email}</td>
        <td>${signup.role}</td>
        <td><button data-index="${index}" class="delete-btn">Delete</button></td>
      `;
      table.appendChild(row);
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        signups.splice(index, 1);
        saveSignups();
        updateTable();
        updateSummary();
      });
    });
  }

  function updateSummary() {
    const counts = { Sponsor: 0, Participant: 0, Organizer: 0 };
    signups.forEach(s => counts[s.role]++);
    summary.innerHTML = `
      <h3>Role Summary</h3>
      <p>Sponsors: ${counts.Sponsor}</p>
      <p>Participants: ${counts.Participant}</p>
      <p>Organizers: ${counts.Organizer}</p>
    `;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const event = document.getElementById("eventName").value.trim();
    const name = document.getElementById("repName").value.trim();
    const email = document.getElementById("repEmail").value.trim();
    const role = document.getElementById("role").value;

    // Clear previous error messages
    document.getElementById("eventNameError").textContent = "";
    document.getElementById("repNameError").textContent = "";
    document.getElementById("repEmailError").textContent = "";
    document.getElementById("roleError").textContent = "";

    // Basic validation
    if (!event || !name || !email || !role) {
      console.log("Please fill in all fields.");

      if (!event) document.getElementById("eventNameError").textContent = "Event name is required.";
      if (!name) document.getElementById("repNameError").textContent = "Name is required.";
      if (!email) document.getElementById("repEmailError").textContent = "Email is required.";
      if (!role) document.getElementById("roleError").textContent = "Please select a role.";

      return;
    }

    signups.push({ event, name, email, role });
    saveSignups();
    updateTable();
    updateSummary();
    form.reset();
  });

  updateTable();
  updateSummary();
});
