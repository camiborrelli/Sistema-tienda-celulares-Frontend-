import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./header.css";

const Header = () => {
  useEffect(() => {
    document.body.classList.add("has-header");
    return () => document.body.classList.remove("has-header");
  }, []);

  const location = useLocation();

  return (
    <header className="app-header">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            ObligatorioFS - UI
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMain"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Show nav links only on /dashboard */}
          {location.pathname === "/dashboard" && (
            <div className="collapse navbar-collapse" id="navMain">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link active" href="#section-celulares">
                    Celulares
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#section-accesorios">
                    Accesorios
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#section-usuarios">
                    Usuarios
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
