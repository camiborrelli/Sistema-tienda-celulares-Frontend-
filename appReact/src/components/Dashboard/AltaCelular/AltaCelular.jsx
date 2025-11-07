import { useForm } from "react-hook-form";
import { createPhone, listar } from "../../../features/phone.slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../data/api";

const AltaCelular = () => {
  const handleCreateCelular = async (data) => {
    try {
      const response = await api.post("/celulares", data);
      dispatch(createPhone(response.data));
      if (response.data && response.data.id) {
        localStorage.setItem("celularId", JSON.stringify(response.data.id));
      }
      reset();
    } catch (error) {
      console.error(error);
      const msg = error?.response?.data?.message || error?.message || "Error creando celular";
      throw error;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const handleResetCelular = () => {
    reset();
  };

  const onSubmitCelular = (data) => {
    handleCreateCelular(data);
  };

  return (
    <div className="col-12">
      <form id="form-celular" className="card card-body mb-3" onSubmit={handleSubmit(onSubmitCelular)}>
        <h5>Crear</h5>
        <input type="hidden" id="celular-id" />
        <div className="mb-2">
          <input
            id="celular-nombre"
            {...register("nombre", { required: true })}
            className="form-control"
            placeholder="Nombre"
          />
          {errors.nombre && <small className="text-danger">El nombre es obligatorio</small>}
        </div>
        <div className="mb-2">
          <input
            id="celular-marca"
            {...register("marca", { required: true })}
            className="form-control"
            placeholder="Marca"
          />
          {errors.marca && <small className="text-danger">La marca es obligatoria</small>}
        </div>
        <div className="mb-2">
          <input
            id="celular-modelo"
            {...register("modelo", { required: true })}
            className="form-control"
            placeholder="Modelo"
          />
          {errors.modelo && <small className="text-danger">El modelo es obligatorio</small>}
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
            placeholder="Precio"
          />
          {errors.precio && <small className="text-danger">El precio es obligatorio</small>}
        </div>
        <div className="mb-2">
          <label className="form-label">Accesorios compatibles</label>
          <select id="celular-accesorios" className="form-select" {...register("accesorios")}>
            <option value="">Seleccione un accesorio</option>
          </select>
          {errors.accesorios && <small className="text-danger">Seleccione un accesorio</small>}
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-success" id="btn-save-celular" type="submit" disabled={isSubmitting}>
            Guardar
          </button>
          <button className="btn btn-secondary" id="btn-reset-celular" type="button" onClick={handleResetCelular}>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AltaCelular;
