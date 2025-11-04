import React, { useRef, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const userRef = useRef(null);
  const passRef = useRef(null);

  const ingresar = (e) => {
    e.preventDefault();
    const usuario = userRef.current?.value;
    const password = passRef.current?.value;
    if (!usuario || !password) {
      toast.error("Completa todos los campos");
      return;
    }

    // mock login: guardar usuario y redirigir (puedes reemplazar por llamada al backend)
    localStorage.setItem("user", usuario);
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form id="formLogin" method="post" onSubmit={ingresar}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input ref={userRef} type="text" id="nombre" name="nombre" />
        </div>
        <div className="form-group">
          <label htmlFor="contrasenia">Contraseña:</label>
          <input
            ref={passRef}
            type="password"
            id="contrasenia"
            name="contrasenia"
          />
        </div>
        <button type="submit" className="btn-acceder">
          Acceder
        </button>
        <a href="/registro">No tienes una cuenta? Regístrate</a>
      </form>
    </div>
  );
};

export default Login;
