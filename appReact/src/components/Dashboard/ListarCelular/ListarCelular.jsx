import { useDispatch, useSelector } from "react-redux";
import api from "../../../data/api";
import { listar, getPhones, deletePhone } from "../../../features/phone.slice";
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

  const [phone, setPhone] = useState([]);

  useEffect(() => {
    setPhone(phones.map((p) => p));
    console.log(phone);
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
            {phone.length > 0 ? (
              phone.map((celular) => (
                <tr key={celular._id}>
                  <td>{celular.nombre}</td>
                  <td>{celular.marca}</td>
                  <td>{celular.modelo}</td>
                  <td>{celular.precio}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">Editar</button>
                    <button className="btn btn-sm btn-danger" onClick={() => borrarCelular(celular._id)}>
                      Borrar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-muted">
                  No hay celulares disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarCelular;
