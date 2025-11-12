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
    setPhone(Array.isArray(phones) ? phones : []);
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
    console.log("Filtrar por ultima semana, mes, todas");
    console.log("Hacer un grafico por la cantidad de celulares por fecha");

    setSortAsc((s) => !s);
  };

  return (
    <div className="col-12">
      <div className="card card-body">
        <div className="table-container">
          <table className="table table-sm" id="table-celulares">
            <thead>
              <tr>
                <th></th>
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
                    <td data-label="">
                      {celular.imagen ? (
                        <img
                          src={celular.imagen}
                          alt={celular.nombre}
                          className="list-thumb"
                        />
                      ) : (
                        <div className="list-thumb placeholder" />
                      )}
                    </td>
                    <td data-label={t("name")}>{celular.nombre}</td>
                    <td data-label={t("brand")}>{celular.marca}</td>
                    <td data-label={t("model")}>{celular.modelo}</td>
                    <td data-label={t("price")}>{celular.precio}</td>
                    <td data-label={t("creationDate")}>
                      {new Date(celular.fechaCreacion).toLocaleDateString()}
                    </td>
                    <td className="actions" data-label={t("actions")}>
                      <button
                        className="btn btn-sm btn-primary icon-btn me-2"
                        title={t("edit")}
                        aria-label={t("edit")}
                        onClick={() => {
                          dispatch(setCurrent(celular));
                          setTimeout(() => {
                            const container =
                              document.querySelector(".dashboard-root");
                            const el =
                              document.getElementById("form-celular-edit");
                            if (!el) return;

                            if (container) {
                              const containerRect =
                                container.getBoundingClientRect();
                              const targetRect = el.getBoundingClientRect();
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
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
                            fill="currentColor"
                          />
                          <path
                            d="M20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                      <button
                        className="btn btn-sm btn-danger icon-btn"
                        title={t("delete")}
                        aria-label={t("delete")}
                        onClick={() => borrarCelular(celular._id)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 6h18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 11v6M14 11v6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center text-muted">
                    {t("noCellPhones")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
