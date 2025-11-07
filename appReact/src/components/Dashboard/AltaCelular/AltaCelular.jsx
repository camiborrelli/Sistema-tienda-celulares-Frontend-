import { useForm } from "react-hook-form";
import { createPhone, listar } from "../../../features/phone.slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../data/api";
import { toast } from "react-toastify";

const AltaCelular = () => {
  const dispatch = useDispatch();

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
      <form id="form-celular" className="card card-body mb-3" onSubmit={handleSubmit(onSumbit)}>
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
            {...register("modelo", { required: true, valueAsNumber: true })}
            type="number"
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
          <input
            id="celular-accesorios-compatibles"
            {...register("accesoriosCompatibles", {
              required: true,
              valueAsNumber: true,
            })}
            type="number"
            className="form-control"
            placeholder="Precio"
          />
          {errors.accesoriosCompatibles && (
            <small className="text-danger">La cantidad de accesorios compatibles es obligatoria</small>
          )}
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-success" type="submit" disabled={isSubmitting}>
            Guardar
          </button>
          <button className="btn btn-secondary" type="button" onClick={() => reset()}>
            Limpiar
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
