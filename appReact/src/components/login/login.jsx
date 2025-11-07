import { useRef, useEffect } from "react";
import "./Login.css";
import { useNavigate, NavLink, Link } from "react-router";
import { FaUser, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loguear } from "../../features/user.slice";
import { toast } from "react-toastify";
import api from "../../data/api";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const ingresar = (data) => {
    api
      .post("usuarios/login", data, { skipAuth: true })
      .then((response) => {
        dispatch(loguear(response.data.token));
        toast.success(response.data.message, { autoClose: 2000 });
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  // aplicar clase al body para forzar fondo oscuro solo en esta página
  useEffect(() => {
    document.body.classList.add("login-dark");
    return () => {
      document.body.classList.remove("login-dark");
    };
  }, []);

  return (
    <div className="login-container">
      <h2>Login</h2>
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
          {errors.username && <span className="error">El username es obligatorio</span>}
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
          {errors.password && <span className="error">La contraseña es obligatoria</span>}
        </div>
        <button type="submit" className="btn-acceder">
          Acceder
        </button>
        <p className="register-link">
          ¿No tienes una cuenta? <Link to={"/register"}>Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
