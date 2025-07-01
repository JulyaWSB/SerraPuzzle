import axios from "axios";

export const apiLogin = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "https://monkfish-app-cupdt.ondigitalocean.app",
});