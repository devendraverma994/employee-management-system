import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

function AddEmployee() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/employees", {
        name,
        email,
        department,
        salary: parseFloat(salary),
      });

      navigate("/employees");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="row justify-content-center">

          <div className="col-md-6">

            <div className="card shadow">

              <div className="card-body">

                <h2 className="text-center mb-4">
                  Add Employee
                </h2>

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label className="form-label">
                      Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Department
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={department}
                      onChange={(e) =>
                        setDepartment(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Salary
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      value={salary}
                      onChange={(e) =>
                        setSalary(e.target.value)
                      }
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    Save Employee
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default AddEmployee;