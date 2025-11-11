import { useDispatch, useSelector } from "react-redux";
import { verPlan, cambiarPlan } from "../../../features/user.slice";
import api from "../../../data/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

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
    <div className="col-12">
      <div className="card card-body mb-3 text-center">
        <h5 className="mb-3">{t("Mi Plan")}</h5>

        {fetchingPlan ? (
          <p className="text-muted">{t("Cargando plan...")}</p>
        ) : (
          <>
            <p>
              {t("Tu plan actual es")}{" "}
              <strong className="text-primary">{currentPlanLabel}</strong>
            </p>

            {currentPlanLabel?.toLowerCase() !== "premium" ? (
              <button
                className="btn btn-primary mt-2"
                onClick={changeToPremium}
                disabled={loading}
              >
                {loading ? t("Procesando...") : t("Cambiar a Premium")}
              </button>
            ) : (
              <div className="alert alert-success mt-3">
                {t("Ya estás en el plan Premium 🎉")}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VerPlan;
