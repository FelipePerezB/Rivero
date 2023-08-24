import axios from "axios";

export const api = axios.create({
  baseURL: "https://rivero-backend-fvinax994-felipeperezb.vercel.app/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
