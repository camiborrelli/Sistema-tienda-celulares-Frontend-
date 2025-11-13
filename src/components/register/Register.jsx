import "../login/login.css";
import { useEffect, useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import api from "../../data/api";
import { useDispatch } from "react-redux";
import { loguear } from "../../features/user.slice";
import { useTranslation } from "react-i18next";
import { joiResolver } from "@hookform/resolvers/joi";
import { registerUsuarioSchema } from "../../validators/usuario.validator";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading] = useState(false);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    resolver: joiResolver(registerUsuarioSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    api
      .post(`/usuarios/register`, data, { skipAuth: true })
      .then((response) => {
        toast.success(response.data.message);
        localStorage.setItem("Token", response.data.token);
        dispatch(loguear(response.data.token));
        navigate("/dashboard/celulares");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        reset();
      });
  };

  useEffect(() => {
    document.body.classList.add("login-dark");
    return () => document.body.classList.remove("login-dark");
  }, []);

  return (
    <div className="login-container">
      <div className="brand">
        <h2 className="login-title">{t("register")}</h2>
      </div>
      <form id="formRegistro" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <div className="input-row">
            <FaUser className="input-icon" aria-hidden />
            <input
              type="text"
              id="username"
              placeholder={t("usernamePlaceholder")}
              {...register("username", { required: true })}
            />
          </div>
          {errors.username && <span className="error">{t("usernameRequired")}</span>}
        </div>
        <div className="form-group">
          <div className="input-row">
            <FaEnvelope className="input-icon" aria-hidden />
            <input type="email" id="email" placeholder={t("emailPlaceholder")} {...register("email", { required: true })} />
          </div>
          {errors.email && <span className="error">{t("emailRequired")}</span>}
        </div>
        <div className="form-group">
          <div className="input-row">
            <FaLock className="input-icon" aria-hidden />
            <input
              type="password"
              id="contrasenia"
              placeholder={t("passwordPlaceholder")}
              {...register("password", { required: true })}
            />
          </div>
          {errors.password && <span className="error">{t("passwordRequired")}</span>}
        </div>
        <div className="form-group">
          <div className="input-row">
            <FaLock className="input-icon" aria-hidden />
            <input
              type="password"
              id="confirmPassword"
              placeholder={t("confirmPasswordPlaceholder")}
              {...register("confirmPassword", { required: true })}
            />
          </div>
          {errors.confirmPassword && <span className="error">{t("confirmPasswordRequired")}</span>}
        </div>
        <button disabled={!isValid} className="btn-acceder">
          {loading ? <i /> : t("register")}
        </button>
        <p className="login-link">
          {t("alreadyHaveAccount")} <Link to={"/"}>{t("login")}</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
