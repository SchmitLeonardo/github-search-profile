import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  client_id: "3a03127e5b4885b19848",
  client_secret: "51173feae191056dadc87a7c9c78dcc5fa0514ab"
});

export default api;