import ListarUsuario from "./ListarUsuario";
import VerPlan from "./Perfil";

const Usuarios = () => (
  <section id="usuarios" className="mb-5">
    <h2>Usuarios</h2>
    {/* <VerPlan /> */}
    <div className="row">
      <ListarUsuario />
    </div>
  </section>
);

export default Usuarios;
