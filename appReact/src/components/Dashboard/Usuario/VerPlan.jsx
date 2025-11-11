import { useDispatch, useSelector } from "react-redux";
import { verPlan, cambiarPlan } from "../../../features/user.slice";
import api from "../../../data/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const VerPlan = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const usuario = useSelector((s) => s.user.usuario);
  const [loading, setLoading] = useState(false);

  const getPlan = () => {
    api
      .get("/usuarios/plan")
      .then((response) => {
        if (response?.data?.usuario) dispatch(verPlan(response.data.usuario));
      })
      .catch((error) => {
        console.error("Error fetching plan:", error);
        toast.error(
          error?.response?.data?.error || "No se pudo obtener el plan"
        );
      });
  };

  useEffect(() => {
    getPlan();
  }, [dispatch]);

  const changeToPremium = async (e) => {
    e.preventDefault();
    if (!confirm("¿Deseas cambiar tu plan a Premium?")) return;
    setLoading(true);
    try {
      const response = await api.patch("/usuarios/plan");
      toast.success(response.data.mensaje || "Plan actualizado a Premium");
      if (response?.data?.usuario) dispatch(cambiarPlan(response.data.usuario));
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || "No se pudo cambiar el plan");
    } finally {
      setLoading(false);
    }
  };

  const currentPlanLabel =
    getPlan()?.plan || usuario?.plan || "No se encontro el plan";

  return (
    <div className="col-12">
      <div className="card card-body mb-3">
        <h5>{t("Mi Plan") || "Mi Plan"}</h5>
        <p>
          {t("Plan actual") || "Plan actual"}:{" "}
          <strong>{currentPlanLabel}</strong>
        </p>
        {currentPlanLabel?.toLowerCase() !== "premium" && (
          <button
            className="btn btn-primary"
            onClick={changeToPremium}
            disabled={loading}
          >
            {loading ? t("processing") || "..." : "Cambiar a Premium"}
          </button>
        )}
      </div>
    </div>
  );
};

export default VerPlan;
