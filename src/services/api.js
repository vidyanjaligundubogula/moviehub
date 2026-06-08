import axios from "axios";

const api = axios.create({
  baseURL: "https://moviehub-backend-u9kh.onrender.com"
});

export default api;