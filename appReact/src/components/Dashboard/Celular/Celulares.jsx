import ListarCelular from "./ListarCelular";
import AltaCelular from "./AltaCelular";
import EditarCelular from "./EditarCelular";
import { useTranslation } from "react-i18next";

const Celulares = () => {
  const { t } = useTranslation();
  return (
    <section id="section-celulares" className="mb-5">
      <h2>{t("cellphones")}</h2>
      <div className="row">
        <div className="col-md-6 col-12">
          <AltaCelular />
        </div>
        <div className="col-md-6 col-12">
          <EditarCelular />
        </div>
        <div className="col-md-12 col-12">
          <ListarCelular />
        </div>
      </div>
    </section>
  );
};

export default Celulares;
