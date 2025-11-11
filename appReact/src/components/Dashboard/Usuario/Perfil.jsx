import { useDispatch, useSelector } from "react-redux";
import { verPlan, cambiarPlan } from "../../../features/user.slice";
import api from "../../../data/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import "./Perfil.css";

const VerPlan = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [fetchingPlan, setFetchingPlan] = useState(true);

  const usuario = useSelector((state) => state.user.usuario);
  const currentPlanLabel = usuario?.plan || "No se encontró el plan";
  const isPremium = currentPlanLabel?.toLowerCase() === "premium";
  const isPlus = currentPlanLabel?.toLowerCase() === "plus";

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

  const [cantidadAccesoriosCreados, setCantidadAccesoriosCreados] = useState(0);

  useEffect(() => {
    api
      .get("/accesorios/creados")
      .then((response) => {
        const accesorios = response?.data?.accesorios;
        const cantAccesorios = Array.isArray(accesorios)
          ? accesorios.length
          : null;
        const countFromField = response?.data?.count ?? null;
        const count = cantAccesorios ?? Number(countFromField) ?? 0;
        setCantidadAccesoriosCreados(count);
      })
      .catch((err) => {
        console.error("Error al obtener accesorios creados:", err);
        setCantidadAccesoriosCreados(0);
      });
  }, []);

  const maxRegistros = isPremium ? null : 10;
  const porcentaje = isPremium
    ? 100
    : Math.min((cantidadAccesoriosCreados / 10) * 100, 100);
  const progresoClase = isPremium
    ? "full"
    : porcentaje >= 90
    ? "danger"
    : porcentaje >= 70
    ? "warning"
    : "";

  return (
    <section id="perfil" className="mb-5">
      <div className="ver-plan-container">
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

              {!isPremium ? (
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

        <div className="benefits-container">
          <div className="plan-section plus">
            <h6>{t("Beneficios del Plan Plus")}</h6>
            <ul>
              <li>{t("Acceso limitado a funciones básicas")}</li>
              <li>{t("Soporte comunitario")}</li>
              <li>{t("Actualizaciones regulares")}</li>
              <li>{t("Maximo 10 registros de accesorios")}</li>
            </ul>
          </div>

          <div className="plan-section premium">
            <h6>{t("Beneficios del Plan Premium")}</h6>
            <ul>
              <li>{t("Acceso ilimitado a todas las funciones")}</li>
              <li>{t("Soporte prioritario 24/7")}</li>
              <li>{t("Actualizaciones y novedades anticipadas")}</li>
              <li>{t("Registros ilimitados de accesorios")}</li>
            </ul>
          </div>
        </div>

        {/* Sección mejorada de registros */}
        <div className="registros-section">
          <h4>{t("Historial de registros de accesorios")}</h4>

          <div className="registros-info">
            <div className="registros-count">
              {t("Has creado")} <strong>{cantidadAccesoriosCreados}</strong>{" "}
              {t("registros de accesorios")}
            </div>
            {!isPremium && (
              <div className="registros-limit">
                {t("Límite:")} {maxRegistros} {t("registros")}
              </div>
            )}
          </div>

          {isPremium ? (
            <div className="unlimited-badge">
              {t("🎉 Registros ilimitados")}
            </div>
          ) : (
            <>
              <div className="progress-container">
                <div
                  className={`progress-bar ${progresoClase}`}
                  style={{ width: `${porcentaje}%` }}
                >
                  {porcentaje >= 30 && `${Math.round(porcentaje)}%`}
                </div>
              </div>

              {cantidadAccesoriosCreados >= 8 && (
                <div className="limit-warning">
                  {cantidadAccesoriosCreados >= 10
                    ? t(
                        "⚠️ Has alcanzado el límite máximo de registros. Actualiza a Premium para crear más."
                      )
                    : t(
                        "⚠️ Estás cerca del límite máximo. Considera actualizar a Premium para registros ilimitados."
                      )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default VerPlan;
