import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

function Employees() {

  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / 5);

  useEffect(() => {
    console.log("Current Page:", page);
    fetchEmployees();
  }, [page, search]);

  const fetchEmployees = async () => {
    try {
      const response =
        await api.get(
          `/employees?page=${page}&limit=10&search=${search}`
        );

      setEmployees(
        response.data.employees
      );
      setTotal(response.data.total);

    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(
        `/employees/${id}`
      );

      fetchEmployees();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Employees</h1>

          <input
            className="form-control w-25"
            type="text"
            placeholder="Search Employee"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(employee => (
            <tr key={employee.ID}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>

              <td>
                <button
                  onClick={() =>
                    navigate(`/employees/${employee.ID}/edit`)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(employee.ID)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.ID}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() =>
                    navigate(`/employees/${employee.ID}/edit`)
                  }
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleDelete(employee.ID)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center mt-3">

        <button
          className="btn btn-secondary me-2"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span className="align-self-center">
          Page {page}
        </span>

        <button
          className="btn btn-secondary ms-2"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>
    </>
  );
}

export default Employees;