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
      .catch((error) => toast.error(error.response.data.error));
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="col-12">
      <h3>{t("userList")}</h3>
      <div className="card card-body">
        <div className="table-responsive">
          <table className="table user-table">
            <thead>
              <tr>
                <th>{t("username")}</th>
                <th>{t("email")}</th>
                <th>{t("plan")}</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-muted text-center py-4">
                    {t("noUsersFound")}
                  </td>
                </tr>
              ) : (
                usuarios.map((usuario) => (
                  <tr key={usuario._id}>
                    <td>{usuario.username}</td>
                    <td>{usuario.email}</td>
                    <td>
                      <span className={`plan-badge ${(usuario.plan || "").toLowerCase()}`}>{usuario.plan || "-"}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListarUsuario;
