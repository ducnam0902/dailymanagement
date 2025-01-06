import axios from "axios";
import envConfig from "../utils/config";

const http = axios.create({
  baseURL: envConfig.VITE_BASE_SERVER,
  headers: {
    "Content-Type": "application/json",
    Authorization: "",
  },
});

export default http;
