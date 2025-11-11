import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../data/api";
import { listarUsuarios, getUsers } from "../../../features/user.slice";
import { useTranslation } from "react-i18next";

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
        <ul className="list-group" id="list-usuarios">
          {usuarios.map((usuario) => (
            <li className="list-group-item" key={usuario._id}>
              {usuario.username} - {usuario.email}
            </li>
          ))}
        </ul>
        <button
          className="btn btn-outline-primary mt-2"
          id="btn-refresh-usuarios"
          onClick={fetchUsuarios}
        />
        Refrescar
        <button
          className="btn btn-outline-primary mt-2"
          id="btn-refresh-usuarios"
          onClick={fetchUsuarios}
        >
          {t("refresh")}
        </button>
      </div>
    </div>
  );
};

export default ListarUsuario;
