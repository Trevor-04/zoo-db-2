import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../App.css";
import "../index.css";
// import "./employeeTable.css";

const { url } = require('../config.json')[process.env.NODE_ENV];
let itemsPerPage = 10;

function EmployeeTable() {
    const [employeeData, setEmployeeData] = useState([]);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1); // Pagination
    const [employeeSearchTerm, setEmployeeSearchTerm] = useState("");

    //add employee form 
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [newFName, setFName] = useState('');
    const [newMName, setMName] = useState('');
    const [newLName, setLName] = useState('');
    const [newEmail, setEmail] = useState('');
    const [newNumber, setNumber] = useState('');
    const [newGender, setGender] = useState('');
    const [newSalary, setSalary] = useState('');
    const [newDepartment, setDepartment] = useState('');
    const [newSupervisor, setSupervisor] = useState('');
    const [startDate, setStartDate] = useState('');

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      setFName(selectedEmployee.fName || '');
      setMName(selectedEmployee.mName || '');
      setLName(selectedEmployee.lName || '');
      setEmail(selectedEmployee.email || '');
      setNumber(selectedEmployee.phone || '');
      setGender(selectedEmployee.gender || '');
      setSalary(selectedEmployee.salary || '');
      setDepartment(selectedEmployee.departmentID || '');
      setSupervisor(selectedEmployee.supervisorID || '');
      setStartDate(selectedEmployee.start_on || new Date().toISOString().split("T")[0]);
    }
  }, [selectedEmployee]);


function clearForm() {
  setFName('');
  setMName('');
  setLName('');
  setEmail('');
  setNumber('');
  setGender('');
  setSalary('');
  setDepartment('');
  setSupervisor('');
  setStartDate(new Date());
}

const handleAddEmployee = async (e) => {
    e.preventDefault();
    const newEmployee = {
        fName: newFName,
        mName: newMName || null,
        lName: newLName,
        email: newEmail,
        phone: newNumber,
        gender: newGender,
        salary: newSalary,
        departmentID: newDepartment,
        supervisorID: newSupervisor || null,
        start_on: new Date(startDate).toISOString().split("T")[0]
    };

    try {
        await axios.post(`${url}/employees/add`, newEmployee, {
          // headers: { Authorization: `Bearer ${token}` }
        });;
        clearForm();
        setIsAddModalOpen(false);
        fetchEmployeeData(); // Refresh the employee list
    } catch (error) {
        console.error("Error adding employee", error);
        alert("Failed to add employee.");
        throw error;
    }
};

const handleEditEmployee = async (e) => {
  e.preventDefault();

  const updatedEmployee = {
      employeeID: selectedEmployee.employeeID,
      fName: newFName,
      mName: newMName || null,
      lName: newLName,
      email: newEmail,
      phone: newNumber,
      gender: newGender,
      salary: newSalary,
      departmentID: newDepartment,
      supervisorID: newSupervisor || null,
      start_on: new Date(startDate).toISOString().split("T")[0]
  };

  try {
      await axios.put(`${url}/employees/edit`, updatedEmployee, {
        // headers: { Authorization: `Bearer ${token}` }
      });;
      clearForm();
      setIsEditModalOpen(false);
      fetchEmployeeData(); // Refresh the employee list
  } catch (error) {
      console.error("Error editing employee", error);
      alert("Failed to edit employee.");
  }
};

  // Formatting name and supervisor
  const formatName = (employee) => {
    return `${employee.fName} ${employee.mName || ""} ${employee.lName}`.trim();
  };

  const formatSupervisor = (supervisorID) => {
    const supervisor = employeeData.find((emp) => emp.employeeID === supervisorID);
    return supervisor ? formatName(supervisor) : "N/A";
  };

  const fetchEmployeeData = async () => {
    try {
        const response = await axios.get(`${url}/employees/`);
        if (response.status !== 200) throw new Error("Failed to fetch employee data");
        setEmployeeData(response.data);
      } catch (error) {
        console.error(error);
        throw error;
    }

  }

const handleEditEmployeeOptions = async (employeeID) => {
  const emp = await axios.get(`${url}/employees/${employeeID}`);
  if (!emp.data) return alert("Error finding that employee");
  setSelectedEmployee(emp.data);
  setIsEditModalOpen(true);
}

