import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../data/api";
import { listarUsuarios, getUsers } from "../../../features/user.slice";
import { useTranslation } from "react-i18next";
import "./ListarUsuario.css";

const ListarUsuario = () => {
  const dispatch = useDispatch();
  const usuarios = useSelector(getUsers) ?? [];
  const { t } = useTranslation();

  const fetchUsuarios = () => {
    api
      .get("/usuarios")
      .then((response) => {
        dispatch(listarUsuarios(response.data.usuarios));
      })
      .catch((error) => console.error("Error al listar usuarios:", error));
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="col-12">
      <div className="card card-body">
        <h5>{t("Lista de Usuarios")}</h5>

        <div className="table-responsive">
          <table className="table user-table">
            <thead>
              <tr>
                <th>{t("Username")}</th>
                <th>{t("Email")}</th>
                <th>{t("Plan")}</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-muted text-center py-4">
                    {t("No users found")}
                  </td>
                </tr>
              ) : (
                usuarios.map((usuario) => (
                  <tr key={usuario._id}>
                    <td>{usuario.username}</td>
                    <td>{usuario.email}</td>
                    <td>
                      <span
                        className={`plan-badge ${(
                          usuario.plan || ""
                        ).toLowerCase()}`}
                      >
                        {usuario.plan || "-"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-end mt-2">
          <button
            className="btn btn-outline-primary"
            id="btn-refresh-usuarios"
            onClick={fetchUsuarios}
          >
            {t("refresh") || "Refrescar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListarUsuario;
