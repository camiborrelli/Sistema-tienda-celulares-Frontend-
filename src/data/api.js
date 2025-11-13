import axios from "axios";

//agregar interceptores de request
const api = axios.create({
  baseURL: "http://localhost:3000/v1/",
});

api.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";

  if (config.skipAuth) {
    return config;
  }

  let token = localStorage.getItem("Token");
  config.headers.Authorization = "Bearer " + token;

  return config;
});

export default api;