const closeEditEmployeeOptions = async () => {
  clearForm();
  setIsEditModalOpen(false)
}

  const handleHeaderClick = (field) => {
    setSortField(field);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  async function deleteEmployee(employeeID) {
    try {
      if (!window.confirm("Are you sure you want to delete this employee?")) return;
        await axios.delete(`${url}/employees/${employeeID}`);

        alert(`Successfully deleted employee ${employeeID}`);
        fetchEmployeeData();
    } catch (err) {
        console.error(err);
        alert(`Failed to delete employee ${employeeID}`);
        throw err;
    }
  }
  
  async function updateEmployee(employeeID) {
    try {
        await axios.put(`${url}/employees/${employeeID}`, {
          fName: newFName,
          mName: newMName || null,
          lName: newLName,
          email: newEmail,
          phone: newNumber,
          gender: newGender,
          salary: newSalary,
          departmentID: newDepartment,
          supervisorID: newSupervisor || null,
          start_on: startDate
        });

        alert(`Successfully updated employee ${employeeID}`);
        fetchEmployeeData();
    } catch (err) {
        console.error(err);
        alert(`Failed to update employee ${employeeID}`);
        throw err;
    }
  }

  const sortedData = React.useMemo(() => {
    if (!sortField) return employeeData;
    const sorted = [...employeeData].sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1;
      if (a[sortField] > b[sortField]) return 1;
      return 0;
    });
    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [employeeData, sortField, sortDirection]);

  const filteredData = sortedData?.filter((employee) => {
    const employeeMatches =
      formatName(employee) // Call formatName as a function with employee as an argument
        .toString()
        .toLowerCase()
        .includes(employeeSearchTerm.toLowerCase());
        // console.log(employeeMatches)
    return employeeMatches;
  });
// const filteredData = [];

