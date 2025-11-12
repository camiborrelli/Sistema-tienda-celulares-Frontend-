import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import api from "../../../data/api";
import { createAccesory, list } from "../../../features/accesory.slice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "./Accesorio.css";


const CrearAccesorio = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors /* isSubmitting */ },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      nombre: data.nombre,
      descripcion: data.descripcion || "",
      precio: Number(data.precio) || 0,
      stock: Number(data.stock) || 0,
      modeloCompatible: data.modeloCompatible || "",
      categoria: data.categoria || "",
    };

    api
      .post("accesorios", payload)
      .then((response) => {
        const created = response.data?.accesorio ?? response.data;
        localStorage.setItem(
          "accesorioId",
          response.data?.accesorio?._id ??
            response.data?.accesorio?.id ??
            response.data?.id ??
            response.data?._id
        );
        dispatch(createAccesory(created));
        toast.success(response.data?.mensaje || "Accesorio creado");
        reset();
        api
          .get("/accesorios")
          .then((response) => {
            dispatch(list(response.data.accesorios));
          })
          .catch((error) => {
            console.error("Error al listar accesorios:", error);
          });
      })
      .catch((error) => {
        console.error("Error al crear accesorio:", error);
        toast.error(error.response.data.error);
      });


  };




  return (
    <div className="col-12">
      <form
        id="form-accesorio"
        className="card card-body mb-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h5>{t("createAccessory")}</h5>
        <div className="mb-2">
          <input
            id="accesorio-nombre"
            className="form-control"
            placeholder={t("namePlaceholder")}
            {...register("nombre", { required: true })}
          />
          {errors.nombre && (
            <small className="text-danger">{t("usernameRequired")}</small>
          )}
        </div>
        <div className="mb-2">
          <textarea
            id="accesorio-descripcion"
            className="form-control"
            rows={3}
            {...register("descripcion", { required: true })}
            placeholder={t("descriptionPlaceholder")}
          />
          {errors.descripcion && (
            <small className="text-danger">{t("descriptionRequired")}</small>
          )}
        </div>

        <div className="mb-2">
          <input
            id="accesorio-precio"
            type="number"
            className="form-control"
            {...register("precio", { required: true, valueAsNumber: true })}
            placeholder={t("pricePlaceholder")}
          />
          {errors.precio && (
            <small className="text-danger">{t("priceRequired")}</small>
          )}
        </div>

        <div className="mb-2">
          <input
            id="accesorio-stock"
            type="number"
            className="form-control"
            {...register("stock", { required: true, valueAsNumber: true })}
            placeholder={t("stockPlaceholder")}
          />
          {errors.stock && (
            <small className="text-danger">{t("stockRequired")}</small>
          )}
        </div>

        <div className="mb-2">
          <input
            id="accesorio-modeloCompatible"
            className="form-control"
            {...register("modeloCompatible", { required: true })}
            placeholder={t("compatibleModelPlaceholder")}
          />
          {errors.modeloCompatible && (
            <small className="text-danger">
              {t("compatibleModelRequired")}
            </small>
          )}
        </div>

        <div className="mb-2">
          <select
            id="accesorio-categoria"
            className="form-select"
            {...register("categoria", { required: true })}
            defaultValue=""
          >
            <option value="" disabled>
              {t("selectCategoryPlaceholder")}
            </option>
            <option value="Cargadores">Cargadores</option>
            <option value="Fundas">Fundas</option>
            <option value="Auriculares">Auriculares</option>
            <option value="otros">Otros</option>

          </select>
          {errors.categoria && (
            <small className="text-danger">{t("categoryRequired")}</small>
          )}
        </div>

        {/* Botones alineados horizontalmente como en EditarAccesorio */}
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">
            {t("create")}
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

export default CrearAccesorio;
