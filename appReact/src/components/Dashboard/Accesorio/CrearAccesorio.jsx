import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import api from "../../../data/api";
import { createAccesory, listar, listarCategorias } from "../../../features/accesory.slice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "./Accesorio.css";
import { useEffect, useState, useCallback } from "react";

const CrearAccesorio = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    data.fechaCreacion = new Date().toISOString();

    api
      .post("accesorios", data)
      .then((response) => {
        dispatch(createAccesory(data));
        toast.success(t("accessoryCreatedSuccess"));
        reset();
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  // Obtener categorías para el select
  const obtenerCategorias = useCallback(() => {
    api
      .get("/accesorios/categorias")
      .then((response) => {
        const categorias = response.data.categorias;
        setCategorias(categorias); // Actualizar el estado con las categorías
        dispatch(listarCategorias(categorias));
      })
      .catch((error) => {
        console.error("Error al obtener categorías:", error);
      });
  }, [dispatch]);

  useEffect(() => {
    obtenerCategorias();
  }, [obtenerCategorias]);

  return (
    <div className="col-12">
      <form id="form-accesorio" className="card card-body mb-3" onSubmit={handleSubmit(onSubmit)}>
        <h5>{t("createAccessory")}</h5>

        <div className="mb-2">
          <input
            id="accesorio-nombre"
            className="form-control"
            placeholder={t("namePlaceholder")}
            {...register("nombre", { required: true })}
          />
          {errors.nombre && <small className="text-danger">{t("usernameRequired")}</small>}
        </div>

        <div className="mb-2">
          <textarea
            id="accesorio-descripcion"
            className="form-control"
            rows={3}
            {...register("descripcion", { required: true })}
            placeholder={t("descriptionPlaceholder")}
          />
          {errors.descripcion && <small className="text-danger">{t("descriptionRequired")}</small>}
        </div>

        <div className="mb-2">
          <input
            id="accesorio-precio"
            type="number"
            className="form-control"
            {...register("precio", { required: true, valueAsNumber: true })}
            placeholder={t("pricePlaceholder")}
          />
          {errors.precio && <small className="text-danger">{t("priceRequired")}</small>}
        </div>

        <div className="mb-2">
          <input
            id="accesorio-stock"
            type="number"
            className="form-control"
            {...register("stock", { required: true, valueAsNumber: true })}
            placeholder={t("stockPlaceholder")}
          />
          {errors.stock && <small className="text-danger">{t("stockRequired")}</small>}
        </div>

        <div className="mb-2">
          <input
            id="accesorio-modeloCompatible"
            className="form-control"
            {...register("modeloCompatible", { required: true })}
            placeholder={t("compatibleModelPlaceholder")}
          />
          {errors.modeloCompatible && <small className="text-danger">{t("compatibleModelRequired")}</small>}
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
            {Array.isArray(categorias) && categorias.length > 0 ? (
              categorias.map((categoria, index) => (
                <option key={categoria._id || index} value={categoria.nombre || categoria}>
                  {categoria.nombre || categoria}
                </option>
              ))
            ) : (
              <option disabled>No hay categorías disponibles</option>
            )}
          </select>
          {errors.categoria && <small className="text-danger">{t("categoryRequired")}</small>}
        </div>

        {/* Botones alineados horizontalmente como en EditarAccesorio */}
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">
            {t("create")}
          </button>
          <button className="btn btn-secondary" type="button" onClick={() => reset()}>
            {t("clean")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearAccesorio;
