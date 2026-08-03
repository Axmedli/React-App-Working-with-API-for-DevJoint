import axios from "axios";
import { errorBus } from "./errorBus";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://dummyjson.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const message =
      error.response?.data?.message ||
      error.message ||
      "Naməlum xəta baş verdi.";

    errorBus.emit(message);

    return Promise.reject({ ...error, message });
  }
);

export default api;