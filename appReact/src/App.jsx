import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Mostrar login en la raíz y en /login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* Ruta básica de dashboard para redirección post-login (placeholder) */}
        <Route
          path="/dashboard"
          element={
            <div style={{ padding: 20 }}>Bienvenido al dashboard (mock)</div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
