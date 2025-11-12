import React from "react";
import { Link } from "react-router-dom";
import "./pageLayout.css";

const PageLayout = ({ children }) => {
  return (
    <div className="site-root">
      <header className="site-header">
        <div className="site-header-inner">
          <div className="brand">
            <Link to="/" className="brand-link">
              <span className="brand-logo">◐</span>
              <span className="brand-name">MiTienda</span>
            </Link>
          </div>
          <nav className="site-nav">
            <Link to="/productos">Productos</Link>
            <Link to="/innovacion">Innovación</Link>
            <Link to="/beneficios">Beneficios</Link>
          </nav>
        </div>
      </header>

      <main className="site-main">
        <div className="container-lg">{children}</div>
      </main>

      <footer className="site-footer">
        <div className="container-lg">
          © {new Date().getFullYear()} MiTienda. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
