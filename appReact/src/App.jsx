import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Registro from "./components/registro/registro";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard/dashboard";
import Header from "./components/Header/header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
