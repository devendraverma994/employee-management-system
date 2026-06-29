import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/NavBar";

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");  
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
 
  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await api.get(
        `/employees/${id}`
      );

      setName(response.data.name);
      setEmail(response.data.email);
      setDepartment(response.data.department);
      setSalary(response.data.salary);

    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await api.put(
        `/employees/${id}`,
        {
          name,
          email,
          department,
          salary: parseFloat(salary),
        }
      );

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
                  Edit Employee
                </h2>

                <form onSubmit={handleUpdate}>

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
                    className="btn btn-warning w-100"
                  >
                    Update Employee
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

export default EditEmployee;



