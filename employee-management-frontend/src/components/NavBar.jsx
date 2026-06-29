import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">

        <Link className="navbar-brand" to="/">
          EMS
        </Link>

        <div className="navbar-nav ms-auto">

          <Link
            className="nav-link text-white"
            to="/dashboard"
          >
            Dashboard
          </Link>

          <Link
            className="nav-link text-white"
            to="/employees"
          >
            Employees
          </Link>

          <Link
            className="nav-link text-white"
            to="/employees/new"
          >
            Add Employee
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
