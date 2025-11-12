import { useEffect, useState } from "react";
import "./Informe.css";
import { useTranslation } from "react-i18next";
import api from "../../../data/api";
import { toast } from "react-toastify";

const Informe = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState({ plus: 0, premium: 0, total: 0 });

  useEffect(() => {
    const fetchCount = async () => {
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

    fetchCount();
  }, [t]);

  // Calcular porcentajes
  const plusPercentage = count.total > 0 ? (count.plus / count.total) * 100 : 0;
  const premiumPercentage =
    count.total > 0 ? (count.premium / count.total) * 100 : 0;

  return (
    <section id="informe" className="mb-5">
      <h1>{t("Informe componente") || "Report"}</h1>
      <p>
        {t("Cantidad de accesorios creados:") ||
          "Quantity of accessories created:"}{" "}
        {count.total === 0 ? t("Cargando...") || "..." : `${count.total} `}
      </p>

      {/* Barras de progreso */}
      {count.total > 0 && (
        <div className="progress-bars">
          <div className="progress-item">
            <div className="progress-title">Plus: {count.plus}</div>
            <div className="progress-bar-container">
              <div
                className="progress-bar plus"
                style={{ width: `${plusPercentage}%` }}
              >
                <span className="progress-label">
                  {plusPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-title">Premium: {count.premium}</div>
            <div className="progress-bar-container">
              <div
                className="progress-bar premium"
                style={{ width: `${premiumPercentage}%` }}
              >
                <span className="progress-label">
                  {premiumPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Informe;
