import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" ? "https://cactus-store.onrender.com/api" : "/api", 
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;


