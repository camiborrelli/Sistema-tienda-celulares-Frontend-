import React, { useRef } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const userRef = useRef(null);
  const passRef = useRef(null);

  const ingresar = (e) => {
    e.preventDefault();
    const usuario = userRef.current?.value;
    const password = passRef.current?.value;
    if (usuario && password) {
      // mock auth: store usuario and redirect to dashboard
      localStorage.setItem("user", usuario);
      navigate("/dashboard");
    } else {
      const res = document.querySelector("#resultado");
      if (res) res.innerHTML = "Introduce usuario y contraseña";
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form id="formLogin" method="post" onSubmit={ingresar}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input ref={userRef} type="text" id="nombre" name="nombre" required />
        </div>
        <div className="form-group">
          <label htmlFor="contrasenia">Contraseña:</label>
          <input
            ref={passRef}
            type="password"
            id="contrasenia"
            name="contrasenia"
            required
          />
        </div>
        <button type="submit" className="btn-acceder">
          Acceder
        </button>
        <div id="resultado" style={{ marginTop: "8px", color: "red" }} />
      </form>
    </div>
  );
};

export default Login;
