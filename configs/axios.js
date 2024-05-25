import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://drive.nandhu.shop',
});

export default axiosInstance