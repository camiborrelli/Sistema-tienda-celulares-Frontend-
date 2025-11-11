import { useDispatch, useSelector } from "react-redux";
import { verPlan, cambiarPlan } from "../../../features/user.slice";
import api from "../../../data/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import "./Plan.css";

const VerPlan = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [fetchingPlan, setFetchingPlan] = useState(true);

  const usuario = useSelector((state) => state.user.usuario);
  const currentPlanLabel = usuario?.plan || "No se encontró el plan";

  const getPlan = async () => {
    try {
      setFetchingPlan(true);
      const response = await api.get("/usuarios/plan");
      console.debug("/usuarios/plan response:", response?.data);
      const payload =
        response?.data?.usuario ?? response?.data?.user ?? response?.data;
      if (payload) {
        dispatch(verPlan(payload));
      }
    } catch (error) {
      console.error("Error fetching plan:", error);
      toast.error(error?.response?.data?.error || "No se pudo obtener el plan");
    } finally {
      setFetchingPlan(false);
    }
  };

  useEffect(() => {
    getPlan();
  }, []);

  const changeToPremium = async (e) => {
    e.preventDefault();
    if (!confirm("¿Deseas cambiar tu plan a Premium?")) return;

    setLoading(true);
    try {
      const response = await api.patch("/usuarios", { planNuevo: "Premium" });
      toast.success(response.data.mensaje || "Plan actualizado a Premium");
      if (response?.data?.usuario) {
        dispatch(cambiarPlan(response.data.usuario.plan));
        verPlan(response.data.usuario);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || "No se pudo cambiar el plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ver-plan-container">
      {/* Tarjeta del plan actual con fondo claro */}
      <div className="plan-header">
        <h5>{t("Mi Plan")}</h5>

        {fetchingPlan ? (
          <p className="loading-text">{t("Cargando plan...")}</p>
        ) : (
          <>
            <p className="current-plan">
              {t("Tu plan actual es")}{" "}
              <span className="plan-badge">{currentPlanLabel}</span>
            </p>

            {currentPlanLabel?.toLowerCase() !== "premium" ? (
              <button
                className="btn btn-premium"
                onClick={changeToPremium}
                disabled={loading}
              >
                {loading ? t("Procesando...") : t("Cambiar a Premium")}
              </button>
            ) : (
              <div className="alert alert-success">
                {t("Ya estás en el plan Premium 🎉")}
              </div>
            )}
          </>
        )}
      </div>

      {/* Beneficios uno al lado del otro con flex */}
      <div className="benefits-container">
        <div className="plan-section plus">
          <h6>{t("Beneficios del Plan Plus")}</h6>
          <ul>
            <li>{t("Acceso limitado a funciones básicas")}</li>
            <li>{t("Soporte comunitario")}</li>
            <li>{t("Actualizaciones regulares")}</li>
            <li>{t("Maximo 10 registros de celulares y accesorios")}</li>
          </ul>
        </div>

        <div className="plan-section premium">
          <h6>{t("Beneficios del Plan Premium")}</h6>
          <ul>
            <li>{t("Acceso ilimitado a todas las funciones")}</li>
            <li>{t("Soporte prioritario 24/7")}</li>
            <li>{t("Actualizaciones y novedades anticipadas")}</li>
            <li>{t("Registros ilimitados de celulares y accesorios")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VerPlan;
