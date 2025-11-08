import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../data/api";
import { listarUsuarios, getUsers } from "../../../features/user.slice";

const ListarUsuarios = () => {
  const dispatch = useDispatch();
  const usuarios = useSelector(getUsers) ?? [];

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
        <h5>Lista de usuarios</h5>
        <ul className="list-group" id="list-usuarios">
          {usuarios.map((usuario) => (
            <li className="list-group-item" key={usuario._id}>
              {usuario.nombre} - {usuario.email}
            </li>
          ))}
        </ul>
        <button
          className="btn btn-outline-primary mt-2"
          id="btn-refresh-usuarios"
          onClick={fetchUsuarios}
        >
          Refrescar
        </button>
      </div>
    </div>
  );
};

export default ListarUsuarios;
