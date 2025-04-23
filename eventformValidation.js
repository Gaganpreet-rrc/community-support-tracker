const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ---------- 1. validateForm ---------- */
function validateForm({ eventName, repName, repEmail, role }) {
  const errors = {
    eventNameError: "",
    repNameError: "",
    repEmailError: "",
    roleError: ""
  };

  if (!eventName) errors.eventNameError = "eventName is empty.";
  if (!repName)   errors.repNameError   = "repName is empty.";
  if (!repEmail)  errors.repEmailError  = "repEmail is empty.";
  else if (!emailRegex.test(repEmail))
    errors.repEmailError = "Invalid email format.";
  if (!role)      errors.roleError      = "Role is not selected.";

  return { isValid: Object.values(errors).every(e => e === ""), errors };
}

/* ---------- 2. createFormData ---------- */
function createFormData(obj) {
  // shallow‑copy so we don’t mutate caller’s reference
  return { ...obj };
}

/* ---------- 3. loadTableFromLocalStorage ---------- */
function loadTableFromLocalStorage() {
  const tbody = document.querySelector("#eventTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  const signups = JSON.parse(localStorage.getItem("eventSignups") || "[]");

  signups.forEach(({ id, eventName, repName, repEmail, role }) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${eventName}</td>
      <td>${repName}</td>
      <td>${repEmail}</td>
      <td>${role}</td>
      <td><button data-id="${id}">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });

  // wire up delete buttons
  tbody.querySelectorAll("button").forEach(btn =>
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const updated = signups.filter(s => s.id !== id);
      localStorage.setItem("eventSignups", JSON.stringify(updated));
      loadTableFromLocalStorage();             // refresh table
      document.getElementById("summary").textContent =
        JSON.stringify(generateEventSummary(updated));
    })
  );
}

/* ---------- 4. generateEventSummary ---------- */
function generateEventSummary(signups) {
  return signups.reduce((acc, { role }) => {
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, { Organizer: 0, Speaker: 0, Sponsor: 0 });
}

module.exports = {
  validateForm,
  createFormData,
  loadTableFromLocalStorage,
  generateEventSummary
};
