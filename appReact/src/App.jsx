import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Registro from "./components/register/Register";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard/dashboard";
import { Provider } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import { store } from "./store/store";
import NotFound from "./components/NotFound";
import Container from "./components/Container";
import Accesorios from "./components/Dashboard/Accesorio/Accesorios";
import Celulares from "./components/Dashboard/Celular/Celulares";
import Usuarios from "./components/Dashboard/Usuario/Usuarios";
import Perfil from "./components/Dashboard/Usuario/Perfil";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Container />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Registro />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="accesorios" element={<Accesorios />} />
                <Route path="celulares" element={<Celulares />} />
                <Route path="usuarios" element={<Usuarios />} />
                <Route path="perfil" element={<Perfil />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        pauseOnHover
        theme="colored"
      />
    </Provider>
  );
}

export default App;
