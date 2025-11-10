import { useDispatch, useSelector } from "react-redux";
import api from "../../../data/api";
import {
  listar,
  getPhones,
  deletePhone,
  setCurrent,
} from "../../../features/phone.slice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ListarCelular = () => {
  const dispatch = useDispatch();

  const listarCelulares = () => {
    api
      .get("/celulares")
      .then((response) => {
        dispatch(listar(response.data.celulares));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    listarCelulares();
  }, []);

  const phones = useSelector(getPhones);

  const borrarCelular = (id) => {
    api
      .delete(`celulares/${id}`)
      .then((response) => {
        dispatch(deletePhone(id));
        toast.success(response.data.mensaje);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="col-12">
      <div className="card card-body">
        <h5>Lista de Celulares</h5>
        <table className="table table-sm" id="table-celulares">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {phones && phones.length > 0 ? (
              phones.map((celular) => (
                <tr key={celular._id ?? celular.id}>
                  <td>{celular.nombre}</td>
                  <td>{celular.marca}</td>
                  <td>{celular.modelo}</td>
                  <td>{celular.precio}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => {
                        dispatch(setCurrent(celular));
                        // small delay so the Editar form can reset/populate before scrolling
                        setTimeout(() => {
                          const container =
                            document.querySelector(".dashboard-root");
                          const el = document.getElementById("form-celular");
                          if (el && container) {
                            const containerRect =
                              container.getBoundingClientRect();
                            const targetRect = el.getBoundingClientRect();
                            const top =
                              targetRect.top -
                              containerRect.top +
                              container.scrollTop;
                            container.scrollTop;
                            container.scrollTo({ top, behavior: "smooth" });
                          } else if (el) {
                            // fallback to scrollIntoView if container not found
                            el.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                            });
                          }
                        }, 60);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => borrarCelular(celular._id)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-muted">
                  No hay celulares disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          className="btn btn-outline-primary mt-2"
          id="btn-refresh-celulares"
          onClick={listarCelulares}
        >
          Refrescar
        </button>
      </div>
    </div>
  );
};

export default ListarCelular;
