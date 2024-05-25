import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://drive.nandhu.shop',
});

export default axiosInstance