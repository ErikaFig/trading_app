import axios from "axios";

const API = axios.create({
  baseURL: "/api/v1",
});

export const loginRequest = (data) => API.post("/auth/login", data);
export const registerRequest = (data) => API.post("/auth/register", data);