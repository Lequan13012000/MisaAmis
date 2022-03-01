import axios from "axios";

/**
 * axios client
 * @author: BMThang(06/02/2022)
 */
const axiosClient = axios.create({
  baseURL: "https://localhost:7051/api",
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (error.response) {
      throw error.response.data;
    }
    if (error.request) {
      throw error.request;
    }
    throw error;
  }
);

export default axiosClient;
