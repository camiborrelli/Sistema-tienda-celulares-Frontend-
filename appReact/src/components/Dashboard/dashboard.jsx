import React from "react";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <>
      <div className="container mb-5">
        <div id="alerts" />
        {/* Celulares */}
        <section id="section-celulares" className="mb-5">
          <h2>Celulares</h2>
          <div className="row">
            <div className="col-md-6">
              <form id="form-celular" className="card card-body mb-3">
                <h5>Crear</h5>
                <input type="hidden" id="celular-id" />
                <div className="mb-2">
                  <label className="form-label">Nombre</label>
                  <input id="celular-nombre" className="form-control" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Marca</label>
                  <input id="celular-marca" className="form-control" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Modelo</label>
                  <input id="celular-modelo" className="form-control" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Precio</label>
                  <input
                    id="celular-precio"
                    type="number"
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Accesorios compatibles</label>
                  <select
                    name="accesorios"
                    id="celular-accesorios"
                    className="form-select"
                  >
                    <option value="">Seleccione un accesorio</option>
                  </select>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-success"
                    id="btn-save-celular"
                    type="submit"
                  >
                    Guardar
                  </button>
                  <button
                    className="btn btn-secondary"
                    id="btn-reset-celular"
                    type="button"
                  >
                    Limpiar
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <div className="card card-body">
                <h5>Lista de Celulares</h5>
                <table className="table table-sm" id="table-celulares">
                  <thead>
                    <tr>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Precio</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody />
                </table>
                <button
                  className="btn btn-outline-primary"
                  id="btn-refresh-celulares"
                >
                  Refrescar
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Accesorios */}
        <section id="section-accesorios" className="mb-5">
          <h2>Accesorios</h2>
          <div className="row">
            <div className="col-md-6">
              <form id="form-accesorio" className="card card-body mb-3">
                <h5>Crear accesorio</h5>
                <div className="mb-2">
                  <label className="form-label">Nombre</label>
                  <input id="accesorio-nombre" className="form-control" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Precio</label>
                  <input
                    id="accesorio-precio"
                    type="number"
                    className="form-control"
                  />
                </div>
                <button className="btn btn-success">Crear</button>
              </form>
            </div>
            <div className="col-md-6">
              <div className="card card-body">
                <h5>Lista de Accesorios</h5>
                <ul className="list-group" id="list-accesorios" />
                <button
                  className="btn btn-outline-primary mt-2"
                  id="btn-refresh-accesorios"
                >
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
            <div className="col-md-6">
              <form id="form-usuario" className="card card-body mb-3">
                <h5>Login</h5>
                <div className="mb-2">
                  <label className="form-label">Email</label>
                  <input
                    id="usuario-email"
                    type="email"
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Contraseña</label>
                  <input
                    id="usuario-password"
                    type="password"
                    className="form-control"
                  />
                </div>
                <div className="d-flex gap-2">
                  {/* <button
            class="btn btn-outline-success"
            id="btn-register"
            type="button"
          >
            Registrar
          </button> */}
                  <button
                    className="btn btn-outline-primary"
                    id="btn-login"
                    type="button"
                  >
                    Login
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    id="btn-logout"
                    type="button"
                    disabled=""
                  >
                    Logout
                  </button>
                </div>
                <div className="mt-2">
                  <small id="usuario-token" className="text-muted" />
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <form id="form-usuario" className="card card-body mb-3">
                <h5>Registro</h5>
                <div className="mb-2">
                  <label className="form-label">Nombre de usuario</label>
                  <input
                    id="usuario-nombre"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Email</label>
                  <input
                    id="usuario-email"
                    type="email"
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Contraseña</label>
                  <input
                    id="usuario-password"
                    type="password"
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Confirmar contraseña</label>
                  <input
                    id="usuario-password-confirm"
                    type="password"
                    className="form-control"
                  />
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-success"
                    id="btn-register"
                    type="button"
                  >
                    Registrar
                  </button>
                </div>
                <div className="mt-2">
                  <small id="usuario-token" className="text-muted" />
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <div className="card card-body">
                <h5>Usuarios (lista)</h5>
                <ul className="list-group" id="list-usuarios" />
                <button
                  className="btn btn-outline-primary mt-2"
                  id="btn-refresh-usuarios"
                >
                  Refrescar
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="text-center py-3 bg-light">
        Panel de pruebas - front estático
      </footer>
    </>
  );
};

export default Dashboard;
