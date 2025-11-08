import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import api from "../../../data/api";
import { createAccesory } from "../../../features/accesory.slice";
import { toast } from "react-toastify";

const CrearAccesorio = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
        dispatch(createAccesory(created));
        toast.success(response.data?.mensaje || "Accesorio creado");
        reset();
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
        <h5>Crear accesorio</h5>
        <div className="mb-2">
          <label className="form-label">Nombre</label>
          <input
            id="accesorio-nombre"
            className="form-control"
            {...register("nombre", { required: true })}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Descripción</label>
          <textarea
            id="accesorio-descripcion"
            className="form-control"
            rows={3}
            {...register("descripcion", { required: true })}
            placeholder="Descripción del accesorio"
          />
          {errors.descripcion && (
            <small className="text-danger">La descripción es obligatoria</small>
          )}
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
          {errors.precio && (
            <small className="text-danger">El precio es obligatorio</small>
          )}
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
          {errors.stock && (
            <small className="text-danger">El stock es obligatorio</small>
          )}
        </div>

        <div className="mb-2">
          <label className="form-label">Modelo Compatible</label>
          <input
            id="accesorio-modeloCompatible"
            className="form-control"
            {...register("modeloCompatible", { required: true })}
            placeholder="Ej: iPhone 12"
          />
          {errors.modeloCompatible && (
            <small className="text-danger">
              El modelo compatible es obligatorio
            </small>
          )}
        </div>

        <div className="mb-2">
          <label className="form-label">Categoría</label>
          <select
            id="accesorio-categoria"
            className="form-select"
            {...register("categoria", { required: true })}
            defaultValue=""
          >
            <option value="" disabled>
              Seleccione una categoría
            </option>
            <option value="cargador">cargador</option>
            <option value="funda">funda</option>
            <option value="audifonos">audífonos</option>
            <option value="otros">otros</option>
          </select>
          {errors.categoria && (
            <small className="text-danger">La categoría es obligatoria</small>
          )}
        </div>

        <button className="btn btn-success">Crear</button>
      </form>
    </div>
  );
};

export default CrearAccesorio;
