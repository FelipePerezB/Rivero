import axios from "axios";

export const api = axios.create({
  baseURL: "https://rivero-server.vercel.app/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
