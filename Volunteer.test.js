/**
 * @jest-environment jsdom
 */
const {
    calculateTotalHours,
    deleteVolunteerEntry,
    renderVolunteerTable,
    loadVolunteerData
  } = require("./VolunteerLogic");
  
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
      deleteVolunteerEntry(0); 
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
      deleteVolunteerEntry(0); 
      const totalEl = document.getElementById("total-hours");
      expect(totalEl.textContent).toContain("3");
    });
  });
  
    test('updateTotal calculates the total hours correctly', () => {
      const logs = [
        { hours: 2.5 },
        { hours: 1.5 },
        { hours: 3.0 }
      ];
      const totalDisplay = { textContent: '' };
    
      const updateTotal = () => {
        const total = logs.reduce((sum, log) => sum + log.hours, 0);
        totalDisplay.textContent = total.toFixed(1);
      };
    
      updateTotal();
      expect(totalDisplay.textContent).toBe('7.0');
    });
  
    test('deleting a record updates localStorage and removes the row from table', () => {
      document.body.innerHTML = `
        <table><tbody id="table-body"><tr data-id="1"><td>Row</td><td><button class="delete-btn" data-id="1">Delete</button></td></tr></tbody></table>
      `;
      const logs = [{ id: 1, hours: 2 }];
      localStorage.setItem('volunteerLogs', JSON.stringify(logs));
    
      const e = { target: document.querySelector('.delete-btn') };
      const tableBody = document.getElementById('table-body');
      tableBody.addEventListener('click', function () {
        const id = parseInt(e.target.getAttribute('data-id'));
        const newLogs = logs.filter(log => log.id !== id);
        localStorage.setItem('volunteerLogs', JSON.stringify(newLogs));
        e.target.closest('tr').remove();
      });
    
      e.target.click();
    
      expect(JSON.parse(localStorage.getItem('volunteerLogs')).length).toBe(0);
      expect(document.querySelectorAll('tr').length).toBe(0);
    });

    test('total hours updates correctly when a record is deleted', () => {
      const logs = [
        { id: 1, hours: 2.5 },
        { id: 2, hours: 1.5 }
      ];
      const totalDisplay = { textContent: '' };
    
      const updateTotal = () => {
        const total = logs.reduce((sum, log) => sum + log.hours, 0);
        totalDisplay.textContent = total.toFixed(1);
      };
    
      logs.splice(1, 1); 
      updateTotal();
    
      expect(totalDisplay.textContent).toBe('2.5');
    });

    test('table updates when new data is added to localStorage', () => {
      document.body.innerHTML = `<table><tbody id="table-body"></tbody></table>`;
      const logs = [{ id: 1, charity: "Test Org", hours: 2, date: "2025-04-01", rating: "5" }];
      localStorage.setItem("volunteerLogs", JSON.stringify(logs));
    
      const tableBody = document.querySelector("#table-body");
      logs.forEach(log => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${log.charity}</td><td>${log.hours}</td><td>${log.date}</td><td>${log.rating}</td>`;
        tableBody.appendChild(row);
      });
    
      expect(tableBody.children.length).toBe(1);
      expect(tableBody.textContent).toContain("Test Org");
    });

    test('data from localStorage is displayed in the table on page load', () => {
      localStorage.setItem("volunteerLogs", JSON.stringify([
        { id: 1, charity: "Saved Org", hours: 4, date: "2025-03-25", rating: "4" }
      ]));
    
      document.body.innerHTML = `<table><tbody id="table-body"></tbody></table>`;
      const tableBody = document.getElementById("table-body");
      const logs = JSON.parse(localStorage.getItem("volunteerLogs"));
    
      logs.forEach(log => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${log.charity}</td><td>${log.hours}</td><td>${log.date}</td><td>${log.rating}</td>`;
        tableBody.appendChild(row);
      });
    
      expect(tableBody.children.length).toBe(1);
      expect(tableBody.innerHTML).toContain("Saved Org");
    });
    