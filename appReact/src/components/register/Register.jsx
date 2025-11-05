import "../login/login.css";
import { useEffect } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import api from "../../data/api";
import { useDispatch } from "react-redux";
import { loguear } from "../../features/user.slice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    api
      .post(`/usuarios/register`, data)
      .then((response) => {
        toast.success(response.data.message);
        localStorage.setItem("Token", response.data.token);
        dispatch(loguear());
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    document.body.classList.add("login-dark");
    return () => document.body.classList.remove("login-dark");
  }, []);

  return (
    <div className="login-container">
      <div className="brand">
        <h2 className="login-title">Registro</h2>
      </div>
      <form id="formRegistro" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <div className="input-row">
            <FaUser className="input-icon" aria-hidden />
            <input
              type="text"
              id="username"
              placeholder="Nombre"
              {...register("username", { required: true })}
            />
          </div>
          {errors.username && (
            <span className="error">El username es obligatorio</span>
          )}
        </div>
        <div className="form-group">
          <div className="input-row">
            <FaEnvelope className="input-icon" aria-hidden />
            <input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </div>
          {errors.email && (
            <span className="error">El email es obligatorio</span>
          )}
        </div>
        <div className="form-group">
          <div className="input-row">
            <FaLock className="input-icon" aria-hidden />
            <input
              type="password"
              id="contrasenia"
              placeholder="Contraseña"
              {...register("password", { required: true })}
            />
          </div>
          {errors.password && (
            <span className="error">La contraseña es obligatoria</span>
          )}
        </div>
        <div className="form-group">
          <div className="input-row">
            <FaLock className="input-icon" aria-hidden />
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirmar Contraseña"
              {...register("confirmPassword", { required: true })}
            />
          </div>
          {errors.confirmPassword && (
            <span className="error">
              La confirmación de la contraseña es obligatoria
            </span>
          )}
        </div>
        <button type="submit" className="btn-acceder">
          Registrar
        </button>
        <p className="login-link">
          ¿Ya tienes cuenta? <Link to={"/"}>Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
