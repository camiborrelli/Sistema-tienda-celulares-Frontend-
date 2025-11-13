import { useEffect } from "react";
import "./celular.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../data/api";
import { listar, updatePhone, setCurrent, getCurrentCelular } from "../../../features/phone.slice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const EditarCelular = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const current = useSelector(getCurrentCelular);

  useEffect(() => {
    if (current) {
      reset({
        id: current.id ?? current._id,
        nombre: current.nombre,
        marca: current.marca,
        modelo: current.modelo,
        stock: current.stock,
        precio: current.precio,
        accesoriosCompatibles: current.accesoriosCompatibles,
        fechaCreacion: current.fechaCreacion,
        imagen: current.imagen,
      });
    }
  }, [current, reset]);

  useEffect(() => {
    if (!current) return;
    const t = setTimeout(() => {
      const el = document.getElementById("form-celular");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
    return () => clearTimeout(t);
  }, [current]);

  const onSubmit = (data) => {
    if (data == null) {
      toast.error("No hay datos para actualizar.");
      return;
    }

    api
      .patch(`celulares/${data.id}`, {
        nombre: data.nombre,
        marca: data.marca,
        modelo: data.modelo,
        stock: data.stock,
        precio: data.precio,
        accesoriosCompatibles: data.accesoriosCompatibles,
      })
      .then((response) => {
        dispatch(updatePhone(data));
        dispatch(setCurrent(null));
        toast.success(t("cellphoneUpdatedSuccess"));
        reset({
          id: null,
          nombre: "",
          marca: "",
          modelo: "",
          stock: "",
          precio: "",
          accesoriosCompatibles: "",
          fechaCreacion: "",
          imagen: "",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className="col-12">
      <form
        id="form-celular"
        className="card card-body mb-3"
        style={{ marginTop: "1.5rem" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h5>{t("editCellphone")}</h5>
        <input type="hidden" id="celular-id" {...register("id")} />
        <div className="mb-2">
          <input
            id="celular-nombre"
            {...register("nombre", { required: true })}
            className="form-control"
            placeholder={t("name")}
          />
          {errors.nombre && <small className="text-danger">{t("nameRequired")}</small>}
        </div>
        <div className="mb-2">
          <input
            id="celular-marca"
            {...register("marca", { required: true })}
            className="form-control"
            placeholder={t("brand")}
          />
          {errors.marca && <small className="text-danger">{t("brandRequired")}</small>}
        </div>
        <div className="mb-2">
          <input
            id="celular-modelo"
            {...register("modelo", { required: true, valueAsNumber: true })}
            type="number"
            className="form-control"
            placeholder={t("model")}
          />
          {errors.modelo && <small className="text-danger">{t("modelRequired")}</small>}
        </div>
        <div className="mb-2">
          <input
            id="celular-stock"
            {...register("stock", { required: true, valueAsNumber: true })}
            type="number"
            className="form-control"
            placeholder={t("stock")}
          />
          {errors.stock && <small className="text-danger">{t("stockRequired")}</small>}
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
          {errors.precio && <small className="text-danger">{t("priceRequired")}</small>}
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
          {errors.accesoriosCompatibles && <small className="text-danger">{t("accesoryNumberRequired")}</small>}
        </div>
        <div className="mb-2">
          <input
            id="celular-fecha-creacion"
            className="form-control"
            {...register("fechaCreacion", { required: true })}
            type="hidden"
          />
        </div>
        <div className="mb-2">
          <input id="celular-imagen" {...register("imagen", { required: true })} className="form-control" type="hidden" />
        </div>
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
                marca: "",
                modelo: "",
                stock: "",
                precio: "",
                accesoriosCompatibles: "",
                fechaCreacion: "",
                imagen: "",
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

export default EditarCelular;
