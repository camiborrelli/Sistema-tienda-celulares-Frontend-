import "../login/login.css";
import React from "react";
import { useEffect } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const registro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const registrar = (data) => {
    const { nombre, email, contrasenia } = data;
    if (!nombre && !email && !contrasenia) {
      toast.error("Completa todos los campos");
      return;
    }
    localStorage.setItem("user", nombre);
    toast.success("Registro exitoso");
    // navigate("/dashboard");
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
      <form id="formRegistro" method="post">
        <div className="form-group">
          <div className="input-row">
            <input type="text" id="nombre" name="nombre" placeholder="Nombre" />
            <FaUser className="input-icon" aria-hidden />
          </div>
        </div>
        <div className="form-group">
          <div className="input-row">
            <input type="email" id="email" name="email" placeholder="Email" />
            <FaEnvelope className="input-icon" aria-hidden />
          </div>
        </div>
        <div className="form-group">
          <div className="input-row">
            <input
              type="password"
              id="contrasenia"
              name="contrasenia"
              placeholder="Contraseña"
            />
            <FaLock className="input-icon" aria-hidden />
          </div>
        </div>
        <button type="submit" className="btn-acceder" onClick={registrar}>
          Registrar
        </button>
        <a href="/login">Ya tienes cuenta? Inicia sesión</a>
      </form>
    </div>
  );
};

export default registro;
