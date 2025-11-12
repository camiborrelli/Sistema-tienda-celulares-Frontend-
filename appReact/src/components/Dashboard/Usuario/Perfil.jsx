import { useDispatch, useSelector } from "react-redux";
import { verPlan, cambiarPlan, setPerfil } from "../../../features/user.slice";
import api from "../../../data/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import "./Perfil.css";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaCheck, FaLock } from "react-icons/fa";

const VerPlan = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [fetchingPlan, setFetchingPlan] = useState(true);

  const usuario = useSelector((state) => state.user.usuario);
  const currentPlanLabel = usuario?.plan || "No se encontró el plan";
  const isPremium = currentPlanLabel?.toLowerCase() === "premium";
  // const isPlus = currentPlanLabel?.toLowerCase() === "plus";

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

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm();

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

        // Resolve count with explicit null checks to avoid chained ?? issues
        let count;
        if (cantAccesorios != null) {
          count = cantAccesorios;
        } else if (countFromField != null) {
          const parsed = Number(countFromField);
          count = Number.isFinite(parsed) ? parsed : 0;
        } else {
          count = 0;
        }

        setCantidadAccesoriosCreados(count);
      })
      .catch((err) => {
        console.error("Error al obtener accesorios creados:", err);
        setCantidadAccesoriosCreados(0);
      });
  }, []);

  const editarPerfil = async (data) => {
    try {
      const response = await api.patch("/usuarios/modificar", data);
      toast.success(
        response.data.mensaje || "Perfil actualizado correctamente"
      );
      if (response?.data?.usuario) {
        dispatch(setPerfil(response.data.usuario));
      }
      reset({
        username: data.username,
        email: data.email,
      });
    } catch (error) {
      console.error("Error al editar perfil:", error);
      toast.error(
        error?.response?.data?.error || "No se pudo editar el perfil"
      );
    }
  };

  const datosUsuario = async () => {
    try {
      const res = await api.get("/usuarios/perfil");
      const payload = res?.data?.usuario ?? res?.data?.user ?? res?.data;
      if (payload) {
        dispatch(setPerfil(payload));
        setValue("username", payload.username ?? payload.nombre ?? "");
        setValue("email", payload.email ?? "");
      }
    } catch (err) {
      console.error("Error obteniendo perfil:", err);
      toast.error("No se pudo cargar el perfil del usuario");
    }
  };

  useEffect(() => {
    getPlan();
    datosUsuario();
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
      <div className="editar-perfil-container">
        <h5>{t("editProfile")}</h5>
        <form id="formProfile" onSubmit={handleSubmit(editarPerfil)}>
          <div className="form-group">
            <div className="input-row">
              <FaUser className="input-icon" aria-hidden />
              <input
                type="text"
                id="username"
                {...register("username")}
                disabled={true}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-row">
              <FaEnvelope className="input-icon" aria-hidden />
              <input
                type="text"
                id="email"
                {...register("email")}
                placeholder={t("emailPlaceholder")}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("Guardando...") : t("saveChanges")}
            {!isSubmitting && <FaCheck style={{ marginLeft: "10px" }} />}
          </button>
        </form>
      </div>
      <div className="ver-plan-container">
        <div className="plan-header">
          {fetchingPlan ? (
            <p className="loading-text">{t("Cargando plan...")}</p>
          ) : (
            <>
              <h5 className="current-plan">
                {t("yourPlan")}{" "}
                <span className="plan-badge">{currentPlanLabel}</span>
              </h5>

              {!isPremium ? (
                <button
                  className="btn btn-premium"
                  onClick={changeToPremium}
                  disabled={loading}
                >
                  {loading ? t("Procesando...") : t("changePremium")}
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
            <h6>{t("benefitsPlus")}</h6>
            <ul>
              <li>{t("limitedAccess")}</li>
              <li>{t("communitySupport")}</li>
              <li>{t("regularUpdates")}</li>
              <li>{t("maxRecords")}</li>
            </ul>
          </div>

          <div className="plan-section premium">
            <h6>{t("benefitsPremium")}</h6>
            <ul>
              <li>{t("unlimitedAccess")}</li>
              <li>{t("prioritySupport")}</li>
              <li>{t("updatesAndNews")}</li>
              <li>{t("infiniteRecords")}</li>
            </ul>
          </div>
        </div>

        {/* Sección mejorada de registros */}
        <div className="registros-section">
          <h4>{t("accesoriesRecord")}</h4>

          <div className="registros-info">
            <div className="registros-count">
              {t("youHaveCreated")} <strong>{cantidadAccesoriosCreados}</strong>{" "}
              {t("accessories2")}
            </div>
            {!isPremium && (
              <div className="registros-limit">
                {t("Límite:")} {maxRegistros} {t("left")}
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
