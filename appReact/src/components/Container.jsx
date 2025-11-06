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

  return <Outlet />;
};

export default Container;
