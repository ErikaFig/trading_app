import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8205",
});

export const loginRequest = (data) => API.post("/auth/login", data);
export const registerRequest = (data) => API.post("/auth/register", data);