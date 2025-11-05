import React, { useRef, useState, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaLock } from "react-icons/fa";

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

  // aplicar clase al body para forzar fondo oscuro solo en esta página
  useEffect(() => {
    document.body.classList.add("login-dark");
    return () => {
      document.body.classList.remove("login-dark");
    };
  }, []);

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form id="formLogin" method="post" onSubmit={ingresar}>
        <div className="form-group">
          <div className="input-row">
            <input
              ref={userRef}
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Usuario"
            />
            <FaUser className="input-icon" aria-hidden />
          </div>
        </div>
        <div className="form-group">
          <div className="input-row">
            <input
              ref={passRef}
              type="password"
              id="contrasenia"
              name="contrasenia"
              placeholder="Contraseña"
            />{" "}
            <FaLock className="input-icon" aria-hidden />
          </div>
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
