import "../login/login.css";
import { useEffect } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router";
//import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  {
    /*  const registrar = (data) => {
    const { nombre, email, contrasenia } = data;
    if (!nombre && !email && !contrasenia) {
      toast.error("Completa todos los campos");
      return;
    }
    localStorage.setItem("user", nombre);
    toast.success("Registro exitoso");
    // navigate("/dashboard");
  };*/
  }

  const onSubmit = (data) => {
    console.log(data);
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
          {errors.username && toast.error("El username es obligatorio")}
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
          {errors.email && toast.error("El email es obligatorio")}
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
          {errors.password && toast.error("El email es obligatorio")}
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
