import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const baseUrl = process.env.REACT_APP_API_URL;

export const useApi = () => {
  const { authToken } = useContext(AuthContext);
  console.log(authToken, 'with axios')

  const api = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add interceptor to include Bearer token
  api.interceptors.request.use(
    (config) => {
      if (authToken) {
        config.headers["Authorization"] = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return api;
};
