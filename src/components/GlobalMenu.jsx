import React from "react";
import { NavLink } from "react-router-dom";
import "./GlobalMenu.css";

const GlobalMenu = () => {
  return (
    <nav className="global-menu" aria-label="Global navigation">
      <ul>
        <li>
          <NavLink
            to="/ninios/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Gurises
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/perfil"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Perfil
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default GlobalMenu;
