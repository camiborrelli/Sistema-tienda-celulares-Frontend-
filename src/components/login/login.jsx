import { useEffect } from "react";
import "./login.css";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { desloguear, loguear } from "../../features/user.slice";
import { toast } from "react-toastify";
import api from "../../data/api";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { loginUsuarioSchema } from "../../validators/usuario.validator";
import { joiResolver } from "@hookform/resolvers/joi";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(loginUsuarioSchema),
    mode: "onChange",
    defaultValues: { username: "", password: "" },
  });

  const ingresar = (data) => {
    api
      .post("usuarios/login", data, { skipAuth: true })
      .then((response) => {
        dispatch(loguear(response.data.token));
        toast.success(t("loginSuccess"), { autoClose: 2000 });
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const validarTokenUsuario = () => {
    api
      .post("usuarios/token")
      .then(() => {
        dispatch(loguear(localStorage.getItem("Token")));
        navigate("/dashboard");
      })
      .catch(() => {
        dispatch(desloguear());
        navigate("/");
      });
  };

  useEffect(() => {
    document.body.classList.add("login-dark");

    if (localStorage.getItem("Token") != null) {
      validarTokenUsuario();
    }

    return () => {
      document.body.classList.remove("login-dark");
    };
  }, []);

  return (
    <div className="login-container">
      <h2>{t("login")}</h2>
      <form id="formLogin" onSubmit={handleSubmit(ingresar)}>
        <div className="form-group">
          <div className="input-row">
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Usuario"
              {...register("username", { required: true })}
            />
            <FaUser className="input-icon" aria-hidden />
          </div>
          {errors.username && (
            <span className="error">{t("usernameRequired")}</span>
          )}
        </div>
        <div className="form-group">
          <div className="input-row">
            <input
              type="password"
              id="contrasenia"
              name="contrasenia"
              placeholder="Contraseña"
              {...register("password", { required: true })}
            />
            <FaLock className="input-icon" aria-hidden />
          </div>
          {errors.password && (
            <span className="error">{t("passwordRequired")}</span>
          )}
        </div>
        <button type="submit" className="btn-acceder" disabled={!isValid}>
          <span>{t("login")}</span>
        </button>
        <p className="register-link">
          {t("noAccount")}
          <Link to={"/register"}>{t("registerHere")}</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
