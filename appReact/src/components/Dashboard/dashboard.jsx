import "./dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { desloguear } from "../../features/user.slice";
import { createPhone, listar } from "../../features/phone.slice";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import api from "../../data/api";
import ListarCelular from "./ListarCelular/ListarCelular";

const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.clear();
    dispatch(desloguear());
    navigate("/");
  };

  const handleCreateCelular = async (data) => {
    try {
      const response = await api.post("/celulares", data);
      dispatch(createPhone(response.data));
      if (response.data && response.data.id) {
        localStorage.setItem("celularId", JSON.stringify(response.data.id));
      }
      reset();
    } catch (error) {
      console.error(error);
      const msg = error?.response?.data?.message || error?.message || "Error creando celular";
      throw error;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const handleResetCelular = () => {
    reset();
  };

  const onSubmitCelular = (data) => {
    handleCreateCelular(data);
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">Mi App</div>
        <ul className="sidebar-nav">
          <li>
            <a href="#section-celulares">Inicio</a>
            <a href="#section-celulares">Celulares</a>
            <a href="#section-accesorios">Accesorios</a>
            <a href="#section-usuarios">Usuarios</a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <button className="btn btn-danger btn-sm" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-root container mb-5">
          <div id="alerts" />
          {/* Celulares */}
          <section id="section-celulares" className="mb-5">
            <h2>Celulares</h2>
            <div className="row">
              <div className="col-12">
                <form id="form-celular" className="card card-body mb-3" onSubmit={handleSubmit(onSubmitCelular)}>
                  <h5>Crear</h5>
                  <input type="hidden" id="celular-id" />
                  <div className="mb-2">
                    <input
                      id="celular-nombre"
                      {...register("nombre", { required: true })}
                      className="form-control"
                      placeholder="Nombre"
                    />
                    {errors.nombre && <small className="text-danger">El nombre es obligatorio</small>}
                  </div>
                  <div className="mb-2">
                    <input
                      id="celular-marca"
                      {...register("marca", { required: true })}
                      className="form-control"
                      placeholder="Marca"
                    />
                    {errors.marca && <small className="text-danger">La marca es obligatoria</small>}
                  </div>
                  <div className="mb-2">
                    <input
                      id="celular-modelo"
                      {...register("modelo", { required: true })}
                      className="form-control"
                      placeholder="Modelo"
                    />
                    {errors.modelo && <small className="text-danger">El modelo es obligatorio</small>}
                  </div>
                  <div className="mb-2">
                    <input
                      id="celular-precio"
                      {...register("precio", {
                        required: true,
                        valueAsNumber: true,
                      })}
                      type="number"
                      className="form-control"
                      placeholder="Precio"
                    />
                    {errors.precio && <small className="text-danger">El precio es obligatorio</small>}
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Accesorios compatibles</label>
                    <select id="celular-accesorios" className="form-select" {...register("accesorios")}>
                      <option value="">Seleccione un accesorio</option>
                    </select>
                    {errors.accesorios && <small className="text-danger">Seleccione un accesorio</small>}
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-success" id="btn-save-celular" type="submit" disabled={isSubmitting}>
                      Guardar
                    </button>
                    <button className="btn btn-secondary" id="btn-reset-celular" type="button" onClick={handleResetCelular}>
                      Limpiar
                    </button>
                  </div>
                </form>
              </div>
              <ListarCelular />
            </div>
          </section>
          {/* Accesorios */}
          <section id="section-accesorios" className="mb-5">
            <h2>Accesorios</h2>
            <div className="row">
              <div className="col-12">
                <form id="form-accesorio" className="card card-body mb-3">
                  <h5>Crear accesorio</h5>
                  <div className="mb-2">
                    <label className="form-label">Nombre</label>
                    <input id="accesorio-nombre" className="form-control" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Precio</label>
                    <input id="accesorio-precio" type="number" className="form-control" />
                  </div>
                  <button className="btn btn-success">Crear</button>
                </form>
              </div>
              <div className="col-12">
                <div className="card card-body">
                  <h5>Lista de Accesorios</h5>
                  <ul className="list-group" id="list-accesorios" />
                  <button className="btn btn-outline-primary mt-2" id="btn-refresh-accesorios">
                    Refrescar
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/* Usuarios */}
          <section id="section-usuarios" className="mb-5">
            <h2>Usuarios</h2>
            <div className="row">
              <div className="col-12">
                <div className="card card-body">
                  <h5>Usuarios (lista)</h5>
                  <ul className="list-group" id="list-usuarios" />
                  <button className="btn btn-outline-primary mt-2" id="btn-refresh-usuarios">
                    Refrescar
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <footer className="text-center py-3 bg-light">Panel de pruebas - front estático</footer>
      </main>
    </div>
  );
};

export default DashboardAdmin;
