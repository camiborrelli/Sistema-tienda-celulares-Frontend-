import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, NavLink, useNavigate } from "react-router";
import { desloguear } from "../features/user.slice";
import { useTranslation } from "react-i18next";

const Container = () => {
  const { t, i18n } = useTranslation();
  const logueado = useSelector((state) => state.user.logged);
  const actualLenguage = localStorage.getItem("lenguage");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cerrarSesion = () => {
    localStorage.clear();
    dispatch(desloguear());
    navigate("/");
  };

  const changeLenguage = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("lenguage", e.target.value);
  };

  return (
    <>
      <header className="main-header">
        <div className="header-content">
          <Link to={"/"} className="app-logo">
            🌤️<span>{t("name")}</span>
          </Link>

          <nav>
            <NavLink to={"/"}>Login</NavLink>
            <NavLink to={"/register"}>Registrarse</NavLink>
            <NavLink to={"/dashboard"}>Dashboard</NavLink>
          </nav>

          {/* Select para cambiar el idioma de la aplicacion */}
          <select onChange={changeLenguage} defaultValue={actualLenguage}>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>

          {logueado && (
            <button
              className="logout-btn"
              onClick={cerrarSesion}
              title="Cerrar sesión"
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          )}
        </div>
      </header>

      <Outlet />
    </>
  );
};

export default Container;
