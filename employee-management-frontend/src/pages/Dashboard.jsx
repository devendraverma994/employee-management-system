import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import api from "../api/axios";

function Dashboard() {
  const [data, setData] =
    useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response =
        await api.get("/dashboard");

      setData(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h1 className="mb-4">
          Dashboard
        </h1>

        {data && (
          <div className="row">

            <div className="col-md-4 mb-3">
              <div className="card text-bg-primary shadow">
                <div className="card-body text-center">
                  <h5 className="card-title">
                    Total Employees
                  </h5>

                  <h1>
                    {data.TotalEmployees}
                  </h1>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card text-bg-success shadow">
                <div className="card-body text-center">
                  <h5 className="card-title">
                    IT Employees
                  </h5>

                  <h1>
                    {data.ITEmployees}
                  </h1>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card text-bg-warning shadow">
                <div className="card-body text-center">
                  <h5 className="card-title">
                    HR Employees
                  </h5>

                  <h1>
                    {data.HREmployees}
                  </h1>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </>
  );

}


export default Dashboard;