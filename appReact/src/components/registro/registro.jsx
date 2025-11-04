import "./registro.css";
import React from "react";
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
  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form id="formRegistro" method="post">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="contrasenia">Contraseña:</label>
          <input type="password" id="contrasenia" name="contrasenia" />
        </div>
        <button type="submit" className="btn-acceder" onClick={registro}>
          Registrar
        </button>
        <a href="/login">Ya tienes cuenta? Inicia sesión</a>
      </form>
    </div>
  );
};

export default registro;
