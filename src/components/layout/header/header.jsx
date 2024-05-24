import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import { useCart } from "../../../context/cart";
import { LuShoppingCart } from "react-icons/lu";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { Badge } from "antd";
import { useSelector } from "react-redux";

function Header() {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const hasCheckedOut = useSelector((state) => state.checkout.hasCheckedOut);

  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
   
    localStorage.removeItem("auth");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <LuShoppingCart size={25} /> E-MART
            </Link>
            <ul
              className="navbar-nav ms-auto mb-2 mb-lg-0"
              style={{ marginRight: "10px", marginTop: "10px" }}
            >
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link" href="#">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" href="#">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <div
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FaUserCircle size={25} />
                    </div>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink to="/profile" className="dropdown-item">
                          Profile
                        </NavLink>
                      </li>
                      {hasCheckedOut && (
                        <li>
                          <NavLink to="/dashboard" className="dropdown-item">
                            Dashboard
                          </NavLink>
                        </li>
                      )}
                      <li>
                        <NavLink
                          onClick={handleLogOut}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Badge count={cart?.length} showZero>
                      <NavLink to="/cart" className="nav-link" href="#">
                        <HiOutlineShoppingCart size={25} />
                      </NavLink>
                    </Badge>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
