import "./dashboard.css";
import { useDispatch } from "react-redux";
import { desloguear } from "../../features/user.slice";
import { useNavigate } from "react-router-dom";
import ListarCelular from "./Celular/ListarCelular";
import AltaCelular from "./Celular/AltaCelular";
import { useTranslation } from "react-i18next";
import ListarAccesorio from "./Accesorio/ListarAccesorio";
import CrearAccesorio from "./Accesorio/CrearAccesorio";
import EditarAccesorio from "./Accesorio/EditarAccesorio";
import EditarCelular from "./Celular/EditarCelular";
import ListarUsuario from "./Usuario/ListarUsuario";
import { useEffect } from "react";
import { toast } from "react-toastify";

const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const actualLenguage = localStorage.getItem("lenguage");

  const cerrarSesion = () => {
    toast.success(<span>{t("logoutSuccess")}</span>);
    dispatch(desloguear());
    navigate("/");
  };

  const changeLenguage = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("lenguage", e.target.value);
  };

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
        console.log(err);
        /* ignore */
      }
    };

    links.forEach((l) => l.addEventListener("click", onClick));
    return () => links.forEach((l) => l.removeEventListener("click", onClick));
  }, []);

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
          <div className="sidebar-brand">{t("title")}</div>
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
            <a href="#section-celulares">{t("homepage")}</a>
            <a href="#section-celulares">{t("cellphones")}</a>
            <a href="#section-accesorios">{t("accesories")}</a>
            <a href="#section-usuarios">{t("Users")}</a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <button className="btn btn-danger btn-sm" onClick={cerrarSesion}>
            {t("logout")}
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-root container mb-5">
          <div id="alerts" />
          {/* Celulares */}
          <section id="section-celulares" className="mb-5">
            <h2>{t("cellphones")}</h2>
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
          {/* Accesorios */}
          <section id="section-accesorios" className="mb-5">
            <h2>{t("accesories")}</h2>
            <div className="row">
              <div className="col-md-4 col-12">
                <CrearAccesorio />
              </div>
              <div className="col-md-8 col-12">
                <ListarAccesorio />
              </div>
              <div className="col-md-12 col-12">
                <EditarAccesorio />
              </div>
            </div>
          </section>
          {/* Usuarios */}
          <section id="section-usuarios" className="mb-5">
            <h2>{t("users")}</h2>
            <div className="row"></div>
            <ListarUsuario />
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardAdmin;
