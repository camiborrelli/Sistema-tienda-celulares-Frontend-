import { useDispatch, useSelector } from "react-redux";
import api from "../../../data/api";
import React, { useEffect } from "react";
import {
  list,
  getAccesories,
  deleteAccesorio,
  setCurrent,
} from "../../../features/accesory.slice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "./ListarAccesorio.css";

const ListarAccesorio = () => {
  const dispatch = useDispatch();
  const accesorios = useSelector(getAccesories) ?? [];
  const { t } = useTranslation();

  const listarAccesorios = () => {
    api
      .get("/accesorios/creados")
      .then((response) => {
        dispatch(list(response.data.accesorios));
      })
      .catch((error) => {
        console.error("Error al listar accesorios:", error);
      });
  };

  useEffect(() => {
    listarAccesorios();
  }, []);

  const borrarAccesorio = (id) => {
    if (!id) return;
    api
      .delete(`accesorios/${id}`)
      .then((res) => {
        dispatch(deleteAccesorio(id));
        toast.success(res.data?.mensaje || "Accesorio borrado");
      })
      .catch((error) => {
        console.error("Error al borrar accesorio:", error);
        const msg =
          error?.response?.data?.message ||
          error?.response?.data ||
          "Error al borrar accesorio";
        toast.error(msg);
      });
  };

  return (
    <div className="col-12">
      <div className="card card-body">
        <h5>Lista de Accesorios</h5>
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {accesorios.length > 0 ? (
              accesorios.map((accesorio) => (
                <tr key={accesorio._id || accesorio.id || accesorio.nombre}>
                  <td>{accesorio.nombre || accesorio.name}</td>
                  <td>{accesorio.precio || accesorio.price}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => {
                        dispatch(setCurrent(accesorio));
                        const el = document.getElementById(
                          "form-accesorio-editar"
                        );
                        if (el)
                          el.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        borrarAccesorio(accesorio._id || accesorio.id)
                      }
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center text-muted">
                  No hay accesorios
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          className="btn btn-outline-primary mt-2"
          id="btn-refresh-accesorios"
          onClick={listarAccesorios}
        >
          Refrescar
        </button>
      </div>
    </div>
  );
};

export default ListarAccesorio;
