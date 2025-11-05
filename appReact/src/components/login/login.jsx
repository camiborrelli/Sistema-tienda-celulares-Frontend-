import { useRef, useEffect } from "react";
import "./Login.css";
import { useNavigate, NavLink, Link } from "react-router";
import { FaUser, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loguear } from "../../features/user.slice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const userRef = useRef(null);
  const passRef = useRef(null);
  const dispatch = useDispatch();

  const ingresar = (e) => {
    e.preventDefault();
    const usuario = userRef.current.value;
    const password = passRef.current.value;

    if (!usuario || !password) {
      toast.error("Completa todos los campos");
    } else {
      localStorage.setItem("user", usuario);
      dispatch(loguear());
      navigate("/dashboard");
    }
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
      <form id="formLogin" method="post">
        <div className="form-group">
          <div className="input-row">
            <FaUser className="input-icon" aria-hidden />
            <input
              ref={userRef}
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Usuario"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-row">
            <FaLock className="input-icon" aria-hidden />
            <input
              ref={passRef}
              type="password"
              id="contrasenia"
              name="contrasenia"
              placeholder="Contraseña"
            />{" "}
          </div>
        </div>
        <button type="submit" className="btn-acceder" onClick={ingresar}>
          Acceder
        </button>
        <p className="register-link">
          ¿No tienes una cuenta? <Link to={"/registro"}>Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
