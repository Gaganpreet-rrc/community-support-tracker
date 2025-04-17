/**
 * @jest-environment jsdom
 */

import { validateForm, createFormData } from "./formValidation";

// Unit Tests
describe("Unit Tests: validateForm", () => {
  it("should detect all empty fields", () => {
    const result = validateForm({ eventName: "", repName: "", repEmail: "", role: "" });
    expect(result.isValid).toBe(false);
    expect(result.errors.eventNameError).toBe("eventName is empty.");
    expect(result.errors.repNameError).toBe("repName is empty.");
    expect(result.errors.repEmailError).toBe("repEmail is empty.");
    expect(result.errors.roleError).toBe("Role is not selected.");
  });

  it("should detect invalid email format", () => {
    const result = validateForm({
      eventName: "Event",
      repName: "John",
      repEmail: "invalid-email",
      role: "Organizer"
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.repEmailError).toBe("Invalid email format.");
  });

  it("should return valid when all fields are correct", () => {
    const result = validateForm({
      eventName: "Event",
      repName: "John",
      repEmail: "john@example.com",
      role: "Organizer"
    });
    expect(result.isValid).toBe(true);
    expect(result.errors.eventNameError).toBe("");
    expect(result.errors.repNameError).toBe("");
    expect(result.errors.repEmailError).toBe("");
    expect(result.errors.roleError).toBe("");
  });
});

describe("Unit Tests: createFormData", () => {
  it("should return correct form data object", () => {
    const data = {
      eventName: "Event",
      repName: "Alice",
      repEmail: "alice@example.com",
      role: "Sponsor"
    };
    const result = createFormData(data);
    expect(result).toEqual(data);
  });
});

// Integration Tests
describe("Integration Tests", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="eventForm">
        <input id="eventName" />
        <span id="eventNameError"></span>
        <input id="repName" />
        <span id="repNameError"></span>
        <input id="repEmail" />
        <span id="repEmailError"></span>
        <select id="role">
          <option value="">-- Select Role --</option>
          <option value="Sponsor">Sponsor</option>
        </select>
        <span id="roleError"></span>
        <button type="submit">Submit</button>
      </form>
    `;
  });

  it("should update form data correctly on valid submit", () => {
    const eventNameInput = document.getElementById("eventName");
    const repNameInput = document.getElementById("repName");
    const repEmailInput = document.getElementById("repEmail");
    const roleSelect = document.getElementById("role");

    eventNameInput.value = "Launch";
    repNameInput.value = "Bob";
    repEmailInput.value = "bob@site.com";
    roleSelect.value = "Sponsor";

    const data = createFormData({
      eventName: eventNameInput.value,
      repName: repNameInput.value,
      repEmail: repEmailInput.value,
      role: roleSelect.value
    });

    expect(data).toEqual({
      eventName: "Launch",
      repName: "Bob",
      repEmail: "bob@site.com",
      role: "Sponsor"
    });
  });

  it("should show errors on invalid submission", () => {
    const eventNameInput = document.getElementById("eventName");
    const repNameInput = document.getElementById("repName");
    const repEmailInput = document.getElementById("repEmail");
    const roleSelect = document.getElementById("role");

    eventNameInput.value = "";
    repNameInput.value = "";
    repEmailInput.value = "bademail";
    roleSelect.value = "";

    const result = validateForm({
      eventName: eventNameInput.value,
      repName: repNameInput.value,
      repEmail: repEmailInput.value,
      role: roleSelect.value
    });

    document.getElementById("eventNameError").textContent = result.errors.eventNameError;
    document.getElementById("repNameError").textContent = result.errors.repNameError;
    document.getElementById("repEmailError").textContent = result.errors.repEmailError;
    document.getElementById("roleError").textContent = result.errors.roleError;

    expect(result.isValid).toBe(false);
    expect(document.getElementById("eventNameError").textContent).toBe("eventName is empty.");
    expect(document.getElementById("repNameError").textContent).toBe("repName is empty.");
    expect(document.getElementById("repEmailError").textContent).toBe("Invalid email format.");
    expect(document.getElementById("roleError").textContent).toBe("Role is not selected.");
  });
});
