import ListarAccesorio from "./ListarAccesorio";
import CrearAccesorio from "./CrearAccesorio";
import EditarAccesorio from "./EditarAccesorio";
import GraficaAccesorio from "./GraficaAccesorio";
import { useTranslation } from "react-i18next";

const Accesorios = () => {
  const { t } = useTranslation();

  return (
    <section id="accesorios" className="mb-5">
      <h2>{t("accessories")}</h2>
      <div className="row">
        <div className="col-md-6 col-12">
          <CrearAccesorio />
        </div>
        <div className="col-md-6 col-12">
          <EditarAccesorio />
        </div>
        <div className="col-md-12 col-12">
          <ListarAccesorio />
        </div>
        <div className="col-md-12 col-12">
          <GraficaAccesorio />
        </div>
      </div>
    </section>
  );
};

export default Accesorios;
