import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  
  
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
    }
  };

return (
  <div className="container">
    <div
      className="row justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="col-md-4">

        <div className="card shadow">
          <div className="card-body">

            <h2 className="text-center mb-4">
              Employee Management System
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div className="mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Login
              </button>

            </form>

          </div>
        </div>

      </div>
    </div>
  </div>
);}

export default Login;