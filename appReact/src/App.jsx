import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Registro from "./components/registro/registro";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <Routes>
        {/* Mostrar login en la raíz y en /login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        {/* Ruta básica de dashboard para redirección post-login (placeholder) */}
        {/* <Route
          path="/dashboard"
          element={
            <div style={{ padding: 20 }}>Bienvenido al dashboard (mock)</div>
          }
        /> */}
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;
