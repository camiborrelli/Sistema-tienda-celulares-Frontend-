import { useDispatch, useSelector } from "react-redux";
import {
  verPlan,
  cambiarPlan,
  verPerfil as setPerfil,
} from "../../../features/user.slice";
import api from "../../../data/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaCheck } from "react-icons/fa";
import "./Perfil.css";
import { useSelector } from "react-redux";

const VerPlan = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [loadingPlan, setLoadingPlan] = useState(false);
  const [fetchingPlan, setFetchingPlan] = useState(true);
  const [cantidadAccesoriosCreados, setCantidadAccesoriosCreados] = useState(0);

  const usuario = useSelector((state) => state.user.usuario);
  const currentPlanLabel = usuario?.plan || "No se encontró el plan";
  const isPremium = currentPlanLabel?.toLowerCase() === "premium";

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm();

  //obtener el plan actual
  const getPlan = async () => {
    try {
      setFetchingPlan(true);
      const response = await api.get("/usuarios/plan");
      const payload =
        response?.data?.usuario ?? response?.data?.user ?? response?.data;
      if (payload) dispatch(verPlan(payload));
    } catch (error) {
      console.error("Error fetching plan:", error);
      toast.error(error?.response?.data?.error || "No se pudo obtener el plan");
    } finally {
      setFetchingPlan(false);
    }
  };

  // obtener los datos del usuario logueado
  const fetchPerfil = async () => {
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
    fetchPerfil();
  }, []);

  // Cambiar plan a Premium
  const changeToPremium = async (e) => {
    e.preventDefault();
    if (!confirm("¿Deseas cambiar tu plan a Premium?")) return;

    setLoadingPlan(true);
    try {
      const response = await api.patch("/usuarios", { planNuevo: "Premium" });
      toast.success(response.data.mensaje || "Plan actualizado a Premium");
      if (response?.data?.usuario) {
        dispatch(cambiarPlan(response.data.usuario));
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || "No se pudo cambiar el plan");
    } finally {
      setLoadingPlan(false);
    }
  };

  //editar perfil del usuario
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
        password: "",
      });
    } catch (error) {
      console.error("Error al editar perfil:", error);
      toast.error(
        error?.response?.data?.error || "No se pudo editar el perfil"
      );
    }
  };

  //cantidad de accesorios creados
  useEffect(() => {
    api
      .get("/accesorios/creados")
      .then((response) => {
        const count =
          response?.data?.count ?? response?.data?.accesorios?.length ?? 0;
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
      <div className="perfil-container">
        <div className="editar-perfil-container">
          <h5>{t("Editar Perfil")}</h5>
          <form id="formProfile" onSubmit={handleSubmit(editarPerfil)}>
            <div className="form-group">
              <div className="input-row">
                {/* <FaUser className="input-icon" aria-hidden /> */}
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
                  placeholder={t("Correo electrónico")}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("Guardando...") : t("Guardar Cambios")}
              {!isSubmitting && <FaCheck style={{ marginLeft: "10px" }} />}
            </button>
          </form>
        </div>

        <div className="ver-plan-container">
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
                  disabled={loadingPlan}
                >
                  {loadingPlan ? t("Procesando...") : t("Cambiar a Premium")}
                </button>
              ) : (
                <div className="alert alert-success">
                  {t("Ya estás en el plan Premium 🎉")}
                </div>
              )}
            </>
          )}

          {/* Registros de accesorios */}
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

            {!isPremium && (
              <div className="progress-container">
                <div
                  className={`progress-bar ${progresoClase}`}
                  style={{ width: `${porcentaje}%` }}
                >
                  {porcentaje >= 30 && `${Math.round(porcentaje)}%`}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerPlan;
