import axios from "axios";

export const api = axios.create({
  baseURL: "https://rivero-backend.vercel.app/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
