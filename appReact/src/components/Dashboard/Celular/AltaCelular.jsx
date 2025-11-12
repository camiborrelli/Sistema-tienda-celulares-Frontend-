import { useForm } from "react-hook-form";
import { createPhone } from "../../../features/phone.slice";
import { useDispatch } from "react-redux";
import api from "../../../data/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AltaCelular = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSumbit = (data) => {
    api
      .post(`celulares/`, data)
      .then((response) => {
        console.log(data);
        toast.success(response.data.mensaje);
        dispatch(createPhone(data));
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
    reset();
  };

  return (
    <div className="col-12">
      <form
        id="form-celular-create"
        className="card card-body mb-3 form-offset-top"
        onSubmit={handleSubmit(onSumbit)}
      >
        <h5>{t("create")}</h5>
        <input type="hidden" id="celular-id" />
        <div className="mb-2">
          <input
            id="celular-nombre"
            {...register("nombre", { required: true })}
            className="form-control"
            placeholder={t("name")}
          />
          {errors.nombre && (
            <small className="text-danger">{t("usernameRequired")}</small>
          )}
        </div>
        <div className="mb-2">
          <input
            id="celular-marca"
            {...register("marca", { required: true })}
            className="form-control"
            placeholder={t("brand")}
          />
          {errors.marca && (
            <small className="text-danger">{t("brandRequired")}</small>
          )}
        </div>
        <div className="mb-2">
          <input
            id="celular-modelo"
            {...register("modelo", { required: true, valueAsNumber: true })}
            type="number"
            className="form-control"
            placeholder={t("model")}
          />
          {errors.modelo && (
            <small className="text-danger">{t("modelRequired")}</small>
          )}
        </div>
         <div className="mb-2">
          <input
            id="celular-stock"
            {...register("stock", { required: true, valueAsNumber: true })}
            type="number"
            className="form-control"
            placeholder={t("stock")}
          />
          {errors.modelo && (
            <small className="text-danger">{t("stockRequired")}</small>
          )}
        </div>
        <div className="mb-2">
          <input
            id="celular-precio"
            {...register("precio", {
              required: true,
              valueAsNumber: true,
            })}
            type="number"
            className="form-control"
            placeholder={t("price")}
          />
          {errors.precio && (
            <small className="text-danger">{t("priceRequired")}</small>
          )}
        </div>
        <div className="mb-2">
          <input
            id="celular-accesorios-compatibles"
            {...register("accesoriosCompatibles", {
              required: true,
              valueAsNumber: true,
            })}
            type="number"
            className="form-control"
            placeholder={t("accesoryNumber")}
          />
          {errors.accesoriosCompatibles && (
            <small className="text-danger">{t("accesoryNumberRequired")}</small>
          )}
        </div>
        <div className="form-actions-centered">
          <button
            className="btn btn-success"
            type="submit"
            disabled={isSubmitting}
          >
            {t("save")}
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => reset()}
          >
            {t("clean")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AltaCelular;
{
  /*
  <label className="form-label">Accesorios compatibles</label>
          <select id="celular-accesorios" className="form-select" {...register("accesorios")}>
            <option value="">Seleccione un accesorio</option>
          </select>
          {errors.accesorios && <small className="text-danger">Seleccione un accesorio</small>}
  */
}
