import { useEffect, useState } from "react";
import "./Informe.css";
import { useTranslation } from "react-i18next";
import api from "../../../data/api";
import { toast } from "react-toastify";

const Informe = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState({ plus: 0, premium: 0, total: 0 });
  const [cellphoneCount, setCellphoneCount] = useState({
    plus: 0,
    premium: 0,
    total: 0,
  });

  useEffect(() => {
    const cantAccesorios = async () => {
      try {
        const res = await api.get("/usuarios/accesorios/cantidad");
        const body = res?.data;
        const plus = Number(body?.data?.plus) || 0;
        const premium = Number(body?.data?.premium) || 0;
        const total = plus + premium;
        setCount({ plus, premium, total });
      } catch (err) {
        console.error(err);
        setCount({ plus: 0, premium: 0, total: 0 });
        toast.error(
          t("Error al obtener accesorios creados") || "Error fetching count"
        );
      }
    };

    const cantCelulares = async () => {
      try {
        const res = await api.get("/usuarios/celulares/cantidad");
        const body = res?.data;
        const plus = Number(body?.data?.plus) || 0;
        const premium = Number(body?.data?.premium) || 0;
        const total = Number(body?.data?.total) || plus + premium;
        setCellphoneCount({ plus, premium, total });
      } catch (err) {
        console.error(err);
        setCellphoneCount({ plus: 0, premium: 0, total: 0 });
        toast.error(
          t("Error al obtener celulares creados") ||
            "Error fetching cellphones count"
        );
      }
    };

    cantAccesorios();
    cantCelulares();
  }, [t]);

  // Calcular porcentajes para accesorios
  const plusPercentage = count.total > 0 ? (count.plus / count.total) * 100 : 0;
  const premiumPercentage =
    count.total > 0 ? (count.premium / count.total) * 100 : 0;

  // Calcular porcentajes para celulares
  const cellPlusPercentage =
    cellphoneCount.total > 0
      ? (cellphoneCount.plus / cellphoneCount.total) * 100
      : 0;
  const cellPremiumPercentage =
    cellphoneCount.total > 0
      ? (cellphoneCount.premium / cellphoneCount.total) * 100
      : 0;

  return (
    <section id="informe" className="mb-5">
      <h2 className="section-title">{t("reportAccessories")}</h2>

      <div className="cards-container">
        {/* Card de Accesorios */}
        <div className="info-card accessories-card">
          <div className="card-icon">📱</div>
          <h3>{t("accessories")}</h3>
          <div className="total-number">{count.total}</div>
          <p className="card-subtitle">{t("totalAccessoriesCreated")}</p>

          {count.total > 0 ? (
            <div className="distribution">
              <div className="dist-item">
                <span className="dist-label">{t("plus")}</span>
                <div className="dist-bar-container">
                  <div
                    className="dist-bar plus-bar"
                    style={{ width: `${plusPercentage}%` }}
                  >
                    <span className="dist-percentage">
                      {plusPercentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <span className="dist-count">{count.plus}</span>
              </div>
              <div className="dist-item">
                <span className="dist-label">{t("premium")}</span>
                <div className="dist-bar-container">
                  <div
                    className="dist-bar premium-bar"
                    style={{ width: `${premiumPercentage}%` }}
                  >
                    <span className="dist-percentage">
                      {premiumPercentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <span className="dist-count">{count.premium}</span>
              </div>
            </div>
          ) : (
            <div className="loading-state">{t("loading")}</div>
          )}
        </div>

        {/* Card de Celulares */}
        <div className="info-card cellphones-card">
          <div className="card-icon">📞</div>
          <h3>{t("cellphones")}</h3>
          <div className="total-number">{cellphoneCount.total}</div>
          <p className="card-subtitle">{t("totalCellphones")}</p>

          {cellphoneCount.total > 0 ? (
            <div className="distribution">
              <div className="dist-item">
                <span className="dist-label">{t("plus")}</span>
                <div className="dist-bar-container">
                  <div
                    className="dist-bar plus-bar"
                    style={{ width: `${cellPlusPercentage}%` }}
                  >
                    <span className="dist-percentage">
                      {cellPlusPercentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <span className="dist-count">{cellphoneCount.plus}</span>
              </div>
              <div className="dist-item">
                <span className="dist-label">{t("premium")}</span>
                <div className="dist-bar-container">
                  <div
                    className="dist-bar premium-bar"
                    style={{ width: `${cellPremiumPercentage}%` }}
                  >
                    <span className="dist-percentage">
                      {cellPremiumPercentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <span className="dist-count">{cellphoneCount.premium}</span>
              </div>
            </div>
          ) : (
            <div className="loading-state">{t("loading")}</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Informe;
