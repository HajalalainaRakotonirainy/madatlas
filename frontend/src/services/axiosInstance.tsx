import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((response) => {
  response.headers["Access-Control-Allow-Origin"] = "*";
  return response;
});

axiosInstance.interceptors.response.use((response) => {
    console.log(response.headers);
    
  response.headers["Access-Control-Allow-Origin"] = "*";
  return response;
});

export default axiosInstance;
