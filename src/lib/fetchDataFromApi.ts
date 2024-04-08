import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

type Params = {
  [key: string]: string;
};

const fetchData = {
  get: (url: string, params: Params = {}) => {
    return axiosInstance.get(url, { params });
  },
  post: (url: string, data = {}) => {
    return axiosInstance.post(url, data);
  },
  put: (url: string, data = {}) => {
    return axiosInstance.put(url, data);
  },
  patch: (url: string, data = {}) => {
    return axiosInstance.patch(url, data);
  },
};

export default fetchData;
