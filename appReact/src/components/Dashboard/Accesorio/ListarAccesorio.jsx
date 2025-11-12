import { useDispatch, useSelector } from "react-redux";
import api from "../../../data/api";
import React, { useEffect, useState } from "react";
import {
  list,
  getAccesories,
  deleteAccesorio,
  setCurrent,
} from "../../../features/accesory.slice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "./Accesorio.css";

const ListarAccesorio = () => {
  const dispatch = useDispatch();
  const accesorios = useSelector(getAccesories) ?? [];
  const { t } = useTranslation();
  const [range, setRange] = useState("all");

  async function listarAccesorios(opts = {}) {
    try {
      const params = {};
      if (opts.range) params.range = opts.range; // lastWeek, lastMonth, all
      if (opts.startDate) params.startDate = opts.startDate;
      if (opts.endDate) params.endDate = opts.endDate;
      if (opts.categoria) params.categoria = opts.categoria;

      const res = await api.get("/accesorios", { params });
      const payload = res.data?.accesorios ?? res.data ?? [];
      dispatch(list(payload));
    } catch (e) {
      console.error(e);
      toast.error("Error al listar accesorios");
    }
  }

  useEffect(() => {
    listarAccesorios({ range });
  }, [range]);

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
        <h5>{t("accessoryList")}</h5>
        <div className="mb-2 d-flex align-items-center">
          <label className="me-2 mb-0">
            {t("Filter by") || "Filtrar por:"}
          </label>
          <select
            className="form-select form-select-sm w-auto"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            aria-label="Filter accesorios by period"
          >
            <option value="lastWeek">{t("lastWeek") || "Última semana"}</option>
            <option value="lastMonth">{t("lastMonth") || "Último mes"}</option>
            <option value="all">{t("all") || "Todos"}</option>
          </select>
        </div>
        <table className="table table-sm">
          <thead>
            <tr>
              <th>{t("name")}</th>
              <th>{t("price")}</th>
              <th>{t("stock")}</th>
              <th>{t("category")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {accesorios.length > 0 ? (
              accesorios.map((accesorio) => (
                <tr key={accesorio._id || accesorio.id || accesorio.nombre}>
                  <td>{accesorio.nombre || accesorio.name}</td>
                  <td>{accesorio.precio || accesorio.price}</td>
                  <td>{accesorio.stock || accesorio.stock}</td>
                  <td>{accesorio.categoria || accesorio.category}</td>
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
                  {t("noAccessories")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          className="btn btn-outline-primary mt-2"
          id="btn-refresh-accesorios"
          onClick={() => listarAccesorios({ range })}
        >
          {t("refresh")}
        </button>
      </div>
    </div>
  );
};

export default ListarAccesorio;
