import { useDispatch, useSelector } from "react-redux";
import api from "../../../data/api";
import {
  listar,
  getPhones,
  deletePhone,
  setCurrent,
} from "../../../features/phone.slice";
import {
  listar,
  getPhones,
  deletePhone,
  setCurrent,
} from "../../../features/phone.slice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ListarCelular = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const listarCelulares = () => {
    api
      .get("/celulares")
      .then((response) => {
        dispatch(listar(response.data.celulares));
      })
      .catch((error) => {
        if (error.response?.data?.error !== "No hay celulares disponibles") {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    listarCelulares();
  }, []);

  const phones = useSelector(getPhones);

  const [phone, setPhone] = useState([]);

  useEffect(() => {
    setPhone(phones.map((p) => p));
  }, [phones]);

  const borrarCelular = (id) => {
    api
      .delete(`celulares/${id}`)
      .then((response) => {
        dispatch(deletePhone(id));
        toast.success(response.data.mensaje);
      })
      .catch((error) => console.log(error));
  };

  const [sortAsc, setSortAsc] = useState(true);

  const ordenarFechaCreacion = () => {
    console.log("Ordenar por fecha de creacion a implementar");
    setSortAsc((s) => !s);
  };

  return (
    <div className="col-12">
      <div className="card card-body">
        <table className="table table-sm" id="table-celulares">
          <thead>
            <tr>
              <th>{t("name")}</th>
              <th>{t("brand")}</th>
              <th>{t("model")}</th>
              <th>{t("price")}</th>
              <th>{t("creationDate")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {phone.length > 0 ? (
              phone.map((celular) => (
                <tr key={celular._id || celular.nombre}>
                  <td>{celular.nombre}</td>
                  <td>{celular.marca}</td>
                  <td>{celular.modelo}</td>
                  <td>{celular.precio}</td>
                  <td>{celular.fechaCreacion}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => {
                        dispatch(setCurrent(celular));
                        setTimeout(() => {
                          const container =
                            document.querySelector(".dashboard-root");
                          const container =
                            document.querySelector(".dashboard-root");
                          const el = document.getElementById("form-celular");
                          if (el && container) {
                            const containerRect =
                              container.getBoundingClientRect();
                          if (!el) return;

                          if (container) {
                            const containerRect =
                              container.getBoundingClientRect();
                            const targetRect = el.getBoundingClientRect();
                            const top =
                              targetRect.top -
                              containerRect.top +
                              container.scrollTop;
                            container.scrollTop;
                            const top =
                              targetRect.top -
                              containerRect.top +
                              container.scrollTop;
                            container.scrollTo({ top, behavior: "smooth" });
                          } else {
                            el.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                            });
                          }
                        }, 80);
                      }}
                    >
                      📝
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => borrarCelular(celular._id)}
                    >
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => borrarCelular(celular._id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  No hay celulares disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Botones de acciones: ahora alineados horizontalmente */}
        <div className="d-flex gap-2 mt-2 w-100">
          <button
            type="button"
            className="btn btn-outline-primary flex-fill d-flex align-items-center justify-content-center text-center"
            onClick={listarCelulares}
          >
            {t("refresh")} 🔃
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary flex-fill d-flex align-items-center justify-content-center text-center"
            onClick={ordenarFechaCreacion}
          >
            {sortAsc ? t("orderbyUp") : t("orderbyDown")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListarCelular;
