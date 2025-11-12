import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentAccesory,
  list,
  setCurrent,
} from "../../../features/accesory.slice";
import api from "../../../data/api";
import {
  updateAccesory,
  listarCategorias,
} from "../../../features/accesory.slice";
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
      });
    }
  }, [current, reset]);

  const onSubmit = (data) => {
    const payload = {
      nombre: data.nombre,
      descripcion: data.descripcion || "",
      precio: Number(data.precio) || 0,
      stock: Number(data.stock) || 0,
      modeloCompatible: data.modeloCompatible || "",
      categoria: data.categoria || "",
    };
    if (data == null) {
      toast.error("No hay datos para actualizar.");
      return;
    }
    const id = data.id ?? data._id;
    if (!id) {
      console.error("EditarAccesorio: id faltante en datos del form", data);
      toast.error(
        "Id de accesorio faltante. Seleccione el accesorio a editar desde la lista."
      );
      return;
    }
    api
      .patch(`accesorios/${id}`, payload)
      .then((response) => {
        const updated = response.data?.accesorio ?? response.data;
        dispatch(updateAccesory(updated));
        dispatch(setCurrent(null));
        toast.success(response.data?.mensaje || "Accesorio actualizado");
        api
          .get("/accesorios")
          .then((response) => {
            dispatch(list(response.data.accesorios));
          })
          .catch((error) => {
            console.error("Error al listar accesorios:", error);
          });

        reset();
      })
      .catch((error) => {
        console.error("Error al actualizar accesorio:", error);
        const serverData = error?.response?.data;
        const msg =
          serverData?.message ||
          (typeof serverData === "string"
            ? serverData
            : JSON.stringify(serverData)) ||
          error.message;
        toast.error(msg);
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
      <form
        id="form-accesorio-editar"
        className="card card-body mb-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h5>{t("editAccessory")}</h5>
        <input type="hidden" id="accesorio-id" {...register("id")} />
        <div className="mb-2">
          <input
            id="accesorio-nombre"
            className="form-control"
            placeholder={t("namePlaceholder")}
            {...register("nombre", { required: true })}
          />
          {errors.nombre && (
            <span className="text-danger">{t("nameRequired")}</span>
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
            <span className="text-danger">{t("descriptionRequired")}</span>
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
            <span className="text-danger">{t("priceRequired")}</span>
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
            <span className="text-danger">{t("stockRequired")}</span>
          )}
        </div>
        <div className="mb-2">
          <input
            id="accesorio-modelo-compatible"
            className="form-control"
            {...register("modeloCompatible", { required: true })}
            placeholder={t("compatibleModelPlaceholder")}
          />
          {errors.modeloCompatible && (
            <span className="text-danger">{t("compatibleModelRequired")}</span>
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
            {Array.isArray(categorias) && categorias.length > 0 ? (
              categorias.map((categoria, index) => (
                <option
                  key={categoria._id || index}
                  value={categoria.nombre || categoria}
                >
                  {categoria.nombre || categoria}
                </option>
              ))
            ) : (
              <option disabled>No hay categorías disponibles</option>
            )}
          </select>
          {errors.categoria && (
            <small className="text-danger">{t("categoryRequired")}</small>
          )}
        </div>

        {/* Botones igual que en EditarCelular */}
        <div className="d-flex gap-2">
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
