import React from "react";
import CrearAccesorio from "./CrearAccesorio";
import ListarAccesorio from "./ListarAccesorio";
import EditarAccesorio from "./EditarAccesorio";

const Accesorio = () => {
  return (
    <div className="dashboard-layout">
      <main className="dashboard-main">
        <section id="accesorios" className="mb-5">
          <div className="dashboard-root container mb-5">
            <section id="section-accesorios" className="mb-5">
              <h2>Accesorios</h2>
              <div className="row">
                <div className="col-md-4 col-12">
                  <CrearAccesorio />
                </div>
                <div className="col-md-8 col-12">
                  <ListarAccesorio />
                </div>
                <div className="col-md-12 col-12">
                  <EditarAccesorio />
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Accesorio;
