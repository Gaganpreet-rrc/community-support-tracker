/**
 * @jest-environment jsdom
 */

const {
  validateForm,
  createFormData,
  loadTableFromLocalStorage,
  generateEventSummary
} = require("./eventformValidation");

/* Unit tests */
  describe("Unit Tests: validateForm", () => {
    it("should detect all empty fields", () => {
      const result = validateForm({ eventName: "", repName: "", repEmail: "", role: "" });
      expect(result.isValid).toBe(false);
      expect(result.errors.eventNameError).toBe("eventName is empty.");
      expect(result.errors.repNameError).toBe("repName is empty.");
      expect(result.errors.repEmailError).toBe("repEmail is empty.");
      expect(result.errors.roleError).toBe("Role is not selected.");
    });

    it("detects invalid email format", () => {
      const result = validateForm({
        eventName: "Event",
        repName: "John",
        repEmail: "invalid-email",
        role: "Organizer"
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.repEmailError).toBe("Invalid email format.");
    });
  
    it("returns valid when all fields are correct", () => {
      const result = validateForm({
        eventName: "Event",
        repName: "John",
        repEmail: "john@example.com",
        role: "Organizer"
      });
      expect(result.isValid).toBe(true);
      expect(Object.values(result.errors).every(e => e === "")).toBe(true);
    });
  });
  
  describe("Unit Tests: createFormData", () => {
    it("returns correct form‑data object", () => {
      const sample = {
        eventName: "Event",
        repName: "Alice",
        repEmail: "alice@example.com",
        role: "Sponsor"
      };
      expect(createFormData(sample)).toEqual(sample);
    });
  });
  
  /* Integration tests*/
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
        <table id="eventTable"><tbody></tbody></table>
        <div id="summary"></div>
      `;
      localStorage.clear();
    });
  
    it("creates form‑data on valid submit", () => {
      document.getElementById("eventName").value = "Launch";
      document.getElementById("repName").value = "Bob";
      document.getElementById("repEmail").value = "bob@site.com";
      document.getElementById("role").value = "Sponsor";
  
      const data = createFormData({
        eventName: "Launch",
        repName: "Bob",
        repEmail: "bob@site.com",
        role: "Sponsor"
      });
  
      expect(data).toEqual({
        eventName: "Launch",
        repName: "Bob",
        repEmail: "bob@site.com",
        role: "Sponsor"
      });
    });
  
    it("shows validation errors on invalid submit", () => {
      const result = validateForm({
        eventName: "",
        repName: "",
        repEmail: "bademail",
        role: ""
      });
  
      expect(result.isValid).toBe(false);
      expect(result.errors).toEqual({
        eventNameError: "eventName is empty.",
        repNameError: "repName is empty.",
        repEmailError: "Invalid email format.",
        roleError: "Role is not selected."
      });
    });
  
    it("updates signup table from localStorage data", () => {
      const signups = [
        { eventName: "Event 1", repName: "John",  repEmail: "john@example.com",  role: "Organizer" },
        { eventName: "Event 2", repName: "Alice", repEmail: "alice@example.com", role: "Sponsor"   }
      ];
      localStorage.setItem("eventSignups", JSON.stringify(signups));
  
      loadTableFromLocalStorage();
  
      const rows = document.querySelectorAll("#eventTable tbody tr");
      expect(rows.length).toBe(2);
      expect(rows[0].cells[0].textContent).toBe("Event 1");
      expect(rows[1].cells[1].textContent).toBe("Alice");
    });
  
    it("generates correct role summary", () => {
      const signups = [
        { role: "Organizer" },
        { role: "Speaker"   },
        { role: "Sponsor"   },
        { role: "Speaker"   }
      ];
      const summary = generateEventSummary(signups);
      expect(summary).toEqual({ Organizer: 1, Speaker: 2, Sponsor: 1 });
    });
  
    it("deletes a record and updates table + localStorage + summary", () => {
      const signups = [
        { id: 1, eventName: "Event 1", repName: "John", repEmail: "john@example.com", role: "Organizer" },
        { id: 2, eventName: "Event 2", repName: "Jane", repEmail: "jane@example.com", role: "Sponsor"   }
      ];
      localStorage.setItem("eventSignups", JSON.stringify(signups));
  
      loadTableFromLocalStorage();
  
      document.querySelector("#eventTable tbody tr button").click();
  
      expect(document.querySelectorAll("#eventTable tbody tr").length).toBe(1);
  
      const stored = JSON.parse(localStorage.getItem("eventSignups"));
      expect(stored.length).toBe(1);
      expect(stored[0].id).toBe(2);
  
      const summary = generateEventSummary(stored);
      expect(summary).toEqual({ Organizer: 0, Speaker: 0, Sponsor: 1 });
    });
  });
  