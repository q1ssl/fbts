import React, { useState, useEffect } from 'react';
import api from '../../api';

const EmployeeDataExample = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    employee_name: '',
    designation: '',
    department: ''
  });

  // 1. Fetch all employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // 2. Get list of employees with specific fields
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const options = {
        fields: ['name', 'employee_name', 'designation', 'department', 'status', 'creation'],
        filters: [['status', '=', 'Active']],
        orderBy: {
          field: 'employee_name',
          order: 'asc'
        },
        limit: 50
      };
      
      const employeeList = await api.getDocList('Employee', options);
      setEmployees(employeeList);
      console.log('✅ Fetched employees:', employeeList);
    } catch (error) {
      console.error('❌ Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Get single employee details
  const fetchEmployeeDetails = async (employeeId) => {
    try {
      const employee = await api.getDoc('Employee', employeeId);
      setSelectedEmployee(employee);
      console.log('✅ Employee details:', employee);
    } catch (error) {
      console.error('❌ Error fetching employee details:', error);
    }
  };

  // 4. Create new employee
  const createEmployee = async () => {
    try {
      const employeeData = {
        ...newEmployee,
        status: 'Active',
        company: 'Your Company'  // Required field
      };
      
      const created = await api.createDoc('Employee', employeeData);
      console.log('✅ Created employee:', created);
      
      // Refresh list
      fetchEmployees();
      
      // Reset form
      setNewEmployee({
        employee_name: '',
        designation: '',
        department: ''
      });
    } catch (error) {
      console.error('❌ Error creating employee:', error);
    }
  };

  // 5. Update employee designation
  const updateEmployeeDesignation = async (employeeId, newDesignation) => {
    try {
      const updated = await api.updateDoc('Employee', employeeId, {
        designation: newDesignation
      });
      console.log('✅ Updated employee:', updated);
      
      // Refresh list
      fetchEmployees();
    } catch (error) {
      console.error('❌ Error updating employee:', error);
    }
  };

  // 6. Get employee count
  const getEmployeeCount = async () => {
    try {
      const count = await api.getCount('Employee', [['status', '=', 'Active']]);
      alert(`Active employees: ${count}`);
    } catch (error) {
      console.error('❌ Error getting employee count:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Employee Data Management with Frappe-JS-SDK</h1>
      
      {/* Header Actions */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={fetchEmployees} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh Employees'}
        </button>
        <button onClick={getEmployeeCount}>
          Get Employee Count
        </button>
      </div>

      {/* Create New Employee Form */}
      <div style={{ 
        border: '1px solid #ccc', 
        padding: '15px', 
        marginBottom: '20px',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9'
      }}>
        <h3>Create New Employee</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Employee Name"
            value={newEmployee.employee_name}
            onChange={(e) => setNewEmployee({...newEmployee, employee_name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Designation"
            value={newEmployee.designation}
            onChange={(e) => setNewEmployee({...newEmployee, designation: e.target.value})}
          />
          <input
            type="text"
            placeholder="Department"
            value={newEmployee.department}
            onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
          />
          <button onClick={createEmployee}>Create</button>
        </div>
      </div>

      {/* Employee List */}
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Left Panel - Employee List */}
        <div style={{ flex: 1 }}>
          <h3>Employee List ({employees.length})</h3>
          {loading ? (
            <p>Loading employees...</p>
          ) : (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {employees.map((employee) => (
                <div 
                  key={employee.name}
                  style={{ 
                    border: '1px solid #ddd', 
                    padding: '10px', 
                    marginBottom: '10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    backgroundColor: selectedEmployee?.name === employee.name ? '#e3f2fd' : 'white'
                  }}
                  onClick={() => fetchEmployeeDetails(employee.name)}
                >
                  <strong>{employee.employee_name}</strong>
                  <br />
                  <small>
                    {employee.designation} - {employee.department}
                    <br />
                    ID: {employee.name}
                  </small>
                  <br />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const newDesignation = prompt('Enter new designation:', employee.designation);
                      if (newDesignation) {
                        updateEmployeeDesignation(employee.name, newDesignation);
                      }
                    }}
                    style={{ marginTop: '5px', fontSize: '12px' }}
                  >
                    Update Designation
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Panel - Employee Details */}
        <div style={{ flex: 1 }}>
          <h3>Employee Details</h3>
          {selectedEmployee ? (
            <div style={{ 
              border: '1px solid #ddd', 
              padding: '15px', 
              borderRadius: '5px',
              backgroundColor: '#f5f5f5'
            }}>
              <h4>{selectedEmployee.employee_name}</h4>
              <p><strong>ID:</strong> {selectedEmployee.name}</p>
              <p><strong>Designation:</strong> {selectedEmployee.designation || 'Not set'}</p>
              <p><strong>Department:</strong> {selectedEmployee.department || 'Not set'}</p>
              <p><strong>Status:</strong> {selectedEmployee.status}</p>
              <p><strong>Company:</strong> {selectedEmployee.company}</p>
              <p><strong>Created:</strong> {new Date(selectedEmployee.creation).toLocaleDateString()}</p>
              
              {/* Show custom fields if any */}
              <details style={{ marginTop: '10px' }}>
                <summary>All Fields (JSON)</summary>
                <pre style={{ fontSize: '10px', maxHeight: '200px', overflow: 'auto' }}>
                  {JSON.stringify(selectedEmployee, null, 2)}
                </pre>
              </details>
            </div>
          ) : (
            <p>Click on an employee to see details</p>
          )}
        </div>
      </div>

      {/* DocType Examples */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h3>📚 Other DocType Examples</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
          <button onClick={() => api.getDocList('User').then(console.log)}>
            Get Users
          </button>
          <button onClick={() => api.getDocList('Company').then(console.log)}>
            Get Companies  
          </button>
          <button onClick={() => api.getDocList('Department').then(console.log)}>
            Get Departments
          </button>
          <button onClick={() => api.getDocList('Designation').then(console.log)}>
            Get Designations
          </button>
          <button onClick={() => api.getDocList('Leave Type').then(console.log)}>
            Get Leave Types
          </button>
          <button onClick={() => api.getDocList('Holiday List').then(console.log)}>
            Get Holiday Lists
          </button>
        </div>
        <p style={{ fontSize: '12px', marginTop: '10px' }}>
          💡 Check browser console for API responses
        </p>
      </div>
    </div>
  );
};

export default EmployeeDataExample;