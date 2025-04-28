import React, { useState, useEffect } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);

  const EMPLOYEES_PER_PAGE = 10;

  useEffect(() => {
    fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("failed to fetch data");
        setError(true);
      });
  }, []);

  const totalPages = Math.ceil(employees.length / EMPLOYEES_PER_PAGE);

  const indexOfLastEmployee = currentPage * EMPLOYEES_PER_PAGE;
  const indexOfFirstEmployee = indexOfLastEmployee - EMPLOYEES_PER_PAGE;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Employee Data</h1>

      <table border="1" width="100%" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;

