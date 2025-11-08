import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuth = useSelector((state) => state.user.usuario);

  // Si no está autenticado → redirige a login
  if (!isAuth) return <Navigate to="/" replace />;

  // Si está autenticado → renderiza rutas hijas
  return <Outlet />;
};

export default ProtectedRoute;
