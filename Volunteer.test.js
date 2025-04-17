/**
 * @jest-environment jsdom
 */
const {
    calculateTotalHours,
    deleteVolunteerEntry,
    renderVolunteerTable,
    loadVolunteerData
  } = require("./Volunteer_Hours");
  
describe("Volunteer Hours Tracker", () => {
    beforeEach(() => {
      localStorage.clear();
      document.body.innerHTML = `
        <table id="volunteer-table"></table>
        <div id="total-hours"></div>
      `;
    });
  
    test("table updates correctly after adding data to localStorage", () => {
      const data = [
        { charityName: "Charity A", hours: 2, date: "2025-04-15", rating: 4 },
        { charityName: "Charity B", hours: 3, date: "2025-04-16", rating: 5 }
      ];
      localStorage.setItem("volunteerData", JSON.stringify(data));
      renderVolunteerTable();
      const table = document.getElementById("volunteer-table");
      expect(table.innerHTML).toContain("Charity A");
      expect(table.innerHTML).toContain("Charity B");
    });
  
    test("data from localStorage is displayed in table on load", () => {
      const data = [
        { charityName: "Charity C", hours: 1.5, date: "2025-04-10", rating: 3 }
      ];
      localStorage.setItem("volunteerData", JSON.stringify(data));
      loadVolunteerData();
      const table = document.getElementById("volunteer-table");
      expect(table.innerHTML).toContain("Charity C");
    });
  
    test("calculateTotalHours returns correct total", () => {
      const data = [
        { hours: 1 },
        { hours: 2.5 },
        { hours: 3 }
      ];
      const total = calculateTotalHours(data);
      expect(total).toBe(6.5);
    });
  
    test("deleting an entry updates localStorage and table", () => {
      const data = [
        { charityName: "Charity X", hours: 2, date: "2025-04-14", rating: 4 },
        { charityName: "Charity Y", hours: 1, date: "2025-04-15", rating: 5 }
      ];
      localStorage.setItem("volunteerData", JSON.stringify(data));
      renderVolunteerTable();
      deleteVolunteerEntry(0); // remove first entry
      const updatedData = JSON.parse(localStorage.getItem("volunteerData"));
      expect(updatedData.length).toBe(1);
      expect(updatedData[0].charityName).toBe("Charity Y");
    });
  
    test("total hours update correctly after deletion", () => {
      const data = [
        { hours: 2 },
        { hours: 3 }
      ];
      localStorage.setItem("volunteerData", JSON.stringify(data));
      renderVolunteerTable();
      deleteVolunteerEntry(0); // delete one entry
      const totalEl = document.getElementById("total-hours");
      expect(totalEl.textContent).toContain("3");
    });
  });
  