import React from "react";
import ListarCelular from "./ListarCelular";
import AltaCelular from "./AltaCelular";
import EditarCelular from "./EditarCelular";

const Celulares = () => {
  return (
    <section id="celulares" className="mb-5">
      <h2>Celulares</h2>
      <div className="row">
        <div className="col-md-4 col-12">
          <AltaCelular />
        </div>
        <div className="col-md-8 col-12">
          <ListarCelular />
        </div>
        <div className="col-md-12 col-12">
          <EditarCelular />
        </div>
      </div>
    </section>
  );
};

export default Celulares;
