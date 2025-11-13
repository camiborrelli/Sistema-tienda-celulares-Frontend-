import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAccesory, listar, setCurrent } from "../../../features/accesory.slice";
import api from "../../../data/api";
import { updateAccesory, listarCategorias } from "../../../features/accesory.slice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "./Accesorio.css";
import { useCallback } from "react";
import { useState } from "react";

const EditarAccesorio = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [categorias, setCategorias] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const current = useSelector(getCurrentAccesory);

  useEffect(() => {
    if (current) {
      reset({
        id: current.id ?? current._id,
        nombre: current.nombre,
        descripcion: current.descripcion,
        precio: current.precio,
        stock: current.stock,
        modeloCompatible: current.modeloCompatible,
        categoria: current.categoria,
        fechaCreacion: current.fechaCreacion,
      });
    }
  }, [current, reset]);

  const onSubmit = (data) => {
    if (data == null) {
      toast.error("No hay datos para actualizar.");
      return;
    }

    api
      .patch(`accesorios/${data.id}`, {
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        stock: data.stock,
        modeloCompatible: data.modeloCompatible,
        categoria: data.categoria,
      })
      .then((response) => {
        dispatch(updateAccesory(data));
        toast.success(t("accessoryUpdatedSuccess"));
        dispatch(setCurrent(null));
        reset({
          id: null,
          nombre: "",
          descripcion: "",
          precio: "",
          stock: "",
          modeloCompatible: "",
          categoria: "",
          fechaCreacion: "",
        });
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
      <form id="form-accesorio-editar" className="card card-body mb-3" onSubmit={handleSubmit(onSubmit)}>
        <h5>{t("editAccessory")}</h5>
        <input type="hidden" id="accesorio-id" {...register("id")} />
        <div className="mb-2">
          <input
            id="accesorio-nombre"
            className="form-control"
            placeholder={t("namePlaceholder")}
            {...register("nombre", { required: true })}
          />
          {errors.nombre && <span className="text-danger">{t("nameRequired")}</span>}
        </div>
        <div className="mb-2">
          <textarea
            id="accesorio-descripcion"
            className="form-control"
            rows={3}
            {...register("descripcion", { required: true })}
            placeholder={t("descriptionPlaceholder")}
          />
          {errors.descripcion && <span className="text-danger">{t("descriptionRequired")}</span>}
        </div>
        <div className="mb-2">
          <input
            id="accesorio-precio"
            type="number"
            className="form-control"
            {...register("precio", { required: true, valueAsNumber: true })}
            placeholder={t("pricePlaceholder")}
          />
          {errors.precio && <span className="text-danger">{t("priceRequired")}</span>}
        </div>
        <div className="mb-2">
          <input
            id="accesorio-stock"
            type="number"
            className="form-control"
            {...register("stock", { required: true, valueAsNumber: true })}
            placeholder={t("stockPlaceholder")}
          />
          {errors.stock && <span className="text-danger">{t("stockRequired")}</span>}
        </div>
        <div className="mb-2">
          <input
            id="accesorio-modelo-compatible"
            className="form-control"
            {...register("modeloCompatible", { required: true })}
            placeholder={t("compatibleModelPlaceholder")}
          />
          {errors.modeloCompatible && <span className="text-danger">{t("compatibleModelRequired")}</span>}
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
        <div className="mb-2">
          <input
            id="accesorio-fecha-creacion"
            className="form-control"
            {...register("fechaCreacion", { required: true })}
            type="hidden"
          />
        </div>
        {/* Botones igual que en EditarCelular */}
        <div className="d-flex gap-2">
          <button className="btn btn-success" type="submit" disabled={isSubmitting}>
            {t("save")}
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => {
              reset({
                id: null,
                nombre: "",
                descripcion: "",
                precio: "",
                stock: "",
                modeloCompatible: "",
                categoria: "",
              });
              dispatch(setCurrent(null));
            }}
          >
            {t("clean")}
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditarAccesorio;
