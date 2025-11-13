import "./dashboard.css";
import { useDispatch } from "react-redux";
import { desloguear } from "../../features/user.slice";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

// useEffect imported above with useState
import { toast } from "react-toastify";
import Celulares from "./Celular/Celulares";

const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const actualLenguage = localStorage.getItem("lenguage");
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // default open on wide screens, collapsed on small screens
    try {
      return window.innerWidth > 768;
    } catch (e) {
      return true;
    }
  });

  const cerrarSesion = () => {
    toast.success(<span>{t("logoutSuccess")}</span>);
    dispatch(desloguear());
    navigate("/");
  };

  const changeLenguage = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("lenguage", e.target.value);
  };

  const location = useLocation();

  useEffect(() => {
    try {
      const mobile = window.innerWidth <= 768;
      if (mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    } catch (err) {}
  }, [location.pathname, location.hash]);

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
        toast.error(`Error updating URL hash: ${err}`);
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
  const isPerfilActive =
    pathname === "/dashboard/perfil" ||
    (isDashboardRoot && hash === "#section-perfil");
  const isInformeActive =
    pathname === "/dashboard/informe" ||
    (isDashboardRoot && hash === "#section-informe");

  return (
    <div className="dashboard-layout">
      <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">{t("title")}</div>
          <select
            onChange={changeLenguage}
            defaultValue={actualLenguage}
            className="language-select"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>

        <ul className="sidebar-nav">
          <li>
            <Link
              className={`${
                isCelularesActive ? "active" : ""
              } nav-color-cellphones`}
              to="/dashboard/celulares"
            >
              {t("cellphones")}
            </Link>
            <Link
              className={`${isAccesoriosActive ? "active" : ""} nav-color-plus`}
              to="/dashboard/accesorios"
            >
              {t("accessories")}
            </Link>
            <Link
              className={`${isUsuariosActive ? "active" : ""}`}
              to="/dashboard/usuarios"
            >
              {t("users")}
            </Link>

            <Link
              className={`${isPerfilActive ? "active" : ""}`}
              to="/dashboard/perfil"
            >
              {t("profile")}
            </Link>

            <Link
              className={`${isInformeActive ? "active" : ""} nav-color-premium`}
              to="/dashboard/informe"
            >
              {t("reportAccessories")}
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <button className="btn-logout" onClick={cerrarSesion}>
            {t("logout")}
          </button>
        </div>
      </aside>
      <main className="dashboard-main">
        {/* Toggle button only visible on small screens */}
        <button
          className="sidebar-toggle"
          aria-label={
            sidebarOpen
              ? t("close") || "Close sidebar"
              : t("open") || "Open sidebar"
          }
          onClick={() => setSidebarOpen((s) => !s)}
        >
          <span className="hamburger" aria-hidden />
        </button>
        {sidebarOpen && (
          <div
            className="overlay-sidebar"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div className="dashboard-root container mb-5">
          {isDashboardRoot ? (
            <>
              <div id="alerts" />

              {/* Celulares */}
              <Celulares />
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardAdmin;
