import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'https://drive.nandhu.xyz',
    baseURL: "https://drive.nandhu.xyz/",
    // headers: { "Content-Type": "application/json" },
    withCredentials: true
});

export default axiosInstance