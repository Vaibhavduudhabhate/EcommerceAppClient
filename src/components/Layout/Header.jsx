import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from '../../Context/auth';
import toast from 'react-hot-toast';

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth, user: null, token: ""
    })
    localStorage.removeItem("auth");
    toast.success("Logout Successfully")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg border-bottom border-body" data-bs-theme="light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><GiShoppingBag /> Ecommerce App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category" className="nav-link">Category</NavLink>
              </li>
              {
                !auth.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link">Register</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">Login</NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink onClick={handleLogout} to="/login" className="nav-link">Logout</NavLink>
                    </li>
                  </>
                )
              }
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth?.user?.name}
                </NavLink>
                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink onClick={handleLogout} to="/login" className="dropdown-item">
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">Cart(0)</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
