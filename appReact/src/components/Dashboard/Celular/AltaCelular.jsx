import { useForm } from "react-hook-form";
import { createPhone } from "../../../features/phone.slice";
import { useDispatch } from "react-redux";
import api from "../../../data/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { altaCelularSchema } from "../../../validators/celular.validator";

const AltaCelular = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: joiResolver(altaCelularSchema),
  });

  const [loading, setLoading] = useState(false);

  const UploadImageUrl = async (dataImg) => {
    console.log(dataImg);
    console.log(dataImg[0]);
    

    setLoading(true);

    const file = dataImg[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "class-preset"); // preset unsigned
    formData.append("cloud_name", "di6mcaunn"); // cloud name
    //Cloud name en la URL
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/di6mcaunn/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const uploaded = await res.json();
      reset();

      return uploaded.secure_url;
    } catch (err) {
      console.error("Error al subir imagen:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    data.imagen = await UploadImageUrl(data.imagen);

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
        onSubmit={handleSubmit(onSubmit)}
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
        <div className="mb-2">
          <input
            type="file"
            {...register("imagen")}
            className="form-control"
            placeholder={t("image")}
          />
          {errors.imagen && (
            <small className="text-danger">{t("imageRequired")}</small>
          )}
        </div>
        <div className="form-actions-centered">
          <button
            className="btn btn-success"
            type="submit"
            disabled={isSubmitting || loading}
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
