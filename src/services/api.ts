import axios from "axios";

export const api = axios.create({
  baseURL: "https://dev-blog-backend-zeta.vercel.app", 
  headers: {
    "Content-Type": "application/json",
  },
});
