import "./dashboard.css";
import { useDispatch } from "react-redux";
import { desloguear } from "../../features/user.slice";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import ListarCelular from "./Celular/ListarCelular";
import AltaCelular from "./Celular/AltaCelular";
import { useTranslation } from "react-i18next";
import EditarCelular from "./Celular/EditarCelular";
import ListarUsuario from "./Usuario/ListarUsuario";
import ListarAccesorio from "./Accesorio/ListarAccesorio";
import CrearAccesorio from "./Accesorio/CrearAccesorio";
import EditarAccesorio from "./Accesorio/EditarAccesorio";
import { useEffect } from "react";

const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const actualLenguage = localStorage.getItem("lenguage");

  const cerrarSesion = () => {
    dispatch(desloguear());
    navigate("/");
  };

  const changeLenguage = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("lenguage", e.target.value);
  };

  const location = useLocation();

  // Smooth scrolling behavior for sidebar anchors — scrolls the .dashboard-root container
  useEffect(() => {
    const container = document.querySelector(".dashboard-root");
    if (!container) return;

    const links = Array.from(
      document.querySelectorAll(".sidebar-nav a[href^='#']")
    );
    const onClick = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const top = targetRect.top - containerRect.top + container.scrollTop;

      container.scrollTo({ top, behavior: "smooth" });
      // update hash without default jump
      try {
        history.replaceState(null, "", `#${id}`);
      } catch (err) {
        /* ignore */
      }
    };

    links.forEach((l) => l.addEventListener("click", onClick));
    return () => links.forEach((l) => l.removeEventListener("click", onClick));
  }, []);

  // compute if we are at the base dashboard route (show inline sections) or at a child route
  const pathname = location.pathname.replace(/\/+$/g, "");
  const hash = location.hash || "";
  const isDashboardRoot = pathname === "/dashboard" || pathname === "";

  // active link helpers
  const isCelularesActive =
    pathname === "/dashboard" ||
    pathname === "/dashboard/celulares" ||
    (isDashboardRoot && hash === "#section-celulares");
  const isAccesoriosActive =
    pathname === "/dashboard/accesorios" ||
    (isDashboardRoot && hash === "#section-accesorios");
  const isUsuariosActive =
    pathname === "/dashboard/usuarios" ||
    (isDashboardRoot && hash === "#section-usuarios");

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div
          className="sidebar-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <div className="sidebar-brand">Mi App</div>
          <select
            onChange={changeLenguage}
            defaultValue={actualLenguage}
            style={{ maxWidth: 140 }}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>

        <ul className="sidebar-nav">
          <li>
            <Link className={isCelularesActive ? "active" : ""} to="/dashboard">
              Inicio
            </Link>
            <Link
              className={isCelularesActive ? "active" : ""}
              to="/dashboard/celulares"
            >
              Celulares
            </Link>
            <Link
              className={isAccesoriosActive ? "active" : ""}
              to="/dashboard/accesorios"
            >
              Accesorios
            </Link>
            <Link
              className={isUsuariosActive ? "active" : ""}
              to="/dashboard/usuarios"
            >
              Usuarios
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <button className="btn btn-danger btn-sm" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-root container mb-5">
          {isDashboardRoot ? (
            <>
              <div id="alerts" />

              {/* Celulares */}
              <section id="section-celulares" className="mb-5">
                <h2>Celulares</h2>
                <div className="row">
                  <div className="col-md-4 col-12">
                    <AltaCelular />
                  </div>
                  <div className="col-md-8 col-12">
                    <ListarCelular />
                  </div>
                  <div className="col-md-12 col-12">
                    <EditarCelular />
                  </div>
                </div>
              </section>

              {/* Usuarios */}
              <section id="section-usuarios" className="mb-5">
                <h2>Usuarios</h2>
                <div className="row"></div>
                <ListarUsuario />
              </section>
            </>
          ) : (
            /* render child routes such as /dashboard/accesorios */
            <Outlet />
          )}
        </div>
        <footer className="text-center py-3 bg-light">
          Panel de pruebas - front estático
        </footer>
      </main>
    </div>
  );
};

export default DashboardAdmin;
