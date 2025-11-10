import ListarAccesorio from "./ListarAccesorio";
import CrearAccesorio from "./CrearAccesorio";
import EditarAccesorio from "./EditarAccesorio";

const Accesorios = () => {
  return (
    <section id="accesorios" className="mb-5">
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
  );
};

export default Accesorios;
