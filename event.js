document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("eventForm");
  const tableBody = document.querySelector("#signupTable tbody");
  const summary = document.getElementById("summary");

  let signups = JSON.parse(localStorage.getItem("signups")) || [];

  signups.forEach(addSignupToTable);
  updateSummary();

  form.addEventListener("submit", function (event) {
      event.preventDefault();

      const eventName = document.getElementById("eventName").value.trim();
      const repName = document.getElementById("repName").value.trim();
      const repEmail = document.getElementById("repEmail").value.trim();
      const role = document.getElementById("role").value;

      const eventNameError = document.getElementById("eventNameError");
      const repNameError = document.getElementById("repNameError");
      const repEmailError = document.getElementById("repEmailError");
      const roleError = document.getElementById("roleError");

      eventNameError.textContent = "";
      repNameError.textContent = "";
      repEmailError.textContent = "";
      roleError.textContent = "";

      let isValid = true;

      if (eventName === "") {
          eventNameError.textContent = "Event name is required.";
          isValid = false;
      }

      if (repName === "") {
          repNameError.textContent = "Name is required.";
          isValid = false;
      }

      if (repEmail === "") {
          repEmailError.textContent = "Email is required.";
          isValid = false;
      }

      if (role === "") {
          roleError.textContent = "Please select a role.";
          isValid = false;
      }

      if (isValid) {
          const signupData = {
              id: Date.now(),
              event: eventName,
              name: repName,
              email: repEmail,
              role: role
          };

          signups.push(signupData);
          localStorage.setItem("signups", JSON.stringify(signups));

          addSignupToTable(signupData);
          updateSummary();
          form.reset();
      }
  });

  function addSignupToTable(signup) {
      const row = document.createElement("tr");

      row.innerHTML = `
          <td>${signup.event}</td>
          <td>${signup.name}</td>
          <td>${signup.email}</td>
          <td>${signup.role}</td>
          <td><button class="delete-btn" data-id="${signup.id}">Delete</button></td>`;

      tableBody.appendChild(row);
  }

  tableBody.addEventListener("click", function (e) {
      if (e.target.classList.contains("delete-btn")) {
          const id = parseInt(e.target.getAttribute("data-id"));
          signups = signups.filter(s => s.id !== id);
          localStorage.setItem("signups", JSON.stringify(signups));
          e.target.closest("tr").remove();
          updateSummary();
      }
  });

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
});
