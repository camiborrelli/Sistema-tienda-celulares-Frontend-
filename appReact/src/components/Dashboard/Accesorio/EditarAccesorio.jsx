import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAccesory, list, setCurrent } from "../../../features/accesory.slice";
import api from "../../../data/api";
import { updateAccesory } from "../../../features/accesory.slice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const EditarAccesorio = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const current = useSelector(getCurrentAccesory);

  React.useEffect(() => {
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
    const id = data.id ?? data._id;
    if (!id) {
      console.error("EditarAccesorio: id faltante en datos del form", data);
      toast.error("Id de accesorio faltante. Seleccione el accesorio a editar desde la lista.");
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
          serverData?.message || (typeof serverData === "string" ? serverData : JSON.stringify(serverData)) || error.message;
        toast.error(msg);
      });
  };

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
        </div>
        <div className="mb-2">
          <textarea
            id="accesorio-descripcion"
            className="form-control"
            rows={3}
            {...register("descripcion", { required: true })}
            placeholder="Descripción del accesorio"
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Precio</label>
          <input
            id="accesorio-precio"
            type="number"
            className="form-control"
            {...register("precio", { required: true, valueAsNumber: true })}
            placeholder="0"
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Stock</label>
          <input
            id="accesorio-stock"
            type="number"
            className="form-control"
            {...register("stock", { required: true, valueAsNumber: true })}
            placeholder="0"
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Modelo Compatible</label>
          <input
            id="accesorio-modelo-compatible"
            className="form-control"
            {...register("modeloCompatible", { required: true })}
            placeholder="Modelo compatible"
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Categoría</label>
          <input
            id="accesorio-categoria"
            className="form-control"
            {...register("categoria", { required: true })}
            placeholder="Categoría"
          />
        </div>

        <button disabled={isSubmitting} className="btn btn-primary">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};
export default EditarAccesorio;