const totalItems = filteredData ? filteredData.length : 0;
const totalPages = Math.ceil(totalItems / itemsPerPage);
const paginatedData = filteredData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
const handlePageChange = (page) => setCurrentPage(page);

  return (
    <main className="min-h-screen bg-[#EFEDE5] w-screen flex justify-center">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl text-center mb-6 mt-24 text-[#313639]">Employee Table</h1>
            <div className="flex justify-center my-4">
            <input
                type="text"
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                value={employeeSearchTerm || ""}
                onChange={(e) => setEmployeeSearchTerm(e.target.value)}
                placeholder="Search by employee"
            />
            </div>
            <div className="flex justify-center my-4">
              <button
                  className="ml-4 px-4 py-2 bg-[#8AA686] text-white rounded"
                  onClick={() => setIsAddModalOpen(true)}
              >
                  Add Employee
              </button>
            </div>
        {/* Employee Data Table */}
        <table className="divide-y divide-gray-300 w-full text-center bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
           <tr>
              <th onClick={() => handleHeaderClick("fName")}>Employee Name</th>
              <th onClick={() => handleHeaderClick("email")}>Email</th>
              <th onClick={() => handleHeaderClick("phone")}>Phone Number</th>
              <th onClick={() => handleHeaderClick("salary")}>Salary</th>
              <th onClick={() => handleHeaderClick("department")}>Department</th>
              <th onClick={() => handleHeaderClick("supervisorID")}>Supervisor</th>
              <th onClick={() => handleHeaderClick("start_on")}>Start Date</th>
              <th>Manage Employee</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((employee, index) => (
              <tr key={index} className="text-gray-700 hover:bg-gray-100">
                <td className="px-4 py-2 border">{formatName(employee)}</td>
                <td className="px-4 py-2 border">{employee.email}</td>
                <td className="px-4 py-2 border">{employee.phone}</td>
                <td className="px-4 py-2 border">${employee.salary}</td>
                <td className="px-4 py-2 border">{employee.departmentName}</td>
                <td className="px-4 py-2 border">{formatSupervisor(employee.supervisorID)}</td>
                <td className="px-4 py-2 border">{new Date(employee.start_on).toISOString().split("T")[0]}</td>
                <td className="px-4 py-2 border">
                <button 
                  className="bg-[#8AA686] text-white py-2 px-4 rounded hover:bg-[#6C8A5E]"
                  onClick={() => handleEditEmployeeOptions(employee.employeeID)}>
                    Edit</button>
                  <button 
                  className="bg-[#8AA686] text-white py-2 px-4 rounded hover:bg-[#6C8A5E]"
                  onClick={() => deleteEmployee(employee.employeeID)}>
                    Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4 space-x-2">
            <button onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} className={`px-3 py-1 border rounded-md ${currentPage === 1 ? "bg-[#8AA686] text-white opacity-50" : "bg-[#8AA686] text-white hover:bg-[#6C8A5E]"}`} disabled={currentPage === 1}>
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => handlePageChange(i + 1)} className={`px-3 py-1 border rounded-md ${currentPage === i + 1 ? "bg-[#8AA686] text-white" : "bg-[#8AA686] text-white hover:bg-[#6C8A5E]"}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? "bg-[#8AA686] text-white opacity-50" : "bg-[#8AA686] text-white hover:bg-[#6C8A5E]"}`} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
              {isAddModalOpen && (
        <div className="modal">
            <div className="modal-content">
                <h3>Add New Employee</h3>
                <form onSubmit={handleAddEmployee}>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input type="text" value={newFName} onChange={(e) => setFName(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Middle Name:</label>
                        <input type="text" value={newMName} onChange={(e) => setMName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Last Name:</label>
                        <input type="text" value={newLName} onChange={(e) => setLName(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" value={newEmail} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input type="text" value={newNumber} onChange={(e) => setNumber(e.target.value)} required maxLength="12"/>
                    </div>

                    <div className="form-group">
                        <label>Gender:</label>
                        <input type="text" value={newGender} onChange={(e) => setGender(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Salary:</label>
                        <input type="number" value={newSalary} onChange={(e) => setSalary(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Department:</label>
                        <input type="text" value={newDepartment} onChange={(e) => setDepartment(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Supervisor:</label>
                        <input type="text" value={newSupervisor} onChange={(e) => setSupervisor(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Start Date:</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                    </div>

                    <div className="form-buttons">
                        <button type="submit" className="submit-button">Add Employee</button>
                        <button type="button" onClick={() => setIsAddModalOpen(false)} className="close-button">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )}

{isEditModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <h3>Edit Employee</h3>
      <form onSubmit={handleEditEmployee}>
      <div className="form-group">
  <label>First Name:</label>
  <input
    type="text"
    value={newFName} // Use the state variable
    onChange={(e) => setFName(e.target.value)} // Update the state on change
    required
  />
</div>
<div className="form-group">
  <label>Middle Name:</label>
  <input
    type="text"
    value={newMName}
    onChange={(e) => setMName(e.target.value)}
  />
</div>
<div className="form-group">
  <label>Last Name:</label>
  <input
    type="text"
    value={newLName}
    onChange={(e) => setLName(e.target.value)}
    required
  />
</div>
<div className="form-group">
  <label>Email:</label>
  <input
    type="email"
    value={newEmail}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
</div>
<div className="form-group">
  <label>Phone Number:</label>
  <input
    type="text"
    value={newNumber}
    onChange={(e) => setNumber(e.target.value)}
    required
    maxLength="12"
  />
</div>
<div className="form-group">
  <label>Gender:</label>
  <input
    type="text"
    value={newGender}
    onChange={(e) => setGender(e.target.value)}
    required
  />
</div>
<div className="form-group">
  <label>Salary:</label>
  <input
    type="number"
    value={newSalary}
    onChange={(e) => setSalary(e.target.value)}
    required
  />
</div>
<div className="form-group">
  <label>Department:</label>
  <input
    type="text"
    value={newDepartment}
    onChange={(e) => setDepartment(e.target.value)}
    required
  />
</div>
<div className="form-group">
  <label>Supervisor:</label>
  <input
    type="text"
    value={newSupervisor}
    onChange={(e) => setSupervisor(e.target.value)}
  />
</div>
<div className="form-group">
  <label>Start Date:</label>
    <input
    type="date"
    value={
      startDate 
        ? new Date(startDate).toISOString().split("T")[0] // If startDate is valid, format it
        : "" // Fallback to an empty string
    }
    onChange={(e) => setStartDate(e.target.value)}
    required
  />
</div>
        <div className="form-buttons">
          <button type="submit" className="submit-button">Save Changes</button>
          <button type="button" onClick={() => closeEditEmployeeOptions()} className="close-button">Cancel</button>
        </div>
      </form>
    </div>
  </div>
)}
      </div>
    </main>
  );
}

export default EmployeeTable;