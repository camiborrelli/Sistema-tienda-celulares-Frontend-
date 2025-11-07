import "./dashboard.css";
import { useDispatch } from "react-redux";
import { desloguear } from "../../features/user.slice";
import { useNavigate } from "react-router";
import ListarCelular from "./ListarCelular/ListarCelular";
import AltaCelular from "./AltaCelular/AltaCelular";

const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.clear();
    dispatch(desloguear());
    navigate("/");
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
              <AltaCelular />
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
